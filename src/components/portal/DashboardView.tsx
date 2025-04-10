
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface CustomerData {
  name: string;
  accountNumber: string;
  accountType: string;
  address: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  serviceLevel: string;
  nextPickupDate: string;
  lastPaymentDate: string;
  balance: number;
  stats: {
    wasteCollected: number;
    recyclingRate: number;
    carbonOffset: number;
  };
}

interface DashboardViewProps {
  customer: CustomerData;
}

const DashboardView: React.FC<DashboardViewProps> = ({ customer }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Waste Collected</CardTitle>
            <CardDescription>Year to date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-hauler-primary">
              {customer.stats.wasteCollected.toLocaleString()} lbs
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recycling Rate</CardTitle>
            <CardDescription>Current performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-hauler-primary mb-2">
              {customer.stats.recyclingRate}%
            </div>
            <Progress value={customer.stats.recyclingRate} className="h-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Carbon Offset</CardTitle>
            <CardDescription>Equivalent</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-hauler-primary">
              {customer.stats.carbonOffset} kg
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Account Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Account events and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-medium">Service Performed</h3>
                <p className="text-sm text-muted-foreground">Regular waste collection completed</p>
              </div>
              <div className="text-sm text-muted-foreground">Today</div>
            </div>
            
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-medium">Payment Received</h3>
                <p className="text-sm text-muted-foreground">${customer.balance > 0 ? '0.00' : '125.50'}</p>
              </div>
              <div className="text-sm text-muted-foreground">{customer.lastPaymentDate}</div>
            </div>
            
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="font-medium">Invoice Generated</h3>
                <p className="text-sm text-muted-foreground">Monthly service charge</p>
              </div>
              <div className="text-sm text-muted-foreground">2025-04-01</div>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Account Created</h3>
                <p className="text-sm text-muted-foreground">Welcome to Hauler Hero!</p>
              </div>
              <div className="text-sm text-muted-foreground">2025-01-15</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Waste Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Waste Insights</CardTitle>
          <CardDescription>Breakdown of your waste collection</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">General Waste</span>
                <span className="text-sm text-muted-foreground">32%</span>
              </div>
              <Progress value={32} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Recycling</span>
                <span className="text-sm text-muted-foreground">48%</span>
              </div>
              <Progress value={48} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Compost</span>
                <span className="text-sm text-muted-foreground">20%</span>
              </div>
              <Progress value={20} className="h-2" />
            </div>
          </div>
          
          <div className="mt-6 text-sm text-muted-foreground">
            <p>Your recycling rate is {customer.stats.recyclingRate}%, which is 
              {customer.stats.recyclingRate > 60 ? ' above' : ' below'} the community average of 60%.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardView;
