import { motion } from 'framer-motion';
import { BarChart3, Users, Settings, Bell, Search, Menu } from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { theme, motionVariants } from '../../lib/theme';
import { cn } from '../../lib/theme';

export default function AdminDashboard() {
  return (
    <PageLayout title="Admin Dashboard" showBackground={false}>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <motion.aside
          {...motionVariants.slideDown}
          className="w-64 bg-white/5 backdrop-blur-lg border-r border-white/10 p-6"
        >
          <div className="flex items-center space-x-2 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <h2 className={cn(theme.typography.h3, "text-lg")}>Blackstone Board</h2>
          </div>

          <nav className="space-y-2">
            <a
              href="#"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 text-white"
            >
              <BarChart3 className="h-5 w-5" />
              <span>Dashboard</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white/70 hover:bg-white/5 hover:text-white"
            >
              <Users className="h-5 w-5" />
              <span>Users</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white/70 hover:bg-white/5 hover:text-white"
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </a>
          </nav>
        </motion.aside>

        {/* Main content */}
        <div className="flex-1">
          {/* Header */}
          <motion.header
            {...motionVariants.slideDown}
            className="border-b border-white/10 bg-white/5 backdrop-blur-lg p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-lg hover:bg-white/5">
                  <Menu className="h-5 w-5 text-white" />
                </button>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-lg hover:bg-white/5 relative">
                  <Bell className="h-5 w-5 text-white" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
                </button>
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-white/10" />
                  <span className="text-white">Admin</span>
                </div>
              </div>
            </div>
          </motion.header>

          {/* Dashboard content */}
          <main className="p-6">
            <div className={theme.spacing.section}>
              {/* Stats grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={cn(theme.typography.small, "text-white/70")}>Total Users</p>
                        <h3 className={cn(theme.typography.h3, "mt-1")}>1,234</h3>
                        <p className={cn(theme.typography.small, "text-emerald-400 mt-1")}>+12% from last month</p>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <Users className="h-6 w-6 text-emerald-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={cn(theme.typography.small, "text-white/70")}>Active Sessions</p>
                        <h3 className={cn(theme.typography.h3, "mt-1")}>89</h3>
                        <p className={cn(theme.typography.small, "text-blue-400 mt-1")}>+5% from last hour</p>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <BarChart3 className="h-6 w-6 text-blue-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={cn(theme.typography.small, "text-white/70")}>System Load</p>
                        <h3 className={cn(theme.typography.h3, "mt-1")}>45%</h3>
                        <p className={cn(theme.typography.small, "text-yellow-400 mt-1")}>+2% from last hour</p>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                        <Settings className="h-6 w-6 text-yellow-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={cn(theme.typography.small, "text-white/70")}>Notifications</p>
                        <h3 className={cn(theme.typography.h3, "mt-1")}>12</h3>
                        <p className={cn(theme.typography.small, "text-purple-400 mt-1")}>+3 new today</p>
                      </div>
                      <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                        <Bell className="h-6 w-6 text-purple-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-full bg-white/10" />
                        <div className="flex-1">
                          <p className="text-white">User action {item}</p>
                          <p className={theme.typography.small}>2 hours ago</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </PageLayout>
  );
} 