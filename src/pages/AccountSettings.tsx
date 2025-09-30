import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Copy, Shield } from "lucide-react";
import { toast } from "sonner";

const AccountSettings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header onMenuClick={() => setIsSidebarOpen(true)} title="Account Settings" />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="pt-14 px-4 max-w-lg mx-auto">
        <div className="mt-6">
          {/* Security Level */}
          <div className="bg-gradient-success/10 border border-success/30 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-success" />
              <span className="font-semibold text-success">Account Security: Excellent</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Improve more information to enhance your account security.
            </p>
          </div>

          {/* Settings List */}
          <div className="space-y-3">
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Invitation Code</div>
                  <div className="font-mono font-bold text-foreground">25OBIE0815</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy("25OBIE0815", "Invitation code")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between">
                <div className="text-sm text-foreground">Copy the invitation link</div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy("https://moonbitweb3.com/invite/25OBIE0815", "Invitation link")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Credit Score</div>
                  <div className="text-2xl font-bold text-success">100</div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Bind Phone</div>
                  <div className="font-medium text-foreground">+1 646-750-1997</div>
                </div>
                <Button variant="outline" size="sm">Change</Button>
              </div>
            </div>

            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between">
                <div className="text-sm text-foreground">Login Password</div>
                <Button variant="outline" size="sm">Modify</Button>
              </div>
            </div>

            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between">
                <div className="text-sm text-foreground">Transaction Password</div>
                <Button variant="outline" size="sm">Modify</Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default AccountSettings;
