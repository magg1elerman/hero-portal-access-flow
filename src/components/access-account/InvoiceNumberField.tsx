
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Control } from "react-hook-form";

interface InvoiceNumberFieldProps {
  control: Control<any>;
  disabled: boolean;
  demoValue: string;
}

const InvoiceNumberField = ({ control, disabled, demoValue }: InvoiceNumberFieldProps) => {
  return (
    <FormField
      control={control}
      name="invoiceNumber"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center">
            Invoice Number
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 ml-1 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Any valid invoice number will work</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </FormLabel>
          <FormControl>
            <Input 
              placeholder="e.g. INV10001" 
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

export default InvoiceNumberField;
