
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-buy-button': {
        'buy-button-id': string;
        'publishable-key': string;
      };
    }
  }
}

const StripePayment = () => {
  useEffect(() => {
    // Load Stripe script
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/buy-button.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      const existingScript = document.querySelector('script[src="https://js.stripe.com/v3/buy-button.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Upgrade to Premium</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-slate-600 mb-6">
          Get access to advanced Fed analysis features and real-time insights
        </p>
        <stripe-buy-button
          buy-button-id="buy_btn_1RbnV1Fh3AAdOaNUZ6CV06oX"
          publishable-key="pk_live_51RChLBFh3AAdOaNUYottJOf8qYBsnLKksXYSzLV8E7JFnZWQGelF7LhRNQttcjCXNjBuiAhw9mfeJkDB7CqcksrP00jlOt7ENc"
        />
      </CardContent>
    </Card>
  );
};

export default StripePayment;
