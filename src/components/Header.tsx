import { Menu, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
}

const Header = ({ onMenuClick, title }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-card/80 backdrop-blur-lg border-b border-border z-40">
      <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="hover:bg-secondary"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <h1 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
          {title}
        </h1>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-secondary">
              <Globe className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-popover">
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>Español</DropdownMenuItem>
            <DropdownMenuItem>Italiano</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
