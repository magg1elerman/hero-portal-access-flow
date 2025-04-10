
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import HaulerHeroLogo from "@/components/HaulerHeroLogo";

const Login = ({ businessId }: { businessId: string }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
    
    // Simulate successful login for demo purposes
    toast({
      title: "Login successful",
      description: "Redirecting to portal...",
    });
    
    // Redirect to portal with business ID
    navigate(`/portal?bid=${businessId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <HaulerHeroLogo className="mx-auto mb-4 h-16" />
          <h2 className="text-2xl font-semibold text-hauler-dark">Customer Portal</h2>
          <p className="text-hauler-secondary mt-2">Business ID: {businessId}</p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="example@email.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
                <Button type="submit" className="w-full">Login</Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="w-full text-center mt-4">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link 
                  to={`/newuser?bid=${businessId}`} 
                  className="text-hauler-primary hover:underline font-medium"
                >
                  Create Portal Account
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
