
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SummitLogo from "@/components/SummitLogo";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoIcon, UserPlus, Mail, KeyRound } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <SummitLogo className="w-64 h-auto mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-hauler-dark text-center">
            Customer Portal
          </h1>
          <p className="text-hauler-secondary mt-2 text-center">
            Welcome to the Summit Waste Services customer portal
          </p>
        </div>

        <Card className="w-full shadow-lg border-0">
          <CardContent className="p-6 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-center">
                What would you like to do?
              </h2>
              
              <Button 
                onClick={() => navigate(`/login`)}
                className="h-12 flex items-center gap-2 bg-hauler-primary hover:bg-hauler-primary/90 text-white"
              >
                <Mail className="h-5 w-5" />
                Sign in
                <div className="flex-grow"></div>
              </Button>
              
              <Button 
                onClick={() => navigate(`/register`)}
                variant="outline" 
                className="h-12 flex items-center gap-2 border-hauler-primary text-hauler-primary hover:bg-hauler-primary/10"
              >
                <UserPlus className="h-5 w-5" />
                Create Account
                <div className="flex-grow"></div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-hauler-secondary" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Create a permanent account to access your billing statements, 
                      service history, and request additional services.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Button>
              
              <Button 
                onClick={() => navigate(`/access-account`)}
                variant="secondary" 
                className="h-12 flex items-center gap-2"
              >
                <KeyRound className="h-5 w-5" />
                One Time Access
                <div className="flex-grow"></div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-hauler-secondary" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Quick access to make a payment without creating an account. 
                      You'll need your account number and invoice number.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Button>
            </div>

            <div className="mt-2 text-center text-sm text-muted-foreground">
              Need help? Contact customer service: (555) 123-4567
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Welcome;
