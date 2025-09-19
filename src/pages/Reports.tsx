import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useGetSalesReportsQuery } from '@/store/api/restaurantApi';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EyeIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';

// Mock data for sales reports
const mockReportsData = {
  totalOrders: 25100,
  customerGrowth: 22,
  totalRevenue: 2435000,
  productsSold: 25100,
  totalProfit: 2435000,
  totalClaims: 3500000,
  newCustomers: 43500,
  pieChartData: {
    totalOrder: 81,
    customerGrowth: 22,
    totalRevenue: 62,
  },
  topSalesReps: [
    {
      id: '1',
      name: 'Nicholas Patrick',
      revenue: 2540.58,
      products: 150,
      premium: 105,
      badge: 'gold' as const,
    },
    {
      id: '2',
      name: 'Cordell Edwards',
      revenue: 1567.80,
      products: 95,
      premium: 60,
      badge: 'silver' as const,
    },
    {
      id: '3',
      name: 'Derrick Spencer',
      revenue: 1640.26,
      products: 120,
      premium: 75,
      badge: 'silver' as const,
    },
    {
      id: '4',
      name: 'Larissa Burton',
      revenue: 2340.58,
      products: 120,
      premium: 99,
      badge: 'gold' as const,
    },
  ],
  claimsData: [
    { year: 2015, approved: 10, submitted: 15 },
    { year: 2016, approved: 20, submitted: 25 },
    { year: 2017, approved: 30, submitted: 35 },
    { year: 2018, approved: 35, submitted: 40 },
    { year: 2019, approved: 25, submitted: 30 },
    { year: 2020, approved: 40, submitted: 50 },
  ],
};

const getBadgeColor = (badge: string) => {
  switch (badge) {
    case 'gold':
      return 'bg-yellow-500 text-yellow-50';
    case 'silver':
      return 'bg-gray-400 text-gray-50';
    default:
      return 'bg-orange-500 text-orange-50';
  }
};

const Reports = () => {
  const data = mockReportsData;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">Sales Reports</h1>
          <p className="text-muted-foreground">Comprehensive sales analytics and insights</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
          Save Report
        </Button>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="relative w-24 h-24 mx-auto">
                  <div className="w-full h-full rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">{data.pieChartData.totalOrder}%</span>
                  </div>
                </div>
                <div>
                  <p className="font-semibold">Total Order</p>
                  <p className="text-sm text-muted-foreground">Pie Chart</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="relative w-24 h-24 mx-auto">
                  <div className="w-full h-full rounded-full bg-success/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-success">{data.pieChartData.customerGrowth}%</span>
                  </div>
                </div>
                <div>
                  <p className="font-semibold">Customer Growth</p>
                  <p className="text-sm text-muted-foreground">Chart</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="relative w-24 h-24 mx-auto">
                  <div className="w-full h-full rounded-full bg-warning/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-warning">{data.pieChartData.totalRevenue}%</span>
                  </div>
                </div>
                <div>
                  <p className="font-semibold">Total Revenue</p>
                  <p className="text-sm text-muted-foreground">Chart Order</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Top Sales Representatives */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Top Sales Representative</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.topSalesReps.map((rep, index) => (
                <div key={rep.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-white">
                        {rep.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">{rep.name}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{rep.products} Products</span>
                        <span>{rep.premium} Premium</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-bold">${rep.revenue.toFixed(2)}</p>
                    </div>
                    <Badge className={getBadgeColor(rep.badge)}>
                      +{rep.badge}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Product Sold</p>
                <p className="text-2xl font-bold">25.1k</p>
                <div className="flex items-center space-x-1">
                  <ArrowTrendingUpIcon className="h-3 w-3 text-success" />
                  <span className="text-xs font-medium text-success">+15%</span>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  View Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Profit</p>
                <p className="text-2xl font-bold">$2,435k</p>
                <div className="flex items-center space-x-1">
                  <ArrowTrendingDownIcon className="h-3 w-3 text-destructive" />
                  <span className="text-xs font-medium text-destructive">-3.5%</span>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  View Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total No. of Claim</p>
                <p className="text-2xl font-bold">3.5M</p>
                <div className="flex items-center space-x-1">
                  <ArrowTrendingUpIcon className="h-3 w-3 text-success" />
                  <span className="text-xs font-medium text-success">+15%</span>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  View More
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">New Customer</p>
                <p className="text-2xl font-bold">43.5k</p>
                <div className="flex items-center space-x-1">
                  <ArrowTrendingUpIcon className="h-3 w-3 text-success" />
                  <span className="text-xs font-medium text-success">+10%</span>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  View More
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Claims Over Years Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Claims Over the Years</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span>Approved</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-muted rounded-full"></div>
                  <span>Submitted</span>
                </div>
              </div>
              
              <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Claims Chart Visualization</p>
              </div>
              
              <div className="grid grid-cols-6 gap-4 text-center text-sm">
                {data.claimsData.map((year) => (
                  <div key={year.year} className="space-y-1">
                    <p className="font-medium">{year.year}</p>
                    <p className="text-xs text-muted-foreground">
                      A: {year.approved} | S: {year.submitted}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Reports;