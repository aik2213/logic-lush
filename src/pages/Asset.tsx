import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, ArrowUpCircle, ArrowDownCircle, ArrowLeftRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Asset = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const currencies = [
    { symbol: "BTC", available: "0.00000000", frozen: "0.0000", total: "0.0000" },
    { symbol: "ETH", available: "0.00000000", frozen: "0.0000", total: "0.0000" },
    { symbol: "USDT", available: "1,174,199.99995000", frozen: "1,411,900.0000", total: "1,174,410.7010" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header onMenuClick={() => setIsSidebarOpen(true)} title="Asset" />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="pt-14 px-4 max-w-lg mx-auto">
        {/* Total Asset */}
        <div className="mt-6 mb-6">
          <div className="bg-gradient-card rounded-xl p-6 border border-border shadow-card">
            <div className="text-sm text-muted-foreground mb-2">Total Asset [USD]</div>
            <div className="text-4xl font-bold text-foreground mb-1">1,350,692.33</div>
            <div className="text-xs text-muted-foreground">UID: 614285</div>
          </div>
        </div>

        {/* Account Tabs */}
        <Tabs defaultValue="currency" className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-3 bg-secondary">
            <TabsTrigger value="currency">Currency</TabsTrigger>
            <TabsTrigger value="option">Option</TabsTrigger>
            <TabsTrigger value="profits">Profits</TabsTrigger>
          </TabsList>

          <TabsContent value="currency" className="space-y-4 mt-4">
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="text-sm text-muted-foreground mb-2">
                Asset Valuation [USD]
              </div>
              <div className="text-2xl font-bold text-foreground mb-4">
                1,174,410.70
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <Button
                  variant="outline"
                  className="flex flex-col gap-1 h-auto py-3"
                  onClick={() => navigate("/deposit")}
                >
                  <ArrowDownCircle className="h-5 w-5 text-success" />
                  <span className="text-xs">Deposit</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col gap-1 h-auto py-3"
                  onClick={() => navigate("/withdraw")}
                >
                  <ArrowUpCircle className="h-5 w-5 text-danger" />
                  <span className="text-xs">Withdraw</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col gap-1 h-auto py-3"
                >
                  <ArrowLeftRight className="h-5 w-5 text-primary" />
                  <span className="text-xs">Transfer</span>
                </Button>
              </div>

              {/* Currency List */}
              <div className="space-y-3">
                {currencies.map((currency) => (
                  <div
                    key={currency.symbol}
                    className="bg-secondary rounded-lg p-4 border border-border"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-primary" />
                        <span className="font-bold text-foreground">{currency.symbol}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <div className="text-muted-foreground mb-1">Available</div>
                        <div className="font-mono font-medium text-foreground">
                          {currency.available}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground mb-1">Frozen</div>
                        <div className="font-mono font-medium text-foreground">
                          {currency.frozen}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground mb-1">Total ($)</div>
                        <div className="font-mono font-medium text-foreground">
                          {currency.total}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="option" className="space-y-4 mt-4">
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="text-sm text-muted-foreground mb-2">
                Asset Valuation [USD]
              </div>
              <div className="text-2xl font-bold text-foreground mb-4">
                223,440.42
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <Button
                  variant="outline"
                  className="flex flex-col gap-1 h-auto py-3"
                  onClick={() => navigate("/deposit")}
                >
                  <ArrowDownCircle className="h-5 w-5 text-success" />
                  <span className="text-xs">Deposit</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col gap-1 h-auto py-3"
                  onClick={() => navigate("/withdraw")}
                >
                  <ArrowUpCircle className="h-5 w-5 text-danger" />
                  <span className="text-xs">Withdraw</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col gap-1 h-auto py-3"
                >
                  <ArrowLeftRight className="h-5 w-5 text-primary" />
                  <span className="text-xs">Transfer</span>
                </Button>
              </div>

              <div className="bg-secondary rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <span className="font-bold text-foreground">USDT</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <div className="text-muted-foreground mb-1">Available</div>
                    <div className="font-mono font-medium text-foreground">
                      223,250.00000000
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Frozen</div>
                    <div className="font-mono font-medium text-foreground">
                      0.0000
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Total ($)</div>
                    <div className="font-mono font-medium text-foreground">
                      223,440.42
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profits" className="space-y-4 mt-4">
            <div className="bg-card rounded-lg p-4 border border-border text-center">
              <div className="text-sm text-muted-foreground mb-2">Total Profits</div>
              <div className="text-2xl font-bold text-success mb-4">
                +160,077.31
              </div>
              <div className="text-xs text-muted-foreground">
                Mining profits and trading gains
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />
    </div>
  );
};

export default Asset;
