import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';

// Base URL for API - to be configured later
const API_BASE_URL = 'http://localhost:5000/api';

// Types for API responses
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
  avatar?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  message: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  status: 'pending' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  total: number;
  subtotal: number;
  tax: number;
  fees: number;
  createdAt: string;
  deliveryAddress?: string;
  estimatedDelivery?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'snack' | 'meal' | 'vegan' | 'dessert' | 'drink';
  image?: string;
  isPopular: boolean;
  isAvailable: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  language: string;
  country: string;
  status: 'active' | 'inactive';
  joinedAt: string;
  totalOrders: number;
}

export interface CustomerFeedback {
  id: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
  orderId?: string;
}

export interface DashboardStats {
  totalOrders: number;
  totalDelivered: number;
  totalCancelled: number;
  totalRevenue: number;
  orderGrowth: number;
  deliveryGrowth: number;
  cancelGrowth: number;
  revenueGrowth: number;
}

export interface SalesReport {
  totalOrders: number;
  customerGrowth: number;
  totalRevenue: number;
  productsSold: number;
  totalProfit: number;
  totalClaims: number;
  newCustomers: number;
  topSalesReps: SalesRep[];
  claimsData: ClaimData[];
}

export interface SalesRep {
  id: string;
  name: string;
  revenue: number;
  products: number;
  premium: number;
  badge: 'gold' | 'silver' | 'bronze';
}

export interface ClaimData {
  year: number;
  approved: number;
  submitted: number;
}

// API slice
export const restaurantApi = createApi({
  reducerPath: 'restaurantApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Order', 'MenuItem', 'Customer', 'Feedback', 'Stats', 'Reports'],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    // Dashboard endpoints
    getDashboardStats: builder.query<DashboardStats, void>({
      query: () => '/dashboard/stats',
      providesTags: ['Stats'],
    }),

    // Order endpoints
    getOrders: builder.query<Order[], { status?: string; limit?: number }>({
      query: ({ status, limit }) => ({
        url: '/orders',
        params: { status, limit },
      }),
      providesTags: ['Order'],
    }),

    getOrderById: builder.query<Order, string>({
      query: (id) => `/orders/${id}`,
      providesTags: ['Order'],
    }),

    updateOrderStatus: builder.mutation<Order, { id: string; status: Order['status'] }>({
      query: ({ id, status }) => ({
        url: `/orders/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Order', 'Stats'],
    }),

    // Menu item endpoints
    getMenuItems: builder.query<MenuItem[], { category?: string }>({
      query: ({ category }) => ({
        url: '/menu',
        params: { category },
      }),
      providesTags: ['MenuItem'],
    }),

    addMenuItem: builder.mutation<MenuItem, Partial<MenuItem>>({
      query: (item) => ({
        url: '/menu',
        method: 'POST',
        body: item,
      }),
      invalidatesTags: ['MenuItem'],
    }),

    updateMenuItem: builder.mutation<MenuItem, { id: string; data: Partial<MenuItem> }>({
      query: ({ id, data }) => ({
        url: `/menu/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['MenuItem'],
    }),

    deleteMenuItem: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/menu/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MenuItem'],
    }),

    // Customer endpoints
    getCustomers: builder.query<{ customers: Customer[]; total: number }, { page?: number; limit?: number; status?: string }>({
      query: ({ page = 1, limit = 10, status }) => ({
        url: '/customers',
        params: { page, limit, status },
      }),
      providesTags: ['Customer'],
    }),

    getCustomerById: builder.query<Customer, string>({
      query: (id) => `/customers/${id}`,
      providesTags: ['Customer'],
    }),

    updateCustomerStatus: builder.mutation<Customer, { id: string; status: 'active' | 'inactive' }>({
      query: ({ id, status }) => ({
        url: `/customers/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Customer'],
    }),

    // Feedback endpoints
    getFeedback: builder.query<CustomerFeedback[], void>({
      query: () => '/feedback',
      providesTags: ['Feedback'],
    }),

    // Reports endpoints
    getSalesReports: builder.query<SalesReport, { startDate?: string; endDate?: string }>({
      query: ({ startDate, endDate }) => ({
        url: '/reports/sales',
        params: { startDate, endDate },
      }),
      providesTags: ['Reports'],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useLoginMutation,
  useLogoutMutation,
  useGetDashboardStatsQuery,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
  useGetMenuItemsQuery,
  useAddMenuItemMutation,
  useUpdateMenuItemMutation,
  useDeleteMenuItemMutation,
  useGetCustomersQuery,
  useGetCustomerByIdQuery,
  useUpdateCustomerStatusMutation,
  useGetFeedbackQuery,
  useGetSalesReportsQuery,
} = restaurantApi;