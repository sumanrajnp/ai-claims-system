import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard, 
  FileText,
  Building2
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
      isActive: location.pathname === "/dashboard"
    },
    {
      title: "Claims",
      icon: FileText,
      path: "/",
      isActive: location.pathname === "/" || location.pathname.startsWith("/claim/")
    }
  ];

  return (
    <div className={cn(
      "flex flex-col h-screen bg-card border-r transition-all duration-300 ease-in-out",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-lg font-bold text-foreground">Claim Inspector</h1>
              <p className="text-xs text-muted-foreground">AI-Powered</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="h-8 w-8 p-0"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation Menu */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.path}
                variant={item.isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isCollapsed ? "px-2" : "px-3",
                  item.isActive && "bg-secondary text-secondary-foreground"
                )}
                onClick={() => navigate(item.path)}
              >
                <Icon className={cn(
                  "h-4 w-4",
                  isCollapsed ? "mx-auto" : "mr-2"
                )} />
                {!isCollapsed && (
                  <span className="truncate">{item.title}</span>
                )}
              </Button>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
}; 