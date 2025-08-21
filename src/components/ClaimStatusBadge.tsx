import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Clock, DollarSign } from "lucide-react";

interface ClaimStatusBadgeProps {
  status: 'Pending' | 'Verified' | 'Exception' | 'Settled';
  size?: 'sm' | 'default' | 'lg';
}

const statusConfig = {
  Pending: {
    variant: 'outline' as const,
    icon: Clock,
    className: 'border-status-pending text-status-pending bg-status-pending/5'
  },
  Verified: {
    variant: 'outline' as const,
    icon: CheckCircle,
    className: 'border-status-verified text-status-verified bg-status-verified/5'
  },
  Exception: {
    variant: 'outline' as const,
    icon: AlertTriangle,
    className: 'border-status-exception text-status-exception bg-status-exception/5'
  },
  Settled: {
    variant: 'outline' as const,
    icon: DollarSign,
    className: 'border-status-settled text-status-settled bg-status-settled/5'
  }
};

export const ClaimStatusBadge = ({ status, size = 'default' }: ClaimStatusBadgeProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;
  
  return (
    <Badge 
      variant={config.variant} 
      className={`${config.className} ${size === 'sm' ? 'text-xs px-2 py-1' : size === 'lg' ? 'text-sm px-3 py-2' : ''} font-medium`}
    >
      <Icon className={`${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} mr-1`} />
      {status}
    </Badge>
  );
};