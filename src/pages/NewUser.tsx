import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import HaulerHeroLogo from "@/components/HaulerHeroLogo";
import { RateLimiter } from "@/utils/rateLimiter";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Lock, Unlock, ArrowRight, KeyRound, ArrowLeft } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";

const VALID_ACCOUNTS = [
  { accountNumber: "1001", invoiceNumber: "INV-10001", businessId: "sales-demo" },
  { accountNumber: "1002", invoiceNumber: "INV-10002", businessId: "sales-demo" },
  { accountNumber: "2001", invoiceNumber: "INV-20001", businessId: "other-business" },
];

type Step = "account-details" | "verification" | "success";

interface NewUserProps {
  businessId: string;
}

const NewUser = ({ businessId }: NewUserProps) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const rateLimiter = new RateLimiter(5, 5 * 60 * 1000);

  const [accountNumber, setAccountNumber] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const [currentStep, setCurrentStep] = useState<Step>("account-details");
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  useEffect(() => {
    const lockStatus = rateLimiter.checkLocked();
    setIsLocked(lockStatus.locked);
    setAttempts(lockStatus.attempts);
    
    console.log("Current business ID:", businessId);
    console.log("Valid accounts:", VALID_ACCOUNTS);
  }, [businessId]);

  const handleReset = () => {
    rateLimiter.reset();
    setIsLocked(false);
    setAttempts(0);
    setResetDialogOpen(false);
    toast({
      title: "Rate Limiter Reset",
      description: "You are now unlocked and can continue testing.",
      variant: "default",
    });
  };

  const validateAccountDetails = () => {
    if (!accountNumber || !invoiceNumber) {
      toast({
        title: "Error",
        description: "Account number and invoice number are required",
        variant: "destructive",
      });
      return false;
    }

    const isValid = VALID_ACCOUNTS.some(
      account => 
        account.accountNumber === accountNumber && 
        account.invoiceNumber === invoiceNumber && 
        account.businessId === businessId
    );
    
    console.log("Validation result:", isValid);

    if (!isValid) {
      const result = rateLimiter.attempt();
      setAttempts(result.attempts);
      
      if (result.locked) {
        setIsLocked(true);
        toast({
          title: "Access Locked",
          description: "Too many failed attempts. Your access is locked for 24 hours.",
          variant: "destructive",
        });
        return false;
      }

      if (result.attempts === 3) {
        toast({
          title: "Warning",
          description: "You have 2 more attempts before being locked out for 24 hours.",
          variant: "destructive",
        });
      }
      
      if (result.attempts === 4) {
        toast({
          title: "Final Warning",
          description: "This is your last attempt before being locked out for 24 hours.",
          variant: "destructive",
        });
      }

      toast({
        title: "Verification Failed",
        description: "The account information you provided could not be verified.",
        variant: "destructive",
      });
      
      return false;
    }

    return true;
  };

  const handleSubmitAccountDetails = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      toast({
        title: "Access Locked",
        description: "Too many failed attempts. Please try again later.",
        variant: "destructive",
      });
      return;
    }

    console.log("Verification attempt:", {
      accountNumber,
      invoiceNumber,
      businessId,
    });

    if (validateAccountDetails()) {
      setCurrentStep("verification");
      
      toast({
        title: "Account Verified",
        description: "Verification code has been sent to your email.",
        variant: "default",
      });
    }
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validCode = "123456";
    
    if (verificationCode === validCode) {
      rateLimiter.reset();
      
      toast({
        title: "Success",
        description: "Your account has been verified. Redirecting to portal...",
        variant: "default",
      });
      
      setCurrentStep("success");
      
      setTimeout(() => {
        navigate(`/portal?bid=${businessId}&account=${accountNumber}`);
      }, 2000);
    } else {
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

      if (result.attempts === 3) {
        toast({
          title: "Warning",
          description: "You have 2 more attempts before being locked out for 24 hours.",
          variant: "destructive",
        });
      }
      
      if (result.attempts === 4) {
        toast({
          title: "Final Warning",
          description: "This is your last attempt before being locked out for 24 hours.",
          variant: "destructive",
        });
      }

      toast({
        title: "Verification Failed",
        description: "The code you entered is incorrect.",
        variant: "destructive",
      });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case "account-details":
        return (
          <form onSubmit={handleSubmitAccountDetails}>
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
                {isLocked ? "Access Locked" : "Verify Account"} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        );

      case "verification":
        return (
          <form onSubmit={handleVerifyCode}>
            <div className="grid gap-4">
              <Alert className="mb-4">
                <KeyRound className="h-4 w-4" />
                <AlertTitle>Verification Required</AlertTitle>
                <AlertDescription>
                  We've sent a 6-digit verification code to {email || "your registered email address"}.
                  Enter the code below to complete registration.
                </AlertDescription>
              </Alert>
              
              <div className="flex flex-col items-center space-y-2">
                <Label htmlFor="verification-code">Enter Verification Code</Label>
                <div className="flex justify-center w-full">
                  <InputOTP 
                    maxLength={6} 
                    value={verificationCode} 
                    onChange={(value) => setVerificationCode(value)}
                    disabled={isLocked}
                    className="mb-4"
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  For demo purposes, the code is: 123456
                </p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full mt-4" 
                disabled={isLocked || verificationCode.length !== 6}
              >
                {isLocked ? "Access Locked" : "Verify Code"}
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full mt-2" 
                onClick={() => setCurrentStep("account-details")}
              >
                Back to Account Details
              </Button>
            </div>
          </form>
        );

      case "success":
        return (
          <div className="grid gap-4 text-center">
            <div className="flex justify-center mb-2">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold">Verification Successful!</h3>
            <p className="text-muted-foreground">
              Your account has been verified successfully. Redirecting you to the portal dashboard...
            </p>
            <div className="mt-4 flex justify-center">
              <Button 
                type="button" 
                className="w-full" 
                onClick={() => navigate(`/portal?bid=${businessId}&account=${accountNumber}`)}
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <HaulerHeroLogo className="mx-auto mb-4 h-16" />
          <h2 className="text-2xl font-semibold text-hauler-dark">Create Portal Account</h2>
          <p className="text-hauler-secondary mt-2">Business ID: {businessId || "No business ID provided"}</p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              {currentStep === "account-details" && "Account Verification"}
              {currentStep === "verification" && "Email Verification"}
              {currentStep === "success" && "Verification Complete"}
            </CardTitle>
            <CardDescription>
              {currentStep === "account-details" && "Please enter your account details to verify your identity"}
              {currentStep === "verification" && "Enter the verification code sent to your email"}
              {currentStep === "success" && "Your account has been successfully verified"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStep()}
          </CardContent>
          <CardFooter className="flex flex-col">
            {isLocked && (
              <div className="text-sm text-red-500 mb-2 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Lock className="h-4 w-4" />
                  <span>Your access is locked due to too many failed attempts.</span>
                </div>
                <span>Please try again after 24 hours.</span>
              </div>
            )}
            {attempts > 0 && !isLocked && (
              <div className="text-sm text-hauler-warning mb-2 text-center">
                Failed attempts: {attempts}/5
              </div>
            )}
            <div className="w-full mt-2 bg-gray-100 p-3 rounded-md text-sm mb-3">
              <p className="font-medium mb-1">Demo Accounts:</p>
              <p>Business ID: sales-demo</p>
              <p>Account: 1001, Invoice: INV-10001</p>
              <p>Account: 1002, Invoice: INV-10002</p>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full mt-2 mb-2 border-dashed border-hauler-warning text-hauler-warning hover:bg-hauler-warning/10" 
              onClick={() => setResetDialogOpen(true)}
            >
              <Unlock className="mr-2 h-4 w-4" /> Reset Rate Limiter (For Testing)
            </Button>
            
            <Button 
              variant="link" 
              className="w-full mt-2 text-gray-600 hover:text-gray-900" 
              onClick={() => navigate(`/welcome?bid=${businessId}`)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Go back
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Rate Limiter</DialogTitle>
            <DialogDescription>
              This will reset all attempts and unlock your account. This is for testing purposes only.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setResetDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleReset}>Confirm Reset</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewUser;
