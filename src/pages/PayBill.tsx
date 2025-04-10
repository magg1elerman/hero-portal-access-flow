
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, KeyRound } from "lucide-react";
import PageHeader from "@/components/access-account/PageHeader";
import AccessAccountForm from "@/components/access-account/AccessAccountForm";

const PayBill = ({ businessId }: { businessId: string }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <PageHeader businessId={businessId} />

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center">
              <KeyRound className="mr-2 h-5 w-5" />
              One-Time Access
            </CardTitle>
            <CardDescription>
              Just want to make a quick payment? Enter your Account Number and Invoice Number—no email required! We'll securely connect you to your invoice for a fast, one-time payment.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AccessAccountForm businessId={businessId} />
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="w-full text-center mt-4">
              <Button 
                variant="link" 
                onClick={() => navigate(`/welcome?bid=${businessId}`)}
                className="text-hauler-secondary"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Go Back
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PayBill;
