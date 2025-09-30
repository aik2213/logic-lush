import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, QrCode, Upload } from "lucide-react";
import { toast } from "sonner";

const Deposit = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [amount, setAmount] = useState("");

  const walletAddress = "0x49AAFf65b852098516Ff36B6980dF30E1453A3F7";

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    toast.success("Wallet address copied to clipboard");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header onMenuClick={() => setIsSidebarOpen(true)} title="Deposit" />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="pt-14 px-4 max-w-lg mx-auto">
        <div className="mt-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Deposit Channel</h2>

          <Tabs defaultValue="usdt" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-secondary">
              <TabsTrigger value="usdt">USDT</TabsTrigger>
              <TabsTrigger value="btc">BTC</TabsTrigger>
              <TabsTrigger value="eth">ETH</TabsTrigger>
            </TabsList>

            <TabsContent value="usdt" className="space-y-4 mt-4">
              {/* Network Selection */}
              <div className="bg-card rounded-lg p-4 border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-3">Select Network</h3>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="bg-primary text-primary-foreground">ERC20</Button>
                  <Button variant="outline">TRC20</Button>
                  <Button variant="outline">ARB</Button>
                </div>
              </div>

              {/* QR Code */}
              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="flex flex-col items-center">
                  <div className="w-48 h-48 bg-white rounded-lg flex items-center justify-center mb-4">
                    <QrCode className="h-32 w-32 text-gray-800" />
                  </div>
                  <p className="text-xs text-muted-foreground text-center mb-2">
                    Scan the above QR code to get the deposit address
                  </p>
                  <Button variant="outline" size="sm">
                    Save QR Code
                  </Button>
                </div>
              </div>

              {/* Wallet Address */}
              <div className="bg-card rounded-lg p-4 border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-2">USDT Wallet Address</h3>
                <div className="flex gap-2">
                  <Input
                    value={walletAddress}
                    readOnly
                    className="font-mono text-xs bg-secondary"
                  />
                  <Button variant="outline" size="icon" onClick={handleCopy}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Amount Input */}
              <div className="bg-card rounded-lg p-4 border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-2">Tether (USDT) Amount</h3>
                <Input
                  type="number"
                  placeholder="Please enter your USDT amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-secondary"
                />
              </div>

              {/* Upload Screenshot */}
              <div className="bg-card rounded-lg p-4 border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-2">Transaction Screenshot</h3>
                <Button variant="outline" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Deposit Screenshot
                </Button>
              </div>

              {/* Deposit Button */}
              <Button className="w-full h-12 bg-gradient-primary hover:opacity-90 text-lg font-bold">
                Deposit
              </Button>

              {/* Notes */}
              <div className="bg-danger/10 border border-danger/30 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-danger mb-2">Notes</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Please be sure to check the chain channel of the above address and use the corresponding chain channel, 
                  For example (ERC20-TRC20-OMNI) OMNI only supports BTC transfers, otherwise the assets will not be credited.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="btc">
              <div className="bg-card rounded-lg p-8 border border-border text-center text-muted-foreground">
                BTC deposit form would appear here
              </div>
            </TabsContent>

            <TabsContent value="eth">
              <div className="bg-card rounded-lg p-8 border border-border text-center text-muted-foreground">
                ETH deposit form would appear here
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Deposit;
