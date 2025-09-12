import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Calendar, 
  Mail, 
  TrendingUp, 
  Plus,
  Phone,
  Clock,
  Target,
  CheckCircle
} from "lucide-react";
import { LeadCard } from "./LeadCard";
import { AddLeadDialog } from "./AddLeadDialog";
import { EmailTemplates } from "./EmailTemplates";

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
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddLead, setShowAddLead] = useState(false);
  
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 'LEAD-1705123456789',
      firstName: 'Sarah',
      lastName: 'Johnson',
      age: 32,
      weight: '65kg',
      gender: 'Female',
      phone: '+1 (555) 123-4567',
      email: 'sarah@wellness.com',
      preferredContactMethod: 'WhatsApp',
      location: 'Los Angeles, CA, PST',
      primaryGoals: 'Stress relief and flexibility improvement',
      challengesPainPoints: 'Lower back pain, high stress from work',
      currentRoutineLifestyle: 'Sedentary office job, occasional yoga',
      leadSource: 'Instagram',
      dateCaptured: '2024-01-15',
      firstContactMadeBy: 'Lisa Chen',
      methodOfContact: 'DM',
      nextFollowUp: '2024-01-18',
      preferredFollowUpTime: 'Morning 9-11 AM',
      notesFromLastConversation: 'Prefers morning sessions, has lower back issues, very motivated',
      leadStatus: 'Interested',
      assignedSalesRep: 'Lisa Chen',
      servicePackageDiscussed: 'Premium Yoga Package',
      budgetRange: '$1000-$2000',
      leadScore: 8,
      value: 1800
    },
    {
      id: 'LEAD-1705123456790',
      firstName: 'Mike',
      lastName: 'Chen',
      age: 29,
      weight: '78kg',
      gender: 'Male',
      phone: '+1 (555) 987-6543',
      email: 'mike@health.io',
      preferredContactMethod: 'Email',
      location: 'San Francisco, CA, PST',
      primaryGoals: 'Weight loss and muscle gain',
      challengesPainPoints: 'Busy schedule, poor eating habits',
      currentRoutineLifestyle: 'Corporate executive, travels frequently',
      leadSource: 'Website',
      dateCaptured: '2024-01-10',
      firstContactMadeBy: 'John Smith',
      methodOfContact: 'Form Submission',
      nextFollowUp: '2024-01-20',
      preferredFollowUpTime: 'Evening 6-8 PM',
      notesFromLastConversation: 'Interested in corporate wellness program for his team',
      leadStatus: 'Contacted',
      assignedSalesRep: 'John Smith',
      servicePackageDiscussed: 'Corporate Nutrition Plan',
      budgetRange: '$2000+',
      leadScore: 7,
      value: 3500
    },
    {
      id: 'LEAD-1705123456791',
      firstName: 'Emma',
      lastName: 'Davis',
      age: 45,
      weight: '70kg',
      gender: 'Female',
      phone: '+1 (555) 456-7890',
      email: 'emma@spa.biz',
      preferredContactMethod: 'Phone',
      location: 'Miami, FL, EST',
      primaryGoals: 'Skin care and relaxation, stress management',
      challengesPainPoints: 'High stress, aging concerns, lack of self-care time',
      currentRoutineLifestyle: 'Business owner, high-stress lifestyle',
      leadSource: 'Referral',
      dateCaptured: '2024-01-05',
      firstContactMadeBy: 'Maria Rodriguez',
      methodOfContact: 'Phone',
      nextFollowUp: '2024-01-25',
      preferredFollowUpTime: 'Afternoon 2-4 PM',
      notesFromLastConversation: 'VIP client referral, high value potential, wants luxury experience',
      leadStatus: 'New',
      assignedSalesRep: 'Maria Rodriguez',
      servicePackageDiscussed: 'Ultimate Spa Experience',
      budgetRange: '$2000+',
      leadScore: 9,
      value: 5000
    }
  ]);

  const stats = {
    totalLeads: leads.length,
    qualifiedLeads: leads.filter(l => l.leadStatus === 'Interested' || l.leadStatus === 'Booked Consultation').length,
    totalValue: leads.reduce((sum, lead) => sum + lead.value, 0),
    conversionRate: leads.length > 0 ? Math.round((leads.filter(l => l.leadStatus === 'Enrolled').length / leads.length) * 100) : 0
  };

  const handleAddLead = (newLead: Omit<Lead, 'id'>) => {
    const lead: Lead = {
      ...newLead,
      id: (leads.length + 1).toString()
    };
    setLeads([...leads, lead]);
    setShowAddLead(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-primary">CRM Dashboard</h1>
              <div className="hidden md:flex space-x-6">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'dashboard' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'leads' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Leads
                </button>
                <button
                  onClick={() => setActiveTab('templates')}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'templates' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Email Templates
                </button>
              </div>
            </div>
            <Button onClick={() => setShowAddLead(true)} className="bg-gradient-to-r from-primary to-primary-glow">
              <Plus className="w-4 h-4 mr-2" />
              Add Lead
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-card to-secondary/20 shadow-[var(--shadow-card)]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalLeads}</div>
                  <p className="text-xs text-muted-foreground">Active prospects</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-card to-success-light shadow-[var(--shadow-card)]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Qualified Leads</CardTitle>
                  <Target className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">{stats.qualifiedLeads}</div>
                  <p className="text-xs text-muted-foreground">Ready to close</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-card to-primary/10 shadow-[var(--shadow-card)]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
                  <TrendingUp className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats.totalValue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Total potential revenue</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-card to-warning-light shadow-[var(--shadow-card)]">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  <CheckCircle className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.conversionRate}%</div>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Leads */}
            <Card className="shadow-[var(--shadow-elevated)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Recent Leads & Follow-ups
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {leads.slice(0, 3).map((lead) => (
                  <LeadCard key={lead.id} lead={lead} />
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">All Leads</h2>
              <div className="flex gap-2">
                <Badge variant="secondary">Total: {leads.length}</Badge>
                <Badge className="bg-success text-white">Qualified: {stats.qualifiedLeads}</Badge>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {leads.map((lead) => (
                <LeadCard key={lead.id} lead={lead} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'templates' && <EmailTemplates />}
      </div>

      <AddLeadDialog 
        open={showAddLead} 
        onOpenChange={setShowAddLead}
        onAddLead={handleAddLead}
      />
    </div>
  );
};

export default Dashboard;