import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import MarketCard from "@/components/MarketCard";
import { Button } from "@/components/ui/button";
import { Bitcoin, TrendingUp, TrendingDown, Star, DollarSign } from "lucide-react";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const topMarkets = [
    { pair: "BTC/USDT", price: "112,095.1", change: "+2.42%", isPositive: true },
    { pair: "ETH/USDT", price: "4,133.00", change: "+3.25%", isPositive: true },
    { pair: "ETC/USDT", price: "18.5714", change: "+2.95%", isPositive: true },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header onMenuClick={() => setIsSidebarOpen(true)} title="MoonBitWeb3" />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="pt-14 px-4 max-w-lg mx-auto">
        {/* Hero Section */}
        <div className="mt-6 mb-8">
          <div className="bg-gradient-card rounded-xl p-6 border border-border shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">
                  3.E ethereum
                </h2>
                <p className="text-muted-foreground text-sm">
                  Star Pool Sharing Plan
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Bitcoin className="h-6 w-6 text-primary" />
              </div>
            </div>
            <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
              <DollarSign className="h-4 w-4 mr-2" />
              Quick Deposit
            </Button>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Support BTC, ETH, USDT and more
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          <button className="flex flex-col items-center gap-2 p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span className="text-xs font-medium">Mining</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors">
            <Star className="h-6 w-6 text-primary" />
            <span className="text-xs font-medium">Trading</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors">
            <DollarSign className="h-6 w-6 text-primary" />
            <span className="text-xs font-medium">Bonus</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors">
            <TrendingDown className="h-6 w-6 text-primary" />
            <span className="text-xs font-medium">Support</span>
          </button>
        </div>

        {/* Rise and Fall Section */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Rise and Fall
          </h3>
          <div className="space-y-3">
            {topMarkets.map((market) => (
              <MarketCard key={market.pair} {...market} />
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Home;
