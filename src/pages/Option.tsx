import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, Loader2 } from "lucide-react";
import { cryptoService } from "@/services/cryptoService";
import { optionService } from "@/services/optionService";
import { memberService } from "@/services/memberService";
import { useToast } from "@/hooks/use-toast";

const Option = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [amount, setAmount] = useState("50");
  const [selectedTime, setSelectedTime] = useState("30");
  const [selectedCryptoId, setSelectedCryptoId] = useState<number | null>(null);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [tradeType, setTradeType] = useState<"rise" | "fall">("rise");
  const [currentOrderId, setCurrentOrderId] = useState<number | null>(null);
  const { toast } = useToast();

  const { data: cryptocurrencies, isLoading: loadingCrypto } = useQuery({
    queryKey: ['cryptocurrencies'],
    queryFn: cryptoService.getTradableCryptocurrencies,
  });

  const { data: member } = useQuery({
    queryKey: ['currentMember'],
    queryFn: memberService.getCurrentMember,
  });

  const { data: pendingOrders } = useQuery({
    queryKey: ['pendingOrders', member?.id],
    queryFn: () => member?.id ? optionService.getPendingOrders(member.id) : Promise.resolve([]),
    enabled: !!member?.id,
  });

  const selectedCrypto = cryptocurrencies?.find(c => c.id === selectedCryptoId);

  useEffect(() => {
    if (cryptocurrencies && cryptocurrencies.length > 0 && !selectedCryptoId) {
      setSelectedCryptoId(cryptocurrencies[0].id);
    }
  }, [cryptocurrencies, selectedCryptoId]);

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

  const handleBuy = async (type: "rise" | "fall") => {
    if (!member) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to place orders",
        variant: "destructive",
      });
      return;
    }

    if (!selectedCrypto) {
      toast({
        title: "No Cryptocurrency Selected",
        description: "Please select a cryptocurrency to trade",
        variant: "destructive",
      });
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    try {
      const duration = parseInt(selectedTime);
      const profitRate = timeOptions.find(t => t.time === selectedTime)?.rate || "40%";
      const rate = parseFloat(profitRate.replace('%', ''));

      const order = await optionService.createOrder({
        member_id: member.id,
        cryptocurrency_id: selectedCrypto.id,
        order_type: type,
        amount: amountNum,
        duration: duration,
        profit_rate: rate,
        start_price: selectedCrypto.current_price,
      });

      setCurrentOrderId(order.id);
      setTradeType(type);
      setCountdown(duration);
      setShowCountdown(true);

      toast({
        title: "Order Placed",
        description: `${type === 'rise' ? 'Buy Rise' : 'Buy Fall'} order placed successfully`,
      });
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: "Order Failed",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header onMenuClick={() => setIsSidebarOpen(true)} title="Contract Option" />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="pt-14 px-4 max-w-lg mx-auto">
        {/* Cryptocurrency Selector */}
        <div className="mt-6 mb-4">
          <label className="text-sm font-semibold text-foreground mb-2 block">
            Select Cryptocurrency
          </label>
          <Select
            value={selectedCryptoId?.toString()}
            onValueChange={(value) => setSelectedCryptoId(parseInt(value))}
          >
            <SelectTrigger className="bg-card border-border">
              <SelectValue placeholder="Select a cryptocurrency" />
            </SelectTrigger>
            <SelectContent>
              {cryptocurrencies?.map((crypto) => (
                <SelectItem key={crypto.id} value={crypto.id.toString()}>
                  {crypto.title} - {crypto.name.toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Info */}
        {selectedCrypto && (
          <div className="mb-4 bg-card rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-foreground">
                {selectedCrypto.title}/{selectedCrypto.currency_type?.toUpperCase() || 'USDT'}
              </h2>
              <div className={`font-medium ${selectedCrypto.price_change >= 0 ? 'text-success' : 'text-destructive'}`}>
                {selectedCrypto.price_change >= 0 ? '+' : ''}{selectedCrypto.price_change}%
              </div>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">
              {selectedCrypto.current_price.toLocaleString()}
            </div>
            {member && (
              <div className="text-sm text-muted-foreground">
                Available Balance: {member.score.toLocaleString()} USDT
              </div>
            )}
          </div>
        )}

        {loadingCrypto && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

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
          {pendingOrders && pendingOrders.length > 0 ? (
            <div className="space-y-3">
              {pendingOrders.map((order: any) => (
                <div key={order.id} className="bg-secondary/30 rounded-lg p-3 border border-border">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-foreground">
                        {order.cryptocurrency?.title || 'Unknown'}
                      </div>
                      <div className={`text-sm ${order.order_type === 'rise' ? 'text-success' : 'text-destructive'}`}>
                        {order.order_type === 'rise' ? 'Buy Rise' : 'Buy Fall'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-foreground">{order.amount} USDT</div>
                      <div className="text-sm text-muted-foreground">{order.duration}s</div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Start: {order.start_price} | Rate: {order.profit_rate}%
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground text-sm py-4">
              No open positions
            </div>
          )}
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
