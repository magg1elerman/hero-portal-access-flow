
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import HaulerHeroLogo from "@/components/HaulerHeroLogo";
import { RateLimiter } from "@/utils/rateLimiter";

// Mock database of valid accounts for demo purposes
const VALID_ACCOUNTS = [
  { accountNumber: "1001", invoiceNumber: "INV-10001", businessId: "sales-demo" },
  { accountNumber: "1002", invoiceNumber: "INV-10002", businessId: "sales-demo" },
  { accountNumber: "2001", invoiceNumber: "INV-20001", businessId: "other-business" },
];

const NewUser = () => {
  const [searchParams] = useSearchParams();
  const businessId = searchParams.get("bid") || "";
  const navigate = useNavigate();
  const { toast } = useToast();
  const rateLimiter = new RateLimiter(5, 5 * 60 * 1000); // 5 attempts in 5 minutes

  const [accountNumber, setAccountNumber] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [email, setEmail] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    // Check if this IP is already locked
    const lockStatus = rateLimiter.checkLocked();
    setIsLocked(lockStatus.locked);
    setAttempts(lockStatus.attempts);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      toast({
        title: "Access Locked",
        description: "Too many failed attempts. Please try again later.",
        variant: "destructive",
      });
      return;
    }

    if (!accountNumber || !invoiceNumber) {
      toast({
        title: "Error",
        description: "Account number and invoice number are required",
        variant: "destructive",
      });
      return;
    }

    // Increment attempt counter
    const result = rateLimiter.attempt();
    setAttempts(result.attempts);
    
    if (result.locked) {
      setIsLocked(true);
      toast({
        title: "Access Locked",
        description: "Too many failed attempts. Your access is locked for 24 hours.",
        variant: "destructive",
      });
      return;
    }

    // Show warning after 3 attempts
    if (result.attempts === 3) {
      toast({
        title: "Warning",
        description: "You have 2 more attempts before being locked out for 24 hours.",
        variant: "warning",
      });
    }
    
    // Show warning after 4 attempts
    if (result.attempts === 4) {
      toast({
        title: "Final Warning",
        description: "This is your last attempt before being locked out for 24 hours.",
        variant: "warning",
      });
    }

    // Check if account is valid (in our mock database)
    const isValid = VALID_ACCOUNTS.some(
      account => 
        account.accountNumber === accountNumber && 
        account.invoiceNumber === invoiceNumber && 
        account.businessId === businessId
    );

    if (isValid) {
      // Reset the rate limiter on success
      rateLimiter.reset();
      
      if (email) {
        toast({
          title: "Email Sent",
          description: "Portal access information has been sent to your email.",
          variant: "default",
        });
      }
      
      toast({
        title: "Success",
        description: "Your account has been verified. Redirecting to portal...",
        variant: "default",
      });
      
      // Small delay for user to see the success message
      setTimeout(() => {
        navigate(`/portal?bid=${businessId}&account=${accountNumber}`);
      }, 1500);
    } else {
      toast({
        title: "Verification Failed",
        description: "The account information you provided could not be verified.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <HaulerHeroLogo className="mx-auto mb-4 h-16" />
          <h2 className="text-2xl font-semibold text-hauler-dark">Create Portal Account</h2>
          <p className="text-hauler-secondary mt-2">Business ID: {businessId}</p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Account Verification</CardTitle>
            <CardDescription>
              Please enter your account details to verify your identity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="accountNumber">Account Number <span className="text-red-500">*</span></Label>
                  <Input
                    id="accountNumber"
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="e.g. 1001"
                    disabled={isLocked}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="invoiceNumber">Invoice Number <span className="text-red-500">*</span></Label>
                  <Input
                    id="invoiceNumber"
                    type="text"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    placeholder="e.g. INV-10001"
                    disabled={isLocked}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@example.com"
                    disabled={isLocked}
                  />
                  <p className="text-xs text-muted-foreground">
                    Provide your email to receive portal access information
                  </p>
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLocked}
                >
                  {isLocked ? "Access Locked" : "Verify Account"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            {isLocked && (
              <div className="text-sm text-red-500 mb-2 text-center">
                Your access is locked due to too many failed attempts. 
                Please try again after 24 hours.
              </div>
            )}
            {attempts > 0 && !isLocked && (
              <div className="text-sm text-hauler-warning mb-2 text-center">
                Failed attempts: {attempts}/5
              </div>
            )}
            <Button variant="outline" className="w-full mt-2" asChild>
              <a href={`/login?bid=${businessId}`}>Back to Login</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default NewUser;
