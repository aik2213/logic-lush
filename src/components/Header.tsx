import { useState } from "react";
import { Menu, Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
}

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "it", name: "Italiano" },
];

const Header = ({ onMenuClick, title }: HeaderProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleLanguageChange = (code: string, name: string) => {
    setSelectedLanguage(code);
    toast.success(`Language changed to ${name}`);
  };

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
          <DropdownMenuContent align="end" className="bg-popover z-50">
            {languages.map((lang) => (
              <DropdownMenuItem 
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code, lang.name)}
                className="cursor-pointer"
              >
                <div className="flex items-center justify-between w-full">
                  <span>{lang.name}</span>
                  {selectedLanguage === lang.code && (
                    <Check className="h-4 w-4 ml-2 text-primary" />
                  )}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
