import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface ConfidenceIndicatorProps {
  confidence: number;
  showIcon?: boolean;
  size?: 'sm' | 'default';
}

export const ConfidenceIndicator = ({ 
  confidence, 
  showIcon = true, 
  size = 'default' 
}: ConfidenceIndicatorProps) => {
  const getConfidenceConfig = (conf: number) => {
    if (conf >= 90) {
      return {
        color: 'confidence-high',
        icon: TrendingUp,
        label: 'High',
        className: 'text-confidence-high border-confidence-high bg-confidence-high/5'
      };
    } else if (conf >= 80) {
      return {
        color: 'confidence-medium',
        icon: Minus,
        label: 'Medium',
        className: 'text-confidence-medium border-confidence-medium bg-confidence-medium/5'
      };
    } else {
      return {
        color: 'confidence-low',
        icon: TrendingDown,
        label: 'Low',
        className: 'text-confidence-low border-confidence-low bg-confidence-low/5'
      };
    }
  };

  const config = getConfidenceConfig(confidence);
  const Icon = config.icon;
  
  return (
    <Badge 
      variant="outline" 
      className={`${config.className} ${size === 'sm' ? 'text-xs px-2 py-1' : ''} font-medium`}
    >
      {showIcon && <Icon className={`${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} mr-1`} />}
      {confidence}%
    </Badge>
  );
};