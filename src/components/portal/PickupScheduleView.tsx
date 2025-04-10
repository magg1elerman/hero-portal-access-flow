
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Pickup {
  date: string;
  type: string;
  status: string;
  time: string;
}

interface PickupScheduleViewProps {
  pickups: Pickup[];
}

const PickupScheduleView: React.FC<PickupScheduleViewProps> = ({ pickups }) => {
  const upcomingPickups = pickups.filter(p => p.status === 'Scheduled');
  const pastPickups = pickups.filter(p => p.status === 'Completed');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Pickup Schedule</h2>
      
      <Tabs defaultValue="upcoming">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming Pickups</TabsTrigger>
          <TabsTrigger value="past">Past Pickups</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Pickups</CardTitle>
              <CardDescription>Your scheduled waste collection services</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingPickups.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  No upcoming pickups scheduled
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Time Window</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingPickups.map((pickup, index) => (
                      <TableRow key={`${pickup.date}-${pickup.type}-${index}`}>
                        <TableCell>{pickup.date}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            pickup.type === 'Waste' 
                              ? 'bg-gray-100 text-gray-800' 
                              : pickup.type === 'Recycling'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-green-100 text-green-800'
                          }`}>
                            {pickup.type}
                          </span>
                        </TableCell>
                        <TableCell>{pickup.time}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
                            {pickup.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="past">
          <Card>
            <CardHeader>
              <CardTitle>Past Pickups</CardTitle>
              <CardDescription>Your completed waste collection services</CardDescription>
            </CardHeader>
            <CardContent>
              {pastPickups.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  No past pickups found
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pastPickups.map((pickup, index) => (
                      <TableRow key={`${pickup.date}-${pickup.type}-${index}`}>
                        <TableCell>{pickup.date}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            pickup.type === 'Waste' 
                              ? 'bg-gray-100 text-gray-800' 
                              : pickup.type === 'Recycling'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-green-100 text-green-800'
                          }`}>
                            {pickup.type}
                          </span>
                        </TableCell>
                        <TableCell>{pickup.time}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                            {pickup.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Service Calendar</CardTitle>
          <CardDescription>
            Your regular collection schedule
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center p-3 border rounded-md">
              <div className="w-2 h-10 bg-gray-500 rounded-full mr-4"></div>
              <div>
                <h3 className="font-medium">General Waste</h3>
                <p className="text-sm text-muted-foreground">Every Tuesday, morning (6am-12pm)</p>
              </div>
            </div>
            
            <div className="flex items-center p-3 border rounded-md">
              <div className="w-2 h-10 bg-blue-500 rounded-full mr-4"></div>
              <div>
                <h3 className="font-medium">Recycling</h3>
                <p className="text-sm text-muted-foreground">Every Tuesday, morning (6am-12pm)</p>
              </div>
            </div>
            
            <div className="flex items-center p-3 border rounded-md">
              <div className="w-2 h-10 bg-green-500 rounded-full mr-4"></div>
              <div>
                <h3 className="font-medium">Compost/Organic</h3>
                <p className="text-sm text-muted-foreground">Every Thursday, afternoon (12pm-5pm)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PickupScheduleView;
