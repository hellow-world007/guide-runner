import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  sidebarCollapsed: boolean;
}

export const Header = ({ sidebarCollapsed }: HeaderProps) => {
  const { user } = useAuth();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`
        fixed top-0 right-0 z-30 bg-card/95 backdrop-blur-sm border-b border-border
        transition-all duration-300 ease-in-out
        ${sidebarCollapsed ? 'left-20' : 'left-70'}
      `}
      style={{ left: sidebarCollapsed ? '80px' : '280px' }}
    >
      <div className="flex items-center justify-between h-16 px-6">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-muted/50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-smooth"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="relative">
            <BellIcon className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full flex items-center justify-center">
              <span className="text-xs text-primary-foreground font-bold">3</span>
            </span>
          </Button>

          {user && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium">Hi, {user.name.split(' ')[0]}</p>
                <p className="text-xs text-muted-foreground">Welcome back!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
};