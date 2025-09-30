import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Withdraw = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header onMenuClick={() => setIsSidebarOpen(true)} title="Withdraw" />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="pt-14 px-4 max-w-lg mx-auto">
        <div className="mt-6">
          <h2 className="text-xl font-bold text-foreground mb-2">Withdrawal Channel</h2>
          <div className="text-sm text-muted-foreground mb-4">
            Available Balance: 1,174,199.99995000 USDT
          </div>

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
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="bg-primary text-primary-foreground">ERC20</Button>
                  <Button variant="outline">TRC20</Button>
                </div>
              </div>

              {/* Withdrawal Address */}
              <div className="bg-card rounded-lg p-4 border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-2">USDT Withdrawal Address</h3>
                <Input
                  placeholder="Please enter your USDT withdrawal address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="bg-secondary"
                />
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

              {/* Verification Code */}
              <div className="bg-card rounded-lg p-4 border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-2">Verification Code</h3>
                <div className="text-xs text-muted-foreground mb-2">ahu9565@gmail.com</div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Please enter your verification code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="bg-secondary flex-1"
                  />
                  <Button variant="outline">Get Code</Button>
                </div>
              </div>

              {/* Transaction Password */}
              <div className="bg-card rounded-lg p-4 border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-2">Transaction Password</h3>
                <Input
                  type="password"
                  placeholder="Please enter your transaction password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-secondary"
                />
              </div>

              {/* Withdraw Button */}
              <Button className="w-full h-12 bg-gradient-danger hover:opacity-90 text-lg font-bold">
                Withdraw
              </Button>

              {/* Notes */}
              <div className="bg-danger/10 border border-danger/30 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-danger mb-2">Notes</h4>
                <ul className="text-xs text-muted-foreground space-y-2 leading-relaxed">
                  <li>• You can submit 3 withdrawal applications per day (minimum withdrawal 0.001 BTC, 0.01 ETH, 100 USDT)</li>
                  <li>• After submitting the withdrawal application, the funds are frozen because the withdrawal is in progress and the asset is temporarily under the custody of the system.</li>
                  <li>• The account will receive the funds within 24 hours after submitting the withdrawal application.</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="btc">
              <div className="bg-card rounded-lg p-8 border border-border text-center text-muted-foreground">
                BTC withdrawal form would appear here
              </div>
            </TabsContent>

            <TabsContent value="eth">
              <div className="bg-card rounded-lg p-8 border border-border text-center text-muted-foreground">
                ETH withdrawal form would appear here
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Withdraw;
