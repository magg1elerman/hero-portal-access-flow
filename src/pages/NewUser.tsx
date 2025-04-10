
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import HaulerHeroLogo from "@/components/HaulerHeroLogo";
import SummitLogo from "@/components/SummitLogo";
import { RateLimiter } from "@/utils/rateLimiter";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  AlertCircle, 
  Lock, 
  Unlock, 
  ArrowRight, 
  ArrowLeft, 
  Facebook, 
  Mail, 
  Google,
  Eye,
  EyeOff
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Custom Microsoft icon since it's not available in lucide-react
const MicrosoftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 23 23">
    <path fill="#f3f3f3" d="M0 0h23v23H0z"/>
    <path fill="#f35325" d="M1 1h10v10H1z"/>
    <path fill="#81bc06" d="M12 1h10v10H12z"/>
    <path fill="#05a6f0" d="M1 12h10v10H1z"/>
    <path fill="#ffba08" d="M12 12h10v10H12z"/>
  </svg>
);

// Facebook icon with blue color
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" fill="#1877F2" stroke="#1877F2"/>
  </svg>
);

const VALID_ACCOUNTS = [
  { accountNumber: "1001", invoiceNumber: "INV-10001", businessId: "sales-demo" },
  { accountNumber: "1002", invoiceNumber: "INV-10002", businessId: "sales-demo" },
  { accountNumber: "2001", invoiceNumber: "INV-20001", businessId: "other-business" },
];

type Step = "account-verification" | "create-login";

interface NewUserProps {
  businessId: string;
}

const NewUser = ({ businessId }: NewUserProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const rateLimiter = new RateLimiter(5, 5 * 60 * 1000);

  // Account verification state
  const [accountNumber, setAccountNumber] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  
  // Create login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [currentStep, setCurrentStep] = useState<Step>("account-verification");
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
      setCurrentStep("create-login");
      
      toast({
        title: "Account Verified",
        description: "Account found! Now create your login credentials.",
        variant: "default",
      });
    }
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email && password) {
      toast({
        title: "Account Created",
        description: "Your account has been created successfully. Redirecting to portal...",
        variant: "default",
      });
      
      setTimeout(() => {
        navigate(`/portal?bid=${businessId}&account=${accountNumber}`);
      }, 2000);
    } else if (email || password) {
      toast({
        title: "Missing Information",
        description: "Please provide both email and password to create your account.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "No Login Method Selected",
        description: "Please select a login method or provide email and password.",
        variant: "destructive",
      });
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `Continue with ${provider}`,
      description: `Redirecting to ${provider} for authentication...`,
      variant: "default",
    });
    
    setTimeout(() => {
      toast({
        title: "Account Created",
        description: "Your account has been linked successfully. Redirecting to portal...",
      });
      
      setTimeout(() => {
        navigate(`/portal?bid=${businessId}&account=${accountNumber}`);
      }, 1500);
    }, 1500);
  };

  const renderAccountVerificationStep = () => {
    return (
      <form onSubmit={handleSubmitAccountDetails}>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Step 1: Account Verification</h2>
            <p className="text-muted-foreground mb-4">
              First, let's verify your account. Please enter your Account Number and Invoice Number below.
              This helps us securely find your account details.
            </p>
          </div>
          
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
          </div>
          
          <Button 
            type="submit" 
            className="w-full mt-6" 
            disabled={isLocked}
          >
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    );
  };

  const renderCreateLoginStep = () => {
    return (
      <form onSubmit={handleCreateAccount}>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Step 2: Create your login</h2>
            <p className="text-muted-foreground mb-4">
              Great, we found your account! Now, how would you like to log in?
            </p>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm font-medium">Use your existing account (fastest!):</p>
            <div className="grid grid-cols-3 gap-3">
              <Button
                type="button"
                variant="outline"
                className="h-12 flex items-center justify-center"
                onClick={() => handleSocialLogin("Google")}
              >
                <Google className="h-5 w-5" />
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-12 flex items-center justify-center"
                onClick={() => handleSocialLogin("Microsoft")}
              >
                <MicrosoftIcon />
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-12 flex items-center justify-center"
                onClick={() => handleSocialLogin("Facebook")}
              >
                <FacebookIcon />
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  or
                </span>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-3">Sign up with email:</p>
              <div className="grid gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="email">Enter your email address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Choose a password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <Button type="submit" className="w-full">
              Create Account <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="w-full" 
              onClick={() => setCurrentStep("account-verification")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </div>
        </div>
      </form>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <SummitLogo className="mx-auto mb-4 w-64" />
          <h2 className="text-2xl font-semibold text-hauler-dark">Create Portal Account</h2>
          <p className="text-hauler-secondary mt-2">Business ID: {businessId || "No business ID provided"}</p>
        </div>

        <Card className="w-full">
          <CardContent className="pt-6">
            {currentStep === "account-verification" ? renderAccountVerificationStep() : renderCreateLoginStep()}
          </CardContent>
          <CardFooter className="flex flex-col">
            {isLocked && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Access Locked</AlertTitle>
                <AlertDescription>
                  Your access is locked due to too many failed attempts.
                  Please try again after 24 hours.
                </AlertDescription>
              </Alert>
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
              onClick={handleReset}
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
    </div>
  );
};

export default NewUser;
