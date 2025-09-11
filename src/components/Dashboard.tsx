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

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddLead, setShowAddLead] = useState(false);
  
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 'LEAD-1705123456789',
      firstName: 'Sarah',
      lastName: 'Johnson',
      phone: '+1 (555) 123-4567',
      email: 'sarah@wellness.com',
      company: 'Wellness Corp',
      leadSource: 'Facebook',
      interestArea: 'Yoga',
      preferredContactMethod: 'WhatsApp',
      location: 'Los Angeles, CA',
      wellnessGoals: 'Stress relief and flexibility',
      leadStatus: 'Qualified',
      nextFollowUp: '2024-01-18',
      notes: 'Prefers morning sessions, has lower back issues',
      dateCaptured: '2024-01-15',
      assignedSalesRep: 'Lisa Chen',
      servicePackageDiscussed: 'Premium Yoga Package',
      budgetRange: '$1,000 - $2,500',
      leadScore: 8,
      value: 2000
    },
    {
      id: 'LEAD-1705123456790',
      firstName: 'Mike',
      lastName: 'Chen',
      phone: '+1 (555) 987-6543',
      email: 'mike@health.io',
      company: 'Health Innovations',
      leadSource: 'Website',
      interestArea: 'Nutrition Coaching',
      preferredContactMethod: 'Email',
      location: 'San Francisco, CA',
      wellnessGoals: 'Weight loss and muscle gain',
      leadStatus: 'Contacted',
      nextFollowUp: '2024-01-20',
      notes: 'Interested in corporate wellness program',
      dateCaptured: '2024-01-10',
      assignedSalesRep: 'John Smith',
      servicePackageDiscussed: 'Corporate Nutrition Plan',
      budgetRange: '$2,500 - $5,000',
      leadScore: 7,
      value: 3500
    },
    {
      id: 'LEAD-1705123456791',
      firstName: 'Emma',
      lastName: 'Davis',
      phone: '+1 (555) 456-7890',
      email: 'emma@spa.biz',
      company: 'Luxury Spa Co',
      leadSource: 'Referral',
      interestArea: 'Spa Services',
      preferredContactMethod: 'Phone',
      location: 'Miami, FL',
      wellnessGoals: 'Skin care and relaxation',
      leadStatus: 'New',
      nextFollowUp: '2024-01-25',
      notes: 'VIP client referral, high value potential',
      dateCaptured: '2024-01-05',
      assignedSalesRep: 'Maria Rodriguez',
      servicePackageDiscussed: 'Ultimate Spa Experience',
      budgetRange: '$5,000+',
      leadScore: 9,
      value: 8000
    }
  ]);

  const stats = {
    totalLeads: leads.length,
    qualifiedLeads: leads.filter(l => l.leadStatus === 'Qualified').length,
    totalValue: leads.reduce((sum, lead) => sum + lead.value, 0),
    conversionRate: leads.length > 0 ? Math.round((leads.filter(l => l.leadStatus === 'Converted').length / leads.length) * 100) : 0
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