
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AccountNumberField from "./AccountNumberField";
import InvoiceNumberField from "./InvoiceNumberField";
import EmailField from "./EmailField";
import RateLimitMessage from "./RateLimitMessage";
import { RateLimiter } from "@/utils/rateLimiter";

const rateLimiter = new RateLimiter(5, 5 * 60 * 1000);

const formSchema = z.object({
  accountNumber: z.string()
    .min(4, "Account number must be at least 4 characters")
    .max(10, "Account number must be at most 10 characters"),
  invoiceNumber: z.string()
    .min(6, "Invoice number must be at least 6 characters")
    .max(15, "Invoice number must be at most 15 characters"),
  email: z.string().email("Invalid email address").optional().or(z.literal('')),
});

interface AccessAccountFormProps {
  businessId: string;
}

const AccessAccountForm = ({ businessId }: AccessAccountFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const limitStatus = rateLimiter.checkLocked();
  const [isLocked, setIsLocked] = useState(limitStatus.locked);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountNumber: "",
      invoiceNumber: "",
      email: "",
    },
  });

  // Updated to match the console log data
  const demoAccount = "1001";
  const demoInvoice = "INV-10001";

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const attemptResult = rateLimiter.attempt();
    
    if (attemptResult.locked) {
      setIsLocked(true);
      toast({
        title: "Too many attempts",
        description: "Please try again after 24 hours",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    if (attemptResult.attempts === 3) {
      toast({
        title: "Warning",
        description: "You have 2 more attempts before being temporarily locked out",
        variant: "destructive",
      });
    } else if (attemptResult.attempts === 4) {
      toast({
        title: "Final Attempt",
        description: "This is your last attempt before being locked out for 24 hours",
        variant: "destructive",
      });
    }

    setTimeout(() => {
      setIsSubmitting(false);

      // Update the validation check to use the new demo values
      if (data.accountNumber === demoAccount && data.invoiceNumber === demoInvoice) {
        toast({
          title: "Success",
          description: "Redirecting to payment screen",
        });
        
        const emailParam = data.email ? `&email=${encodeURIComponent(data.email)}` : '';
        
        navigate(`/portal?bid=${businessId}&temp=true&account=${data.accountNumber}${emailParam}`);
      } else {
        toast({
          title: "Invalid credentials",
          description: "The account or invoice number you entered is incorrect",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  const resetLimiter = () => {
    rateLimiter.reset();
    setIsLocked(false);
    toast({
      title: "Rate limiter reset",
      description: "For demo purposes only",
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <AccountNumberField 
            control={form.control} 
            disabled={isLocked || isSubmitting}
            demoValue={demoAccount}
          />
          <InvoiceNumberField 
            control={form.control} 
            disabled={isLocked || isSubmitting}
            demoValue={demoInvoice}
          />
          <EmailField 
            control={form.control} 
            disabled={isLocked || isSubmitting}
          />
          <Button 
            type="submit" 
            className="w-full mt-6" 
            disabled={isLocked || isSubmitting}
          >
            {isSubmitting ? "Verifying..." : "Continue to Account"}
          </Button>
        </form>
      </Form>
      
      <RateLimitMessage 
        isLocked={isLocked}
        resetLimiter={resetLimiter}
      />
    </div>
  );
};

export default AccessAccountForm;
