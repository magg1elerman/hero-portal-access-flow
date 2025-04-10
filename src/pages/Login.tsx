import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import SummitLogo from "@/components/SummitLogo";

const Login = ({ businessId }: { businessId: string }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: "Invalid login",
        description: "Please enter both username and password",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      
      // Simulate successful login for demo purposes
      toast({
        title: "Login successful",
        description: "Redirecting to portal...",
      });
      
      // Redirect to portal with business ID
      navigate(`/portal?bid=${businessId}`);
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    
    // Simulate social login API request
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: `${provider} login successful`,
        description: "Redirecting to portal...",
      });
      
      // Redirect to portal with business ID
      navigate(`/portal?bid=${businessId}`);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <Card className="w-full max-w-md shadow-sm border-gray-100">
        <CardHeader className="flex flex-col items-center space-y-2 pb-2">
          <SummitLogo className="h-16 mb-2" />
          <h2 className="text-xl font-medium text-gray-800">Sign in</h2>
        </CardHeader>
        
        <CardContent className="px-8 py-6">
          <div className="grid gap-6">
            {/* Social Login Buttons */}
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => handleSocialLogin('Microsoft')}
                className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                disabled={isLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 23 23">
                  <path fill="#f3f3f3" d="M0 0h23v23H0z"/>
                  <path fill="#f35325" d="M1 1h10v10H1z"/>
                  <path fill="#81bc06" d="M12 1h10v10H12z"/>
                  <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                  <path fill="#ffba08" d="M12 12h10v10H12z"/>
                </svg>
              </button>
              
              <button 
                onClick={() => handleSocialLogin('Google')}
                className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                disabled={isLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 186.69 190.5">
                  <g transform="translate(1184.583 765.171)">
                    <path clip-path="none" mask="none" d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z" fill="#4285f4"/>
                    <path clip-path="none" mask="none" d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z" fill="#34a853"/>
                    <path clip-path="none" mask="none" d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.695-24.592 31.695-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z" fill="#fbbc05"/>
                    <path d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z" fill="#ea4335" clip-path="none" mask="none"/>
                  </g>
                </svg>
              </button>
              
              <button 
                onClick={() => handleSocialLogin('Facebook')}
                className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                disabled={isLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="#1877f2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
            </div>
            
            <div className="relative flex items-center gap-2 py-2">
              <Separator className="flex-1" />
              <span className="text-xs text-gray-500 px-2">Sign in with email</span>
              <Separator className="flex-1" />
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => navigate(`/email-login?bid=${businessId}`)}
              className="w-full flex items-center justify-center gap-2 text-gray-700 border-gray-300"
              disabled={isLoading}
            >
              <Mail className="h-4 w-4" />
              Sign in with email
            </Button>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col pt-0 items-center">
          <div className="w-full text-center mt-4 mb-6">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link 
                to={`/register?bid=${businessId}`} 
                className="text-hauler-primary hover:underline font-medium"
              >
                Create One Now
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
      
      <footer className="w-full mt-12 flex flex-col items-center text-sm text-gray-500 gap-3">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          105 S. 2nd St. Second Floor, Ste. 140, San Diego, CA 92106
        </div>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
          <a href="mailto:support@ecofleetsolutions.com" className="flex items-center hover:text-hauler-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            support@ecofleetsolutions.com
          </a>
          <a href="tel:+13013346212" className="flex items-center hover:text-hauler-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            (301)334-6212
          </a>
          <a href="https://www.ecofleetsolutions.com" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-hauler-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            https://www.ecofleetsolutions.com
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Login;
