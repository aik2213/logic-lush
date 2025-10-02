import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import { TrendingUp, TrendingDown, Loader2 } from "lucide-react";
import { cryptoService } from "@/services/cryptoService";

const Market = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data: cryptocurrencies, isLoading } = useQuery({
    queryKey: ['cryptocurrencies'],
    queryFn: cryptoService.getCryptocurrencies,
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header onMenuClick={() => setIsSidebarOpen(true)} title="Market" />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="pt-14 px-4 max-w-lg mx-auto">
        <div className="mt-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-3 gap-4 px-4 py-3 bg-secondary border-b border-border">
                <div className="text-sm font-semibold text-muted-foreground">Pair</div>
                <div className="text-sm font-semibold text-muted-foreground text-right">Latest Price</div>
                <div className="text-sm font-semibold text-muted-foreground text-right">24H Change</div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-border">
                {cryptocurrencies && cryptocurrencies.length > 0 ? (
                  cryptocurrencies.map((crypto) => {
                    const isPositive = crypto.price_change >= 0;
                    return (
                      <div
                        key={crypto.id}
                        className="grid grid-cols-3 gap-4 px-4 py-4 hover:bg-secondary/50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${isPositive ? "bg-success" : "bg-danger"}`} />
                          <span className="font-semibold text-foreground">
                            {crypto.title}/{crypto.currency_type?.toUpperCase() || 'USDT'}
                          </span>
                        </div>
                        <div className="text-right font-mono font-medium text-foreground">
                          {crypto.current_price.toLocaleString()}
                        </div>
                        <div className={`text-right font-medium flex items-center justify-end gap-1 ${
                          isPositive ? "text-success" : "text-danger"
                        }`}>
                          {isPositive ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          {isPositive ? '+' : ''}{crypto.price_change}%
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    No cryptocurrencies available
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Market;
