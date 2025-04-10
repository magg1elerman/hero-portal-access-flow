
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import HaulerHeroLogo from "@/components/HaulerHeroLogo";
import DashboardView from "@/components/portal/DashboardView";
import BillingView from "@/components/portal/BillingView";
import PickupScheduleView from "@/components/portal/PickupScheduleView";
import ServiceRequestView from "@/components/portal/ServiceRequestView";

// Mock customer data for demo
const CUSTOMER_DATA = {
  "1001": {
    name: "Acme Corporation",
    accountNumber: "1001",
    accountType: "Commercial",
    address: "123 Business Park, San Francisco, CA 94103",
    contactName: "John Smith",
    contactEmail: "john@acmecorp.com",
    contactPhone: "(415) 555-1234",
    serviceLevel: "Premium",
    nextPickupDate: "2025-04-15",
    lastPaymentDate: "2025-03-28",
    balance: 245.80,
    stats: {
      wasteCollected: 3200,
      recyclingRate: 68,
      carbonOffset: 425
    }
  },
  "1002": {
    name: "Main Street Diner",
    accountNumber: "1002",
    accountType: "Small Business",
    address: "45 Main Street, San Francisco, CA 94105",
    contactName: "Sarah Johnson",
    contactEmail: "sarah@mainstreetdiner.com",
    contactPhone: "(415) 555-9876",
    serviceLevel: "Standard",
    nextPickupDate: "2025-04-12",
    lastPaymentDate: "2025-04-05",
    balance: 0,
    stats: {
      wasteCollected: 1050,
      recyclingRate: 52,
      carbonOffset: 135
    }
  }
};

// Mock invoice data
const INVOICE_DATA = {
  "1001": [
    { id: "INV-10001", date: "2025-03-01", amount: 245.80, status: "Unpaid", dueDate: "2025-04-15" },
    { id: "INV-9876", date: "2025-02-01", amount: 245.80, status: "Paid", dueDate: "2025-03-15" },
    { id: "INV-9542", date: "2025-01-01", amount: 245.80, status: "Paid", dueDate: "2025-02-15" }
  ],
  "1002": [
    { id: "INV-10002", date: "2025-04-01", amount: 125.50, status: "Paid", dueDate: "2025-04-15" },
    { id: "INV-9654", date: "2025-03-01", amount: 125.50, status: "Paid", dueDate: "2025-03-15" },
    { id: "INV-9321", date: "2025-02-01", amount: 125.50, status: "Paid", dueDate: "2025-02-15" }
  ]
};

// Mock pickup schedule data
const PICKUP_SCHEDULE = {
  "1001": [
    { date: "2025-04-15", type: "Waste", status: "Scheduled", time: "Morning (6am-12pm)" },
    { date: "2025-04-15", type: "Recycling", status: "Scheduled", time: "Morning (6am-12pm)" },
    { date: "2025-04-17", type: "Compost", status: "Scheduled", time: "Afternoon (12pm-5pm)" },
    { date: "2025-04-08", type: "Waste", status: "Completed", time: "Morning (6am-12pm)" },
    { date: "2025-04-08", type: "Recycling", status: "Completed", time: "Morning (6am-12pm)" },
    { date: "2025-04-10", type: "Compost", status: "Completed", time: "Afternoon (12pm-5pm)" }
  ],
  "1002": [
    { date: "2025-04-12", type: "Waste", status: "Scheduled", time: "Morning (6am-12pm)" },
    { date: "2025-04-12", type: "Recycling", status: "Scheduled", time: "Morning (6am-12pm)" },
    { date: "2025-04-05", type: "Waste", status: "Completed", time: "Morning (6am-12pm)" },
    { date: "2025-04-05", type: "Recycling", status: "Completed", time: "Morning (6am-12pm)" }
  ]
};

const Portal = () => {
  const [searchParams] = useSearchParams();
  const businessId = searchParams.get("bid") || "";
  const accountNumber = searchParams.get("account") || "";
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  
  const customerData = CUSTOMER_DATA[accountNumber as keyof typeof CUSTOMER_DATA];
  const invoiceData = INVOICE_DATA[accountNumber as keyof typeof INVOICE_DATA] || [];
  const pickupData = PICKUP_SCHEDULE[accountNumber as keyof typeof PICKUP_SCHEDULE] || [];

  useEffect(() => {
    // Verify we have valid account data
    if (!customerData) {
      toast({
        title: "Error",
        description: "Invalid account. Redirecting to login...",
        variant: "destructive",
      });
      
      setTimeout(() => {
        navigate(`/login?bid=${businessId}`);
      }, 2000);
    } else {
      toast({
        title: "Welcome",
        description: `Welcome to your customer portal, ${customerData.name}`,
      });
    }
  }, [customerData, businessId, navigate, toast]);

  if (!customerData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-lg font-medium">Verifying account...</h2>
          <p className="text-muted-foreground">Please wait</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <HaulerHeroLogo className="h-10 mr-4" />
            <div className="ml-4">
              <h2 className="text-sm font-medium text-hauler-dark">Customer Portal</h2>
              <p className="text-xs text-hauler-secondary">{customerData.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => navigate(`/login?bid=${businessId}`)}>
              Log Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Account Summary Card */}
          <Card className="md:col-span-4">
            <CardHeader className="pb-2">
              <CardTitle>Account Summary</CardTitle>
              <CardDescription>Account #{customerData.accountNumber} • {customerData.accountType}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
                  <p className="mt-1">{customerData.address}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Contact</h3>
                  <p className="mt-1">{customerData.contactName}</p>
                  <p className="text-sm">{customerData.contactEmail}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Next Pickup</h3>
                  <p className="mt-1">{customerData.nextPickupDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Account Balance</h3>
                  <p className={`mt-1 font-semibold ${customerData.balance > 0 ? 'text-hauler-error' : 'text-hauler-success'}`}>
                    ${customerData.balance.toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <div className="md:col-span-4">
            <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
                <TabsTrigger value="pickups">Pickup Schedule</TabsTrigger>
                <TabsTrigger value="service">Service Requests</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard">
                <DashboardView customer={customerData} />
              </TabsContent>
              
              <TabsContent value="billing">
                <BillingView invoices={invoiceData} customer={customerData} />
              </TabsContent>
              
              <TabsContent value="pickups">
                <PickupScheduleView pickups={pickupData} />
              </TabsContent>
              
              <TabsContent value="service">
                <ServiceRequestView />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Portal;
