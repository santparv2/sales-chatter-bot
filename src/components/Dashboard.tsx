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
  name: string;
  email: string;
  company: string;
  stage: 'hot' | 'warm' | 'cold';
  lastContact: string;
  nextFollowUp: string;
  value: number;
  source: string;
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddLead, setShowAddLead] = useState(false);
  
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@techcorp.com',
      company: 'TechCorp Solutions',
      stage: 'hot',
      lastContact: '2024-01-10',
      nextFollowUp: '2024-01-12',
      value: 15000,
      source: 'Website Form'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'mchen@innovate.io',
      company: 'Innovate Labs',
      stage: 'warm',
      lastContact: '2024-01-08',
      nextFollowUp: '2024-01-15',
      value: 25000,
      source: 'Referral'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily@startupx.com',
      company: 'StartupX',
      stage: 'cold',
      lastContact: '2024-01-05',
      nextFollowUp: '2024-01-20',
      value: 8000,
      source: 'Cold Email'
    }
  ]);

  const stats = {
    totalLeads: leads.length,
    hotLeads: leads.filter(l => l.stage === 'hot').length,
    totalValue: leads.reduce((sum, lead) => sum + lead.value, 0),
    conversionRate: 23.5
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
                  <CardTitle className="text-sm font-medium">Hot Leads</CardTitle>
                  <Target className="h-4 w-4 text-hot-lead" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-hot-lead">{stats.hotLeads}</div>
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
                <Badge className="bg-hot-lead text-white">Hot: {stats.hotLeads}</Badge>
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