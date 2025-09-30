import { NavLink } from "react-router-dom";
import { Home, TrendingUp, ArrowLeftRight, TrendingDown, Wallet } from "lucide-react";

const BottomNav = () => {
  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/market", icon: TrendingUp, label: "Market" },
    { to: "/trade", icon: ArrowLeftRight, label: "Trade" },
    { to: "/option", icon: TrendingDown, label: "Option" },
    { to: "/asset", icon: Wallet, label: "Asset" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
