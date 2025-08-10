
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NewsletterRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: NewsletterRequest = await req.json();

    // Send welcome email
    const emailResponse = await resend.emails.send({
      from: "FedAnalysis <newsletter@fedanalysis.com>",
      to: [email],
      subject: "Welcome to Fed Risk Brief - Your Subscription is Confirmed",
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;">
          <div style="background: linear-gradient(135deg, #1e293b 0%, #1e40af 100%); padding: 40px 30px; border-radius: 16px; margin-bottom: 30px;">
            <h1 style="color: white; font-size: 32px; font-weight: bold; margin: 0 0 15px 0;">Welcome to Fed Risk Brief</h1>
            <p style="color: #cbd5e1; font-size: 18px; margin: 0; line-height: 1.6;">
              Thank you for subscribing to our weekly Federal Reserve analysis newsletter.
            </p>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
            <h2 style="color: #1e293b; font-size: 24px; margin: 0 0 20px 0;">What to Expect</h2>
            <ul style="color: #475569; font-size: 16px; line-height: 1.8; margin: 0; padding-left: 20px;">
              <li>Weekly Federal Reserve policy analysis and signals</li>
              <li>Market impact assessments from FOMC communications</li>
              <li>Portfolio positioning insights for policy scenarios</li>
              <li>Exclusive institutional research and data</li>
            </ul>
          </div>
          
          <div style="text-align: center; padding: 30px 0;">
            <a href="https://fedanalysis.com/dashboard" 
               style="background: #2563eb; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
              Launch Dashboard
            </a>
          </div>
          
          <div style="border-top: 1px solid #e2e8f0; padding-top: 30px; text-align: center;">
            <p style="color: #64748b; font-size: 14px; margin: 0;">
              FedAnalysis - Professional Federal Reserve Analysis Platform<br>
              <a href="https://fedanalysis.com" style="color: #2563eb;">fedanalysis.com</a>
            </p>
          </div>
        </div>
      `,
    });

    console.log("Newsletter welcome email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-newsletter function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
