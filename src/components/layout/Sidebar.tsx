import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  CubeIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  UsersIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Order Management', href: '/orders', icon: ClipboardDocumentListIcon },
  { name: 'Inventory Management', href: '/inventory', icon: CubeIcon },
  { name: 'Sales Reports', href: '/reports', icon: ChartBarIcon },
  { name: 'Customer Feedback', href: '/feedback', icon: ChatBubbleLeftRightIcon },
  { name: 'Customer Details', href: '/customers', icon: UsersIcon },
];

export const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const sidebarVariants = {
    expanded: { width: '280px' },
    collapsed: { width: '80px' },
  };

  const contentVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -20 },
  };

  return (
    <motion.aside
      variants={sidebarVariants}
      animate={isCollapsed ? 'collapsed' : 'expanded'}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-full bg-gradient-sidebar border-r border-sidebar-border shadow-sidebar z-40"
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  variants={contentVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  transition={{ duration: 0.2 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <span className="text-lg font-bold text-white">R</span>
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-sidebar-foreground">Romdol</h1>
                    <p className="text-xs text-sidebar-foreground/60">Admin Dashboard</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="text-sidebar-foreground hover:bg-sidebar-accent"
            >
              {isCollapsed ? (
                <Bars3Icon className="h-5 w-5" />
              ) : (
                <XMarkIcon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={`
                  flex items-center space-x-3 px-3 py-3 rounded-xl transition-smooth
                  ${isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-primary'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }
                `}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <AnimatePresence mode="wait">
                  {!isCollapsed && (
                    <motion.span
                      variants={contentVariants}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      transition={{ duration: 0.2 }}
                      className="font-medium truncate"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </NavLink>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-sidebar-border">
          <AnimatePresence mode="wait">
            {!isCollapsed && user && (
              <motion.div
                variants={contentVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                transition={{ duration: 0.2 }}
                className="mb-4"
              >
                <div className="flex items-center space-x-3 p-3 bg-sidebar-accent rounded-xl">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-sidebar-accent-foreground truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-sidebar-accent-foreground/60 capitalize">
                      {user.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <Button
            variant="ghost"
            onClick={logout}
            className={`
              w-full text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
              ${isCollapsed ? 'px-3' : 'justify-start'}
            `}
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5 flex-shrink-0" />
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.span
                  variants={contentVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  transition={{ duration: 0.2 }}
                  className="ml-3"
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </div>
    </motion.aside>
  );
};