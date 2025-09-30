import { TrendingUp, TrendingDown } from "lucide-react";

interface MarketCardProps {
  pair: string;
  price: string;
  change: string;
  isPositive: boolean;
}

const MarketCard = ({ pair, price, change, isPositive }: MarketCardProps) => {
  return (
    <div className="bg-card rounded-lg p-4 border border-border hover:border-primary/50 transition-all hover:shadow-glow cursor-pointer">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-foreground">{pair}</span>
        <div className={`flex items-center gap-1 ${isPositive ? "text-success" : "text-danger"}`}>
          {isPositive ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          <span className="text-sm font-medium">{change}</span>
        </div>
      </div>
      <div className="text-2xl font-bold text-foreground">{price}</div>
      <div className="text-xs text-muted-foreground mt-1">24H Change</div>
    </div>
  );
};

export default MarketCard;
