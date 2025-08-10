
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface NewsletterSignupProps {
  className?: string;
  placeholder?: string;
  buttonText?: string;
}

export const NewsletterSignup = ({ 
  className = "", 
  placeholder = "your@institution.com",
  buttonText = "Subscribe" 
}: NewsletterSignupProps) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      // First, insert into newsletter_subscriptions table
      const { error: dbError } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email }]);

      if (dbError) {
        if (dbError.code === '23505') {
          toast({
            title: "Already Subscribed",
            description: "This email is already subscribed to our Fed Risk Brief.",
            variant: "destructive",
          });
          return;
        } else {
          throw dbError;
        }
      }

      // Then, send welcome email via edge function
      const { error: emailError } = await supabase.functions.invoke('send-newsletter', {
        body: { email }
      });

      if (emailError) {
        console.warn("Welcome email failed to send:", emailError);
        // Don't fail the subscription if email fails
      }

      toast({
        title: "Successfully Subscribed!",
        description: "Welcome to Fed Risk Brief. Check your email for confirmation.",
      });
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Subscription Error",
        description: "Failed to subscribe. Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex gap-3 ${className}`}>
      <Input
        type="email"
        placeholder={placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 h-12 px-4 text-base border-2 border-slate-300 focus:border-blue-500 rounded-xl"
        required
      />
      <Button 
        type="submit" 
        disabled={loading}
        className="h-12 px-8 font-bold text-base bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg hover:shadow-xl transition-all"
      >
        {loading ? "Subscribing..." : buttonText}
      </Button>
    </form>
  );
};
