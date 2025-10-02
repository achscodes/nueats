import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};
serve(async (req)=>{
  const url = new URL(req.url);
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders
    });
  }
  // ✅ PayMongo redirect handlers
  if (url.pathname === "/payment-success") {
    return Response.redirect("nueats://payment-success", 302);
  }
  if (url.pathname === "/payment-failed") {
    return Response.redirect("nueats://payment-failed", 302);
  }
  try {
    // Parse request body
    const body = await req.json();
    const { amount, payment_method_type, order_id } = body;
    if (!amount || amount < 1) {
      return new Response(JSON.stringify({
        error: "Amount must be at least 1"
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      });
    }
    if (!payment_method_type) {
      return new Response(JSON.stringify({
        error: "Payment method is required"
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      });
    }
    // Handle cash payments directly
    if (payment_method_type.toLowerCase() === "cash") {
      return new Response(JSON.stringify({
        status: "success",
        message: "Cash payment selected"
      }), {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      });
    }
    // ✅ Handle PayMongo checkout
    if (payment_method_type.toLowerCase() === "paymongo") {
      const PAYMONGO_SECRET_KEY = Deno.env.get("PAYMONGO_SECRET_KEY");
      const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
      const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");
      
      if (!PAYMONGO_SECRET_KEY) {
        return new Response(JSON.stringify({
          error: "Payment gateway not configured"
        }), {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json"
          }
        });
      }
      // Encode secret key for Basic Auth
      const encoder = new TextEncoder();
      const data = encoder.encode(`${PAYMONGO_SECRET_KEY}:`);
      const base64 = btoa(String.fromCharCode(...new Uint8Array(data)));
      const paymongoPayload = {
        data: {
          attributes: {
            line_items: [
              {
                currency: "PHP",
                amount: Math.round(amount * 100),
                name: "Order Payment",
                quantity: 1
              }
            ],
            payment_method_types: [
              "gcash",
              "paymaya",
              "card"
            ],
            redirect: {
              success: `${SUPABASE_URL}/functions/v1/payment-redirect?status=success`,
              failed: `${SUPABASE_URL}/functions/v1/payment-redirect?status=failed`
            },
            description: "Order Payment"
          }
        }
      };
      const paymongoResponse = await fetch("https://api.paymongo.com/v1/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${base64}`
        },
        body: JSON.stringify(paymongoPayload)
      });
      const paymongoData = await paymongoResponse.json();
      if (!paymongoResponse.ok) {
        return new Response(JSON.stringify({
          error: "Payment gateway error",
          details: paymongoData
        }), {
          status: paymongoResponse.status,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json"
          }
        });
      }
      const checkoutUrl = paymongoData?.data?.attributes?.checkout_url;
      const sessionId = paymongoData?.data?.id;
      
      if (!checkoutUrl) {
        return new Response(JSON.stringify({
          error: "Invalid payment gateway response",
          details: "No checkout URL received"
        }), {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json"
          }
        });
      }
      
      // Update payment record with PayMongo session details if order_id is provided
      if (order_id && SUPABASE_URL && SUPABASE_ANON_KEY) {
        try {
          const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2.39.3');
          const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
          
          await supabase
            .from('payments')
            .update({
              provider_intent_id: sessionId,
              status: 'processing',
              metadata: paymongoData?.data?.attributes || {}
            })
            .eq('order_id', order_id)
            .eq('status', 'pending');
        } catch (updateError) {
          console.error('Failed to update payment record:', updateError);
          // Don't fail the request if payment update fails
        }
      }
      
      return new Response(JSON.stringify({
        status: "success",
        redirect_url: checkoutUrl
      }), {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      });
    }
    // Invalid method
    return new Response(JSON.stringify({
      error: "Invalid payment method"
    }), {
      status: 400,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: "Internal server error",
      message: error.message
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      }
    });
  }
});
