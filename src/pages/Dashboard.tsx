import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useGetDashboardStatsQuery, useGetOrdersQuery, useGetFeedbackQuery } from '@/store/api/restaurantApi';
import {
  ClipboardDocumentListIcon,
  TruckIcon,
  XCircleIcon,
  CurrencyDollarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

// Mock data for demonstration
const mockStats = {
  totalOrders: 75,
  totalDelivered: 357,
  totalCancelled: 65,
  totalRevenue: 128,
  orderGrowth: 4,
  deliveryGrowth: 4,
  cancelGrowth: 25,
  revenueGrowth: 12,
};

const mockOrders = [
  {
    id: '112329',
    date: '11/24',
    time: '12:00',
    customer: 'Marian Det',
    status: 'delivered' as const,
    total: 40.00,
  },
  {
    id: '113029',
    date: '11/24',
    time: '12:00',
    customer: 'Ly Det',
    status: 'delivered' as const,
    total: 40.00,
  },
  {
    id: '1124',
    date: '29/1/24',
    time: '',
    customer: 'Dom',
    status: 'in_progress' as const,
    total: 40.00,
  },
  {
    id: '11252',
    date: '11/24',
    time: '2:00',
    customer: 'Yumnh',
    status: 'in_progress' as const,
    total: 40.00,
  },
];

const mockFeedback = [
  {
    id: '1',
    customerName: 'Jons Sena',
    rating: 4.5,
    comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    createdAt: '2 days ago',
  },
  {
    id: '2',
    customerName: 'Sofia',
    rating: 4.0,
    comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    createdAt: '2 days ago',
  },
  {
    id: '3',
    customerName: 'Anandreansyah',
    rating: 4.5,
    comment: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    createdAt: '2 days ago',
  },
];

const Dashboard = () => {
  // In real app, these would fetch from API
  const { data: stats = mockStats } = useGetDashboardStatsQuery();
  
  const statCards = [
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      growth: stats.orderGrowth,
      icon: ClipboardDocumentListIcon,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    },
    {
      title: 'Total Delivered',
      value: stats.totalDelivered,
      growth: stats.deliveryGrowth,
      icon: TruckIcon,
      color: 'text-success',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
    },
    {
      title: 'Total Canceled',
      value: stats.totalCancelled,
      growth: stats.cancelGrowth,
      icon: XCircleIcon,
      color: 'text-destructive',
      bgColor: 'bg-red-50 dark:bg-red-950/20',
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue}`,
      growth: stats.revenueGrowth,
      icon: CurrencyDollarIcon,
      color: 'text-primary',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Hi, Samantha. Welcome back to Sedap Admin!</p>
        </div>
        
        <div className="flex items-center space-x-2 bg-card rounded-lg p-2">
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">17 April 2020 - 21 May 2020</span>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          const isNegative = stat.growth < 0;
          
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <div className="flex items-center space-x-1">
                        {isNegative ? (
                          <ArrowDownIcon className="h-3 w-3 text-destructive" />
                        ) : (
                          <ArrowUpIcon className="h-3 w-3 text-success" />
                        )}
                        <span className={`text-xs font-medium ${isNegative ? 'text-destructive' : 'text-success'}`}>
                          {Math.abs(stat.growth)}% (30 days)
                        </span>
                      </div>
                    </div>
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Button variant="outline" size="sm">Filter Order</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Order Id: {order.id}</span>
                        <Badge 
                          variant={order.status === 'delivered' ? 'default' : 'secondary'}
                          className={order.status === 'delivered' ? 'bg-success text-success-foreground' : ''}
                        >
                          {order.status === 'delivered' ? 'delivered' : 'In progress'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {order.date} {order.time}
                      </p>
                      <p className="text-sm font-medium">{order.customer}</p>
                      <p className="text-sm font-bold">Total ${order.total.toFixed(2)}</p>
                    </div>
                    <Button variant="outline" size="sm">Details</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Customer Reviews */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Customer Review</CardTitle>
              <p className="text-sm text-muted-foreground">Eum fuga consequuntur utadsin et.</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockFeedback.map((feedback) => (
                  <div key={feedback.id} className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">
                          {feedback.customerName.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">{feedback.customerName}</h4>
                          <div className="flex items-center space-x-1">
                            <span className="text-xs text-primary">★</span>
                            <span className="text-xs font-medium">{feedback.rating}</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">{feedback.createdAt}</p>
                        <p className="text-sm">{feedback.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;