import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Transfer = () => {
  const navigate = useNavigate();
  const [fromAccount, setFromAccount] = useState("currency");
  const [toAccount, setToAccount] = useState("");
  const [currency, setCurrency] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle transfer logic here
    console.log({ fromAccount, toAccount, currency, amount });
  };

  const setMaxAmount = () => {
    // Set maximum available amount
    setAmount("1174199.99995000");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-card border-b border-border flex items-center justify-between px-4 z-50">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-semibold">Transfer</h1>
        <button
          onClick={() => {/* Navigate to history */}}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          History
        </button>
      </header>

      {/* Main Content */}
      <main className="pt-20 px-4 max-w-lg mx-auto pb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* From Account */}
          <div className="space-y-2">
            <Label htmlFor="from" className="text-sm text-muted-foreground">
              From
            </Label>
            <Select value={fromAccount} onValueChange={setFromAccount}>
              <SelectTrigger id="from" className="w-full bg-secondary border-border">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="currency">Currency</SelectItem>
                <SelectItem value="option">Option</SelectItem>
                <SelectItem value="profits">Profits</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* To Account */}
          <div className="space-y-2">
            <Label htmlFor="to" className="text-sm text-muted-foreground">
              To
            </Label>
            <Select value={toAccount} onValueChange={setToAccount}>
              <SelectTrigger id="to" className="w-full bg-secondary border-border">
                <SelectValue placeholder="Please choose to transfer into account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="currency">Currency</SelectItem>
                <SelectItem value="option">Option</SelectItem>
                <SelectItem value="profits">Profits</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Currency */}
          <div className="space-y-2">
            <Label htmlFor="currency" className="text-sm text-muted-foreground">
              Currency
            </Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger id="currency" className="w-full bg-secondary border-border">
                <SelectValue placeholder="Please select the currency to be transferred" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USDT">USDT</SelectItem>
                <SelectItem value="BTC">BTC</SelectItem>
                <SelectItem value="ETH">ETH</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Transfer Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm text-muted-foreground">
              Transfer Amount
            </Label>
            <div className="relative">
              <Input
                id="amount"
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Please enter the transfer amount"
                className="bg-secondary border-border pr-16"
              />
              <Button
                type="button"
                onClick={setMaxAmount}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-7 px-3 text-xs bg-transparent hover:bg-transparent text-primary border-0"
              >
                All
              </Button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-semibold mt-8"
          >
            Submit
          </Button>
        </form>
      </main>
    </div>
  );
};

export default Transfer;
