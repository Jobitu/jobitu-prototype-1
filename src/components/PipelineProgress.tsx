import React from "react";
import { ApplicationStage } from "../types/pipeline";
import { Badge } from "./ui/badge";
import { 
  FileText, 
  CheckCircle, 
  Calendar, 
  Eye, 
  Trophy,
  Clock,
  XCircle
} from "lucide-react";

interface PipelineProgressProps {
  currentStage: ApplicationStage;
  completedStages?: ApplicationStage[];
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
  orientation?: 'horizontal' | 'vertical';
}

const stageConfig = {
  applied: {
    label: 'Applied',
    description: 'Application submitted, tests assigned',
    icon: FileText,
    color: 'bg-blue-500',
    lightColor: 'bg-blue-100',
    textColor: 'text-blue-700'
  },
  qualified: {
    label: 'Qualified',
    description: 'Assessments completed successfully',
    icon: CheckCircle,
    color: 'bg-green-500',
    lightColor: 'bg-green-100',
    textColor: 'text-green-700'
  },
  interview: {
    label: 'Interview',
    description: 'Interview scheduled/completed',
    icon: Calendar,
    color: 'bg-purple-500',
    lightColor: 'bg-purple-100',
    textColor: 'text-purple-700'
  },
  final_review: {
    label: 'Final Review',
    description: 'Comprehensive evaluation in progress',
    icon: Eye,
    color: 'bg-orange-500',
    lightColor: 'bg-orange-100',
    textColor: 'text-orange-700'
  },
  passed: {
    label: 'Passed',
    description: 'Ready for company handover',
    icon: Trophy,
    color: 'bg-yellow-500',
    lightColor: 'bg-yellow-100',
    textColor: 'text-yellow-700'
  },
  rejected: {
    label: 'Rejected',
    description: 'Application not successful',
    icon: XCircle,
    color: 'bg-red-500',
    lightColor: 'bg-red-100',
    textColor: 'text-red-700'
  }
};

const stageOrder: ApplicationStage[] = ['applied', 'qualified', 'interview', 'final_review', 'passed'];

export function PipelineProgress({ 
  currentStage, 
  completedStages = [], 
  showLabels = true, 
  size = 'md',
  orientation = 'horizontal' 
}: PipelineProgressProps) {
  
  const getStageStatus = (stage: ApplicationStage) => {
    if (currentStage === 'rejected') {
      return stage === 'rejected' ? 'current' : 'inactive';
    }
    
    if (completedStages.includes(stage)) return 'completed';
    if (stage === currentStage) return 'current';
    
    const currentIndex = stageOrder.indexOf(currentStage);
    const stageIndex = stageOrder.indexOf(stage);
    
    return stageIndex < currentIndex ? 'completed' : 'inactive';
  };

  const sizeClasses = {
    sm: { icon: 'h-4 w-4', circle: 'w-8 h-8', text: 'text-xs' },
    md: { icon: 'h-5 w-5', circle: 'w-10 h-10', text: 'text-sm' },
    lg: { icon: 'h-6 w-6', circle: 'w-12 h-12', text: 'text-base' }
  };

  const renderStage = (stage: ApplicationStage, index: number) => {
    const config = stageConfig[stage];
    const status = getStageStatus(stage);
    const Icon = config.icon;
    const isLast = index === stageOrder.length - 1;

    const getCircleClasses = () => {
      const base = `${sizeClasses[size].circle} rounded-full flex items-center justify-center transition-all duration-300`;
      
      switch (status) {
        case 'completed':
          return `${base} ${config.color} text-white shadow-md`;
        case 'current':
          return `${base} ${config.color} text-white shadow-lg ring-4 ring-opacity-30 ${config.color.replace('bg-', 'ring-')}`;
        default:
          return `${base} bg-gray-200 text-gray-400`;
      }
    };

    const getConnectorClasses = () => {
      const base = orientation === 'horizontal' ? 'h-0.5 flex-1' : 'w-0.5 h-8';
      return status === 'completed' ? `${base} ${config.color}` : `${base} bg-gray-200`;
    };

    return (
      <div key={stage} className={`flex items-center ${orientation === 'vertical' ? 'flex-col' : ''}`}>
        <div className={`flex items-center ${orientation === 'vertical' ? 'flex-col text-center' : ''}`}>
          <div className={getCircleClasses()}>
            <Icon className={sizeClasses[size].icon} />
          </div>
          
          {showLabels && (
            <div className={`${orientation === 'vertical' ? 'mt-2' : 'ml-3'}`}>
              <div className={`font-medium ${sizeClasses[size].text} ${
                status === 'current' ? config.textColor : 
                status === 'completed' ? config.textColor : 'text-gray-500'
              }`}>
                {config.label}
              </div>
              {size === 'lg' && (
                <div className={`text-xs text-gray-500 mt-1 ${orientation === 'vertical' ? 'text-center' : ''}`}>
                  {config.description}
                </div>
              )}
            </div>
          )}
        </div>
        
        {!isLast && orientation === 'horizontal' && (
          <div className={`mx-4 ${getConnectorClasses()}`} />
        )}
        
        {!isLast && orientation === 'vertical' && (
          <div className={`my-4 ${getConnectorClasses()}`} />
        )}
      </div>
    );
  };

  // Handle rejected state
  if (currentStage === 'rejected') {
    return (
      <div className={`flex items-center ${orientation === 'vertical' ? 'flex-col' : ''}`}>
        {renderStage('rejected', 0)}
      </div>
    );
  }

  return (
    <div className={`flex ${orientation === 'vertical' ? 'flex-col' : 'items-center'}`}>
      {stageOrder.map((stage, index) => renderStage(stage, index))}
    </div>
  );
}

// Compact version for cards
export function PipelineProgressCompact({ currentStage, completedStages = [] }: { 
  currentStage: ApplicationStage; 
  completedStages?: ApplicationStage[] 
}) {
  const config = stageConfig[currentStage];
  const Icon = config.icon;
  
  if (currentStage === 'rejected') {
    return (
      <Badge variant="destructive" className="flex items-center gap-1">
        <XCircle className="h-3 w-3" />
        Rejected
      </Badge>
    );
  }

  const currentIndex = stageOrder.indexOf(currentStage);
  const progress = ((currentIndex + 1) / stageOrder.length) * 100;

  return (
    <div className="flex items-center gap-2">
      <Badge className={`${config.lightColor} ${config.textColor} border-0 flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
      <div className="flex-1 bg-gray-200 rounded-full h-1.5 min-w-[60px]">
        <div 
          className={`h-1.5 rounded-full transition-all duration-300 ${config.color}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-xs text-gray-500 font-medium">
        {currentIndex + 1}/5
      </span>
    </div>
  );
}
