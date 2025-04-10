
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Control } from "react-hook-form";

interface AccountNumberFieldProps {
  control: Control<any>;
  disabled: boolean;
  demoValue: string;
}

const AccountNumberField = ({ control, disabled, demoValue }: AccountNumberFieldProps) => {
  return (
    <FormField
      control={control}
      name="accountNumber"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center">
            Account Number
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 ml-1 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Your account number can be found on your invoice</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </FormLabel>
          <FormControl>
            <Input 
              placeholder="e.g. 10001" 
              {...field} 
              disabled={disabled}
            />
          </FormControl>
          <FormDescription>
            For demo, use: {demoValue}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AccountNumberField;
