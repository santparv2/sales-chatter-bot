import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Mail, 
  Phone, 
  Calendar, 
  DollarSign,
  Clock,
  MessageCircle,
  Instagram,
  Facebook
} from "lucide-react";

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  weight: string;
  gender: 'Male' | 'Female';
  phone: string;
  email: string;
  preferredContactMethod: string;
  location: string;
  primaryGoals: string;
  challengesPainPoints: string;
  currentRoutineLifestyle: string;
  leadSource: string;
  dateCaptured: string;
  firstContactMadeBy: string;
  methodOfContact: string;
  nextFollowUp: string;
  preferredFollowUpTime: string;
  notesFromLastConversation: string;
  leadStatus: 'New' | 'Contacted' | 'Interested' | 'Not Interested' | 'Booked Consultation' | 'Enrolled';
  assignedSalesRep: string;
  servicePackageDiscussed: string;
  budgetRange: string;
  leadScore: number;
  value: number;
  whatsappNumber?: string;
  facebookHandle?: string;
  instagramHandle?: string;
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
      case 'Interested':
        return 'bg-green-500 text-white';
      case 'Booked Consultation':
        return 'bg-purple-500 text-white';
      case 'Enrolled':
        return 'bg-emerald-500 text-white';
      case 'Not Interested':
        return 'bg-red-500 text-white';
      default:
        return 'bg-muted';
    }
  };

  const handleWhatsApp = () => {
    const number = lead.whatsappNumber || lead.phone;
    if (number) {
      const cleanNumber = number.replace(/\D/g, '');
      const message = `Hi ${lead.firstName}, I'm reaching out regarding your wellness goals. How are you doing?`;
      window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  const handleFacebook = () => {
    if (lead.facebookHandle) {
      window.open(`https://facebook.com/${lead.facebookHandle}`, '_blank');
    }
  };

  const handleInstagram = () => {
    if (lead.instagramHandle) {
      window.open(`https://instagram.com/${lead.instagramHandle}`, '_blank');
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
              <span>{lead.age} years old, {lead.gender}</span>
            </div>
            {lead.primaryGoals && (
              <div className="text-xs text-primary font-medium mt-1">
                Primary Goals: {lead.primaryGoals}
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

          {lead.challengesPainPoints && (
            <div className="text-xs text-muted-foreground bg-secondary/50 rounded px-2 py-1">
              Challenges: {lead.challengesPainPoints}
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
          <Button variant="outline" size="sm" className="flex-1" onClick={() => window.open(`tel:${lead.phone}`)}>
            <Phone className="w-4 h-4 mr-1" />
            Call
          </Button>
          <Button variant="outline" size="sm" className="flex-1" onClick={() => window.open(`mailto:${lead.email}`)}>
            <Mail className="w-4 h-4 mr-1" />
            Email
          </Button>
        </div>

        {/* Social Media Contact Buttons */}
        <div className="flex gap-2">
          {(lead.whatsappNumber || lead.phone) && (
            <Button variant="outline" size="sm" className="flex-1 bg-green-50 hover:bg-green-100 border-green-200" onClick={handleWhatsApp}>
              <MessageCircle className="w-4 h-4 mr-1 text-green-600" />
              WhatsApp
            </Button>
          )}
          {lead.facebookHandle && (
            <Button variant="outline" size="sm" className="flex-1 bg-blue-50 hover:bg-blue-100 border-blue-200" onClick={handleFacebook}>
              <Facebook className="w-4 h-4 mr-1 text-blue-600" />
              Facebook
            </Button>
          )}
          {lead.instagramHandle && (
            <Button variant="outline" size="sm" className="flex-1 bg-pink-50 hover:bg-pink-100 border-pink-200" onClick={handleInstagram}>
              <Instagram className="w-4 h-4 mr-1 text-pink-600" />
              Instagram
            </Button>
          )}
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