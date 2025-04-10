
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Control } from "react-hook-form";

interface EmailFieldProps {
  control: Control<any>;
  disabled: boolean;
}

const EmailField = ({ control, disabled }: EmailFieldProps) => {
  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center">
            Email (Optional)
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 ml-1 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Provide your email to receive payment confirmations</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </FormLabel>
          <FormControl>
            <Input 
              type="email"
              placeholder="your.email@example.com" 
              {...field} 
              disabled={disabled}
            />
          </FormControl>
          <FormDescription>
            Optional: Enter your email to receive payment confirmations
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EmailField;
