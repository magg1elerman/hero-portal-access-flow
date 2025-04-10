
import { Button } from "@/components/ui/button";
import { ExclamationTriangleIcon } from "lucide-react";

interface RateLimitMessageProps {
  isLocked: boolean;
  attemptsRemaining?: number;
  resetLimiter: () => void;
}

const RateLimitMessage = ({ isLocked, attemptsRemaining = 0, resetLimiter }: RateLimitMessageProps) => {
  if (!isLocked && (!attemptsRemaining || attemptsRemaining > 2)) {
    return null;
  }
  
  if (isLocked) {
    return (
      <>
        <div className="mt-4 p-3 bg-red-50 text-red-800 rounded-md text-sm">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
            <span>Your access has been temporarily locked due to too many failed attempts.
            Please try again after 24 hours or contact customer support.</span>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-2 w-full"
          onClick={resetLimiter}
        >
          Reset Limiter (Demo Only)
        </Button>
      </>
    );
  }
  
  // Show warning when getting close to limit
  return (
    <div className="mt-4 p-3 bg-amber-50 text-amber-800 rounded-md text-sm">
      <div className="flex items-center">
        <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
        <span>
          {attemptsRemaining === 1 
            ? "This is your final attempt before being locked out for 24 hours." 
            : `You have ${attemptsRemaining} more attempts before being temporarily locked out.`}
        </span>
      </div>
    </div>
  );
};

export default RateLimitMessage;
