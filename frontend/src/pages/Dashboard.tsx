import MainLayout from '../components/layout/MainLayout';

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 bg-white rounded-lg border shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">Total Leads</h3>
            <p className="text-2xl font-bold mt-2">1,234</p>
            <p className="text-sm text-green-600 mt-2">+12% from last month</p>
          </div>
          
          <div className="p-6 bg-white rounded-lg border shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">Conversion Rate</h3>
            <p className="text-2xl font-bold mt-2">24.5%</p>
            <p className="text-sm text-green-600 mt-2">+2.1% from last month</p>
          </div>
          
          <div className="p-6 bg-white rounded-lg border shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">Revenue</h3>
            <p className="text-2xl font-bold mt-2">$45,678</p>
            <p className="text-sm text-green-600 mt-2">+8% from last month</p>
          </div>
          
          <div className="p-6 bg-white rounded-lg border shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">Active Deals</h3>
            <p className="text-2xl font-bold mt-2">89</p>
            <p className="text-sm text-red-600 mt-2">-3% from last month</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 