import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TrendingUp, TrendingDown } from "lucide-react";

const Option = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [amount, setAmount] = useState("50");
  const [selectedTime, setSelectedTime] = useState("30");
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [tradeType, setTradeType] = useState<"rise" | "fall">("rise");

  const timeOptions = [
    { time: "30", rate: "40%" },
    { time: "60", rate: "50%" },
    { time: "90", rate: "60%" },
    { time: "120", rate: "70%" },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showCountdown && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0 && showCountdown) {
      setShowCountdown(false);
    }
    return () => clearInterval(interval);
  }, [showCountdown, countdown]);

  const handleBuy = (type: "rise" | "fall") => {
    setTradeType(type);
    setCountdown(parseInt(selectedTime));
    setShowCountdown(true);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header onMenuClick={() => setIsSidebarOpen(true)} title="Contract Option" />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="pt-14 px-4 max-w-lg mx-auto">
        {/* Price Info */}
        <div className="mt-6 mb-4 bg-card rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-foreground">BTC/USDT</h2>
            <div className="text-success font-medium">+2.48%</div>
          </div>
          <div className="text-3xl font-bold text-foreground mb-1">112,164.04</div>
          <div className="text-sm text-muted-foreground">
            Available Balance: 176,250.00000000 USDT
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="mb-4 bg-card rounded-lg p-6 border border-border">
          <div className="h-48 flex items-center justify-center bg-secondary/30 rounded">
            <div className="text-center text-muted-foreground">
              <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Price Chart</p>
            </div>
          </div>
          
          {/* Time Intervals */}
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {["1m", "5m", "15m", "30m", "1h", "4h", "1d"].map((interval) => (
              <Button
                key={interval}
                variant="outline"
                size="sm"
                className="min-w-[60px]"
              >
                {interval}
              </Button>
            ))}
          </div>
        </div>

        {/* Option Time / Profit Rate */}
        <div className="mb-4 bg-card rounded-lg p-4 border border-border">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Option Time / Profit Rate
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {timeOptions.map((option) => (
              <button
                key={option.time}
                onClick={() => setSelectedTime(option.time)}
                className={`p-3 rounded-lg border transition-all ${
                  selectedTime === option.time
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-secondary border-border text-foreground hover:border-primary/50"
                }`}
              >
                <div className="text-sm font-semibold">{option.time}s</div>
                <div className="text-xs mt-1">{option.rate}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Amount Input */}
        <div className="mb-4 bg-card rounded-lg p-4 border border-border">
          <label className="text-sm font-semibold text-foreground mb-2 block">
            Amount
          </label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-secondary border-border text-lg"
            placeholder="Enter amount"
          />
        </div>

        {/* Buy Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button
            onClick={() => handleBuy("rise")}
            className="h-16 bg-gradient-success hover:opacity-90 text-lg font-bold"
          >
            <TrendingUp className="h-6 w-6 mr-2" />
            Buy Rise
          </Button>
          <Button
            onClick={() => handleBuy("fall")}
            className="h-16 bg-gradient-danger hover:opacity-90 text-lg font-bold"
          >
            <TrendingDown className="h-6 w-6 mr-2" />
            Buy Fall
          </Button>
        </div>

        {/* Open Positions */}
        <div className="bg-card rounded-lg p-4 border border-border">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Open Positions
          </h3>
          <div className="text-center text-muted-foreground text-sm py-4">
            No open positions
          </div>
        </div>
      </main>

      <Dialog open={showCountdown} onOpenChange={setShowCountdown}>
        <DialogContent className="max-w-sm p-0 overflow-hidden border-2">
          <div className="p-8 text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
              tradeType === "rise" ? "bg-success/20" : "bg-destructive/20"
            }`}>
              {tradeType === "rise" ? (
                <TrendingUp className={`h-8 w-8 text-success`} />
              ) : (
                <TrendingDown className={`h-8 w-8 text-destructive`} />
              )}
            </div>

            <h3 className="text-lg font-semibold mb-2">
              {tradeType === "rise" ? "Buy Rise" : "Buy Fall"}
            </h3>

            <div className="mb-4 text-sm text-muted-foreground">
              <div>Amount: {amount} USDT</div>
              <div>Duration: {selectedTime}s</div>
            </div>

            <div className="relative w-48 h-48 mx-auto mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl font-bold text-foreground">
                  {countdown}
                </div>
              </div>
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-secondary"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className={tradeType === "rise" ? "text-success" : "text-destructive"}
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * (1 - countdown / parseInt(selectedTime))}`}
                  style={{ transition: "stroke-dashoffset 1s linear" }}
                />
              </svg>
            </div>

            <p className="text-sm text-muted-foreground">
              Contract in progress...
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default Option;
