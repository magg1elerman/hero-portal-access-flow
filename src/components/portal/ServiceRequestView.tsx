
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const ServiceRequestView: React.FC = () => {
  const { toast } = useToast();
  const [requestType, setRequestType] = useState("");
  const [priority, setPriority] = useState("normal");
  const [description, setDescription] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!requestType || !description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Service Request Submitted",
      description: "Your request has been received. A representative will contact you shortly.",
    });
    
    // Reset form
    setRequestType("");
    setPriority("normal");
    setDescription("");
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Service Requests</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Submit a Request</CardTitle>
            <CardDescription>Tell us how we can help</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="requestType">Request Type <span className="text-red-500">*</span></Label>
                  <Select value={requestType} onValueChange={setRequestType} required>
                    <SelectTrigger id="requestType">
                      <SelectValue placeholder="Select a request type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="missed-pickup">Missed Pickup</SelectItem>
                      <SelectItem value="schedule-change">Schedule Change</SelectItem>
                      <SelectItem value="bin-replacement">Bin Replacement</SelectItem>
                      <SelectItem value="billing-inquiry">Billing Inquiry</SelectItem>
                      <SelectItem value="service-upgrade">Service Upgrade</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <RadioGroup value={priority} onValueChange={setPriority} className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="low" />
                      <Label htmlFor="low">Low</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="normal" id="normal" />
                      <Label htmlFor="normal">Normal</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="high" />
                      <Label htmlFor="high">High</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
                  <Textarea 
                    id="description" 
                    placeholder="Please provide details about your request" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    required
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <Button type="submit" className="w-full">Submit Request</Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">Customer Support:</p>
                <p className="font-medium">(800) 555-1234</p>
                <p className="text-sm mt-4">Email:</p>
                <p className="font-medium">support@haulerhero.com</p>
                <p className="text-sm mt-4">Hours:</p>
                <p className="font-medium">Monday-Friday: 8am-6pm</p>
                <p className="font-medium">Saturday: 9am-1pm</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Request Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <p className="text-muted-foreground mb-4">You have no active service requests</p>
                <Button variant="outline" size="sm">View History</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestView;
