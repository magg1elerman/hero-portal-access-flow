
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import HaulerHeroLogo from "@/components/HaulerHeroLogo";
import { ArrowLeft, HelpCircle, CreditCard } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { RateLimiter } from "@/utils/rateLimiter";

// Create a rate limiter with 5 attempts in 5 minutes
const rateLimiter = new RateLimiter(5, 5 * 60 * 1000);

// Define the form schema
const formSchema = z.object({
  accountNumber: z.string()
    .min(4, "Account number must be at least 4 characters")
    .max(10, "Account number must be at most 10 characters"),
  invoiceNumber: z.string()
    .min(6, "Invoice number must be at least 6 characters")
    .max(15, "Invoice number must be at most 15 characters"),
});

const PayBill = ({ businessId }: { businessId: string }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Check if user is rate limited
  const limitStatus = rateLimiter.checkLocked();
  const [isLocked, setIsLocked] = useState(limitStatus.locked);

  // Setup form with zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountNumber: "",
      invoiceNumber: "",
    },
  });

  // Demo credentials for testing
  const demoAccount = "10001";
  const demoInvoice = "INV10001";

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Record the attempt in rate limiter
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

    // Show warning if user is approaching the rate limit
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

    // Simulate API validation (replace with actual API call)
    setTimeout(() => {
      setIsSubmitting(false);

      // For demo purposes, check if using demo credentials
      if (data.accountNumber === demoAccount && data.invoiceNumber === demoInvoice) {
        toast({
          title: "Success",
          description: "Redirecting to payment screen",
        });
        // Navigate to the payment portal
        navigate(`/portal?bid=${businessId}&temp=true&account=${data.accountNumber}`);
      } else {
        toast({
          title: "Invalid credentials",
          description: "The account or invoice number you entered is incorrect",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  // For testing purposes - reset the rate limiter
  const resetLimiter = () => {
    rateLimiter.reset();
    setIsLocked(false);
    toast({
      title: "Rate limiter reset",
      description: "For demo purposes only",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <HaulerHeroLogo className="mx-auto mb-4 h-16" />
          <h2 className="text-2xl font-semibold text-hauler-dark">Make a Payment</h2>
          <p className="text-hauler-secondary mt-2">Business ID: {businessId}</p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5" />
              One-Time Payment
            </CardTitle>
            <CardDescription>
              Enter your account details to make a payment without creating an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="accountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        Account Number
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 ml-1 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Your account number can be found on your invoice</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g. 10001" 
                          {...field} 
                          disabled={isLocked || isSubmitting}
                        />
                      </FormControl>
                      <FormDescription>
                        For demo, use: {demoAccount}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="invoiceNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        Invoice Number
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 ml-1 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Any valid invoice number will work</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g. INV10001" 
                          {...field} 
                          disabled={isLocked || isSubmitting}
                        />
                      </FormControl>
                      <FormDescription>
                        For demo, use: {demoInvoice}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full mt-6" 
                  disabled={isLocked || isSubmitting}
                >
                  {isSubmitting ? "Verifying..." : "Continue to Payment"}
                </Button>
              </form>
            </Form>
            
            {isLocked && (
              <div className="mt-4 p-3 bg-red-50 text-red-800 rounded-md text-sm">
                Your access has been temporarily locked due to too many failed attempts.
                Please try again later or contact customer support.
              </div>
            )}
            
            {/* For demo purposes only - reset button */}
            {isLocked && (
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2 w-full"
                onClick={resetLimiter}
              >
                Reset Limiter (Demo Only)
              </Button>
            )}
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="w-full text-center mt-4">
              <Button 
                variant="link" 
                onClick={() => navigate(`/welcome?bid=${businessId}`)}
                className="text-hauler-secondary"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Welcome
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PayBill;
