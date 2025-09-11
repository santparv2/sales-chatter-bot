import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Mail, 
  Phone, 
  Calendar, 
  DollarSign,
  Clock
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  stage: 'hot' | 'warm' | 'cold';
  lastContact: string;
  nextFollowUp: string;
  value: number;
  source: string;
}

interface LeadCardProps {
  lead: Lead;
}

export const LeadCard = ({ lead }: LeadCardProps) => {
  const getStageColor = (stage: Lead['stage']) => {
    switch (stage) {
      case 'hot':
        return 'bg-hot-lead text-white';
      case 'warm':
        return 'bg-warm-lead text-white';
      case 'cold':
        return 'bg-cold-lead text-white';
      default:
        return 'bg-muted';
    }
  };

  const getDaysUntilFollowUp = () => {
    const today = new Date();
    const followUpDate = new Date(lead.nextFollowUp);
    const diffTime = followUpDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilFollowUp = getDaysUntilFollowUp();
  const isOverdue = daysUntilFollowUp < 0;
  const isDueToday = daysUntilFollowUp === 0;

  return (
    <Card className="bg-gradient-to-br from-card to-secondary/20 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all duration-300 border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{lead.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <Building2 className="w-4 h-4" />
              {lead.company}
            </div>
          </div>
          <Badge className={getStageColor(lead.stage)}>
            {lead.stage.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span className="truncate">{lead.email}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="w-4 h-4 text-success" />
            <span className="font-medium">${lead.value.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-3 space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            Last contact: {new Date(lead.lastContact).toLocaleDateString()}
          </div>
          
          <div className={`flex items-center gap-2 text-xs font-medium ${
            isOverdue 
              ? 'text-destructive' 
              : isDueToday 
                ? 'text-warning' 
                : 'text-success'
          }`}>
            <Calendar className="w-3 h-3" />
            Next follow-up: {new Date(lead.nextFollowUp).toLocaleDateString()}
            {isOverdue && ' (Overdue)'}
            {isDueToday && ' (Today)'}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Phone className="w-4 h-4 mr-1" />
            Call
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Mail className="w-4 h-4 mr-1" />
            Email
          </Button>
        </div>

        <div className="text-xs text-muted-foreground bg-secondary/50 rounded px-2 py-1">
          Source: {lead.source}
        </div>
      </CardContent>
    </Card>
  );
};