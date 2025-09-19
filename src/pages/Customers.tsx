import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Mock customer data
const mockCustomers = [
  { id: '1', name: 'Jane Cooper', phone: '(225) 555-0118', email: 'jane@microsoft.com', country: 'United States', status: 'active' as const },
  { id: '2', name: 'Floyd Miles', phone: '(205) 555-0100', email: 'floyd@yahoo.com', country: 'Kiribati', status: 'inactive' as const },
  { id: '3', name: 'Ronald Richards', phone: '(302) 555-0107', email: 'ronald@adobe.com', country: 'Israel', status: 'inactive' as const },
  { id: '4', name: 'Marvin McKinney', phone: '(252) 555-0126', email: 'marvin@tesla.com', country: 'Iran', status: 'active' as const },
];

const Customers = () => {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">Customer Details</h1>
        <p className="text-muted-foreground">Manage customer information</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold">5,423</h3>
            <p className="text-muted-foreground">Total Customers</p>
            <p className="text-sm text-success">↑16% this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold">1,893</h3>
            <p className="text-muted-foreground">Members</p>
            <p className="text-sm text-success">↑1% this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold">189</h3>
            <p className="text-muted-foreground">Active Now</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Customers</CardTitle>
            <Button className="bg-gradient-primary hover:opacity-90">Add new User</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockCustomers.map((customer, index) => (
              <motion.div
                key={customer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">
                      {customer.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{customer.name}</h4>
                    <p className="text-sm text-muted-foreground">{customer.phone}</p>
                    <p className="text-sm text-muted-foreground">{customer.email}</p>
                    <p className="text-sm text-muted-foreground">{customer.country}</p>
                  </div>
                </div>
                <Badge variant={customer.status === 'active' ? 'default' : 'secondary'}>
                  {customer.status}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Customers;