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
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  company: string;
  leadSource: string;
  interestArea: string;
  preferredContactMethod: string;
  location: string;
  wellnessGoals: string;
  leadStatus: 'New' | 'Contacted' | 'Qualified' | 'Not Interested' | 'Converted';
  nextFollowUp: string;
  notes: string;
  dateCaptured: string;
  assignedSalesRep: string;
  servicePackageDiscussed: string;
  budgetRange: string;
  leadScore: number;
  value: number;
}

interface LeadCardProps {
  lead: Lead;
}

export const LeadCard = ({ lead }: LeadCardProps) => {
  const getStatusColor = (status: Lead['leadStatus']) => {
    switch (status) {
      case 'New':
        return 'bg-blue-500 text-white';
      case 'Contacted':
        return 'bg-yellow-500 text-white';
      case 'Qualified':
        return 'bg-green-500 text-white';
      case 'Not Interested':
        return 'bg-red-500 text-white';
      case 'Converted':
        return 'bg-purple-500 text-white';
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
            <h3 className="font-semibold text-lg">{lead.firstName} {lead.lastName}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <Building2 className="w-4 h-4" />
              {lead.company || 'Individual'}
            </div>
            {lead.interestArea && (
              <div className="text-xs text-primary font-medium mt-1">
                {lead.interestArea}
              </div>
            )}
          </div>
          <Badge className={getStatusColor(lead.leadStatus)}>
            {lead.leadStatus}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span className="truncate">{lead.email}</span>
          </div>
          
          {lead.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="truncate">{lead.phone}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="w-4 h-4 text-success" />
            <span className="font-medium">${lead.value.toLocaleString()}</span>
            {lead.budgetRange && (
              <span className="text-xs text-muted-foreground">({lead.budgetRange})</span>
            )}
          </div>

          {lead.wellnessGoals && (
            <div className="text-xs text-muted-foreground bg-secondary/50 rounded px-2 py-1">
              Goals: {lead.wellnessGoals}
            </div>
          )}
        </div>

        <div className="bg-muted/30 rounded-lg p-3 space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            Added: {new Date(lead.dateCaptured).toLocaleDateString()}
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
          
          {lead.assignedSalesRep && (
            <div className="text-xs text-muted-foreground">
              Assigned: {lead.assignedSalesRep}
            </div>
          )}
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

        <div className="flex justify-between items-center text-xs">
          <span className="text-muted-foreground bg-secondary/50 rounded px-2 py-1">
            Source: {lead.leadSource}
          </span>
          {lead.leadScore > 0 && (
            <span className="font-medium text-primary">
              Score: {lead.leadScore}/10
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};