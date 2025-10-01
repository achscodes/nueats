import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
serve((req)=>{
  const url = new URL(req.url);
  console.log("Payment redirect triggered:", url.pathname, url.search);
  
  // Check for status in query params or path
  const status = url.searchParams.get("status");
  
  if (status === "success" || url.pathname.includes("success")) {
    // Redirect back into your Expo app (deep link)
    console.log("Redirecting to success");
    return Response.redirect("nueats://payment-success", 302);
  }
  
  if (status === "failed" || url.pathname.includes("failed")) {
    // Redirect to app if payment failed
    console.log("Redirecting to failed");
    return Response.redirect("nueats://payment-failed", 302);
  }
  
  return new Response("NuEats Payment Redirect Function Active ✅", {
    headers: {
      "Content-Type": "text/plain"
    }
  });
});
