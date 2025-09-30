import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Trade = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [buyAmount, setBuyAmount] = useState("");
  const [sellAmount, setSellAmount] = useState("");

  const orderBook = {
    bids: [
      { price: "112,211.40", amount: "0.319980" },
      { price: "112,210.90", amount: "0.534103" },
      { price: "112,209.90", amount: "0.480755" },
      { price: "112,209.30", amount: "0.629401" },
      { price: "112,208.80", amount: "0.516670" },
    ],
    asks: [
      { price: "112,211.50", amount: "0.000100" },
      { price: "112,212.00", amount: "0.000600" },
      { price: "112,212.50", amount: "0.000600" },
      { price: "112,213.00", amount: "0.000600" },
      { price: "112,213.50", amount: "0.000600" },
    ],
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header onMenuClick={() => setIsSidebarOpen(true)} title="Trade" />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="pt-14 px-4 max-w-lg mx-auto">
        {/* Pair Info */}
        <div className="mt-6 mb-4 bg-card rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground">BTC/USDT</h2>
              <p className="text-sm text-muted-foreground">Available: 1,174,199.99995000 USDT</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-success">+2.53%</div>
              <div className="text-sm text-muted-foreground">112,212.94</div>
            </div>
          </div>
        </div>

        {/* Order Book */}
        <div className="mb-4 bg-card rounded-lg p-4 border border-border">
          <h3 className="text-sm font-semibold text-foreground mb-3">Order Book</h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Asks (Sell Orders) */}
            <div>
              <div className="text-xs text-danger font-medium mb-2">Asks</div>
              <div className="space-y-1">
                {orderBook.asks.map((order, i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="text-danger font-mono">{order.price}</span>
                    <span className="text-muted-foreground">{order.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bids (Buy Orders) */}
            <div>
              <div className="text-xs text-success font-medium mb-2">Bids</div>
              <div className="space-y-1">
                {orderBook.bids.map((order, i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="text-success font-mono">{order.price}</span>
                    <span className="text-muted-foreground">{order.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trading Form */}
        <Tabs defaultValue="market" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-secondary">
            <TabsTrigger value="market">Market</TabsTrigger>
            <TabsTrigger value="limit">Limit</TabsTrigger>
          </TabsList>

          <TabsContent value="market" className="space-y-4">
            {/* Buy Form */}
            <div className="bg-card rounded-lg p-4 border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-3">Buy BTC</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Buy Amount</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={buyAmount}
                    onChange={(e) => setBuyAmount(e.target.value)}
                    className="bg-secondary border-border"
                  />
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" className="flex-1 text-xs">25%</Button>
                    <Button variant="outline" size="sm" className="flex-1 text-xs">50%</Button>
                    <Button variant="outline" size="sm" className="flex-1 text-xs">75%</Button>
                    <Button variant="outline" size="sm" className="flex-1 text-xs">100%</Button>
                  </div>
                </div>
                <Button className="w-full bg-gradient-success hover:opacity-90">
                  Buy BTC
                </Button>
              </div>
            </div>

            {/* Sell Form */}
            <div className="bg-card rounded-lg p-4 border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-3">Sell BTC</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Sell Amount</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={sellAmount}
                    onChange={(e) => setSellAmount(e.target.value)}
                    className="bg-secondary border-border"
                  />
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" className="flex-1 text-xs">25%</Button>
                    <Button variant="outline" size="sm" className="flex-1 text-xs">50%</Button>
                    <Button variant="outline" size="sm" className="flex-1 text-xs">75%</Button>
                    <Button variant="outline" size="sm" className="flex-1 text-xs">100%</Button>
                  </div>
                </div>
                <Button className="w-full bg-gradient-danger hover:opacity-90">
                  Sell BTC
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="limit">
            <div className="bg-card rounded-lg p-4 border border-border text-center text-muted-foreground">
              Limit order form would go here
            </div>
          </TabsContent>
        </Tabs>

        {/* Order History */}
        <div className="mt-4 mb-6 bg-card rounded-lg p-4 border border-border">
          <h3 className="text-sm font-semibold text-foreground mb-3">Current Orders</h3>
          <div className="text-center text-muted-foreground text-sm py-4">
            No open orders
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Trade;
