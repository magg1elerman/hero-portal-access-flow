
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: string;
  dueDate: string;
}

interface CustomerData {
  name: string;
  accountNumber: string;
  balance: number;
  lastPaymentDate: string;
  [key: string]: any;
}

interface BillingViewProps {
  invoices: Invoice[];
  customer: CustomerData;
}

const BillingView: React.FC<BillingViewProps> = ({ invoices, customer }) => {
  const { toast } = useToast();

  const handlePayInvoice = (invoiceId: string) => {
    toast({
      title: "Payment Processing",
      description: "This is a demo. In production, this would redirect to a payment gateway.",
    });
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Invoice Download",
      description: "This is a demo. In production, this would download a PDF invoice.",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Billing</h2>
      
      {/* Account Balance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Account Balance</CardTitle>
          <CardDescription>Current billing summary</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Current Balance</h3>
              <p className={`mt-1 text-2xl font-bold ${customer.balance > 0 ? 'text-hauler-error' : 'text-hauler-success'}`}>
                ${customer.balance.toFixed(2)}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Last Payment</h3>
              <p className="mt-1 text-hauler-dark">
                ${customer.balance > 0 ? '0.00' : '125.50'} • {customer.lastPaymentDate}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Payment Methods</h3>
              <p className="mt-1 text-hauler-dark">
                Credit Card ending in 4242
              </p>
            </div>
          </div>
          
          {customer.balance > 0 && (
            <div className="mt-6 flex justify-end">
              <Button onClick={() => handlePayInvoice("current")}>Pay Balance</Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Invoice History */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice History</CardTitle>
          <CardDescription>Review and pay your invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      invoice.status === 'Paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadInvoice(invoice.id)}
                      >
                        Download
                      </Button>
                      
                      {invoice.status !== 'Paid' && (
                        <Button
                          size="sm"
                          onClick={() => handlePayInvoice(invoice.id)}
                        >
                          Pay
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingView;
