
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

const AccessAccountForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const limitStatus = rateLimiter.checkLocked();
  const [isLocked, setIsLocked] = useState(limitStatus.locked);
  const [attempts, setAttempts] = useState(limitStatus.attempts || 0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountNumber: "",
      invoiceNumber: "",
      email: "",
    },
  });

  // Updated to match the console log data
  const validAccounts = [
    { accountNumber: "1001", invoiceNumber: "INV-10001" },
    { accountNumber: "1002", invoiceNumber: "INV-10002" },
    { accountNumber: "2001", invoiceNumber: "INV-20001" }
  ];

  console.log("Valid accounts:", validAccounts);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const attemptResult = rateLimiter.attempt();
    setAttempts(attemptResult.attempts);
    
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

    // Log verification attempt for debugging
    console.log("Verification attempt:", {
      accountNumber: data.accountNumber,
      invoiceNumber: data.invoiceNumber
    });

    setTimeout(() => {
      setIsSubmitting(false);

      // Check if credentials match any valid account
      const isValid = validAccounts.some(
        account => account.accountNumber === data.accountNumber && 
                  account.invoiceNumber === data.invoiceNumber
      );
      
      console.log("Validation result:", isValid);

      if (isValid) {
        toast({
          title: "Success",
          description: "Redirecting to payment screen",
        });
        
        const emailParam = data.email ? `&email=${encodeURIComponent(data.email)}` : '';
        
        navigate(`/portal?account=${data.accountNumber}${emailParam}`);

        // Reset rate limiter on successful login
        rateLimiter.reset();
        setIsLocked(false);
        setAttempts(0);
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
    setAttempts(0);
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
            demoValue="1001"
          />
          <InvoiceNumberField 
            control={form.control} 
            disabled={isLocked || isSubmitting}
            demoValue="INV-10001"
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
        attemptsRemaining={isLocked ? 0 : 5 - attempts}
        resetLimiter={resetLimiter}
      />
    </div>
  );
};

export default AccessAccountForm;
