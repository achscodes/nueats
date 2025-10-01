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
    const { amount, payment_method_type } = body;
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
