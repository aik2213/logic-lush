import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import { TrendingUp, TrendingDown } from "lucide-react";

const Market = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const markets = [
    { pair: "BTC/USDT", price: "112,163.93", change: "+2.49%", isPositive: true },
    { pair: "ETH/USDT", price: "4,125.85", change: "+3.07%", isPositive: true },
    { pair: "ETC/USDT", price: "18.5372", change: "+2.77%", isPositive: true },
    { pair: "XRP/USDT", price: "2.86248", change: "+2.84%", isPositive: true },
    { pair: "XAUT/USDT", price: "3,769.14", change: "+0.15%", isPositive: true },
    { pair: "TRUMP/USDT", price: "7.6555", change: "+2.10%", isPositive: true },
    { pair: "DOT/USDT", price: "3.9914", change: "+4.04%", isPositive: true },
    { pair: "LTC/USDT", price: "106.90", change: "+2.87%", isPositive: true },
    { pair: "SHIB/USDT", price: "0.00001201", change: "+2.56%", isPositive: true },
    { pair: "FIL/USDT", price: "2.2103", change: "+1.85%", isPositive: true },
    { pair: "DOGE/USDT", price: "0.236558", change: "+3.43%", isPositive: true },
    { pair: "LINK/USDT", price: "22.4437", change: "-4.56%", isPositive: false },
    { pair: "BCH/USDT", price: "557.32", change: "+3.94%", isPositive: true },
    { pair: "BSV/USDT", price: "23.7076", change: "+3.10%", isPositive: true },
    { pair: "ADA/USDT", price: "0.808888", change: "+4.35%", isPositive: true },
    { pair: "EOS/USDT", price: "0.7213", change: "0%", isPositive: false },
    { pair: "TRX/USDT", price: "0.335593", change: "-0.28%", isPositive: false },
    { pair: "IOTA/USDT", price: "0.167", change: "+2.14%", isPositive: true },
    { pair: "XLM/USDT", price: "0.368467", change: "+2.91%", isPositive: true },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header onMenuClick={() => setIsSidebarOpen(true)} title="Market" />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="pt-14 px-4 max-w-lg mx-auto">
        <div className="mt-6">
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-4 px-4 py-3 bg-secondary border-b border-border">
              <div className="text-sm font-semibold text-muted-foreground">Pair</div>
              <div className="text-sm font-semibold text-muted-foreground text-right">Latest Price</div>
              <div className="text-sm font-semibold text-muted-foreground text-right">24H Change</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-border">
              {markets.map((market) => (
                <div
                  key={market.pair}
                  className="grid grid-cols-3 gap-4 px-4 py-4 hover:bg-secondary/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${market.isPositive ? "bg-success" : "bg-danger"}`} />
                    <span className="font-semibold text-foreground">{market.pair}</span>
                  </div>
                  <div className="text-right font-mono font-medium text-foreground">
                    {market.price}
                  </div>
                  <div className={`text-right font-medium flex items-center justify-end gap-1 ${
                    market.isPositive ? "text-success" : "text-danger"
                  }`}>
                    {market.isPositive ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    {market.change}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Market;
