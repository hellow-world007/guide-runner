import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGetOrdersQuery } from '@/store/api/restaurantApi';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

// Mock data
const mockOrders = [
  {
    id: '112329',
    date: '11/24',
    time: '12:00',
    customer: 'Marian Det',
    customerEmail: 'marian@email.com',
    customerPhone: '+1 234 567 8900',
    status: 'delivered' as const,
    total: 40.00,
    items: [
      { name: 'Strawberry Shake', price: 10, quantity: 2 },
      { name: 'Burger', price: 10, quantity: 2 },
    ],
    deliveryAddress: '778 Locust View Drive Oakland, CA',
  },
  {
    id: '113029',
    date: '11/24',
    time: '12:00',
    customer: 'Ly Det',
    customerEmail: 'ly@email.com',
    customerPhone: '+1 234 567 8901',
    status: 'delivered' as const,
    total: 40.00,
    items: [
      { name: 'Chocolate Shake', price: 12, quantity: 1 },
      { name: 'Pizza', price: 15, quantity: 2 },
    ],
    deliveryAddress: '456 Oak Street San Francisco, CA',
  },
  {
    id: '1124',
    date: '29/1/24',
    time: '',
    customer: 'Dom',
    customerEmail: 'dom@email.com',
    customerPhone: '+1 234 567 8902',
    status: 'preparing' as const,
    total: 40.00,
    items: [
      { name: 'Caesar Salad', price: 8, quantity: 1 },
      { name: 'Grilled Chicken', price: 18, quantity: 1 },
    ],
    deliveryAddress: '123 Main Street Los Angeles, CA',
  },
  {
    id: '11252',
    date: '11/24',
    time: '2:00',
    customer: 'Yumnh',
    customerEmail: 'yumnh@email.com',
    customerPhone: '+1 234 567 8903',
    status: 'out_for_delivery' as const,
    total: 40.00,
    items: [
      { name: 'Fish Tacos', price: 14, quantity: 2 },
      { name: 'Guac & Chips', price: 6, quantity: 2 },
    ],
    deliveryAddress: '789 Pine Street Seattle, WA',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered':
      return 'bg-success text-success-foreground';
    case 'out_for_delivery':
      return 'bg-primary text-primary-foreground';
    case 'preparing':
      return 'bg-warning text-warning-foreground';
    case 'cancelled':
      return 'bg-destructive text-destructive-foreground';
    default:
      return 'bg-secondary text-secondary-foreground';
  }
};

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = mockOrders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.id.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  if (selectedOrder) {
    return (
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => setSelectedOrder(null)}
            >
              ← Back Home
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Order Details</h1>
              <p className="text-muted-foreground">Order ID: {selectedOrder.id}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {selectedOrder.date}, {selectedOrder.time || 'N/A'}
                    </p>
                    <h3 className="font-semibold">{selectedOrder.customer}</h3>
                    <p className="text-sm">{selectedOrder.customerPhone}</p>
                    <p className="text-sm text-muted-foreground">{selectedOrder.customerEmail}</p>
                  </div>
                  <Badge className={getStatusColor(selectedOrder.status)}>
                    {selectedOrder.status.replace('_', ' ')}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          1pc = ${item.price}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{item.quantity} items</p>
                        <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{selectedOrder.deliveryAddress}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery Time</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Estimated Delivery</span>
                    <span className="font-medium">25 mins</span>
                  </div>
                  <div className="flex justify-between text-sm text-success">
                    <span>Order has been accepted</span>
                    <span>2 min</span>
                  </div>
                  <div className="flex justify-between text-sm text-success">
                    <span>Restaurant is preparing order</span>
                    <span>5 min</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery is on the way</span>
                    <span>10 min</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Order has been delivered</span>
                    <span>8 min</span>
                  </div>
                </div>
                
                <div className="pt-3 border-t space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${selectedOrder.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax and Fees</span>
                    <span>$5.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>$3.00</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>Total</span>
                    <span>${(selectedOrder.total + 8).toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">Order Management</h1>
          <p className="text-muted-foreground">Manage and track all orders</p>
        </div>
      </motion.div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Orders</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <FunnelIcon className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="preparing">Preparing</SelectItem>
                  <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth cursor-pointer"
                onClick={() => setSelectedOrder(order)}
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Order Id: {order.id}</span>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {order.date} {order.time}
                  </p>
                  <p className="text-sm font-medium">{order.customer}</p>
                  <p className="text-sm font-bold">Total ${order.total.toFixed(2)}</p>
                </div>
                <Button variant="outline" size="sm">Details</Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;