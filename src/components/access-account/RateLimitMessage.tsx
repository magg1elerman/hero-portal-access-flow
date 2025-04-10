
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface RateLimitMessageProps {
  isLocked: boolean;
  resetLimiter: () => void;
}

const RateLimitMessage = ({ isLocked, resetLimiter }: RateLimitMessageProps) => {
  const { toast } = useToast();
  
  if (!isLocked) return null;
  
  return (
    <>
      <div className="mt-4 p-3 bg-red-50 text-red-800 rounded-md text-sm">
        Your access has been temporarily locked due to too many failed attempts.
        Please try again later or contact customer support.
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
};

export default RateLimitMessage;
