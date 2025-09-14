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
  CheckCircle,
  LogOut
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
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
  whatsappNumber?: string;
  facebookHandle?: string;
  instagramHandle?: string;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
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
      budgetRange: 'Rs 1000-Rs 2000',
      leadScore: 8,
      value: 1800,
      whatsappNumber: '+1 (555) 123-4567',
      facebookHandle: 'sarah.johnson.wellness',
      instagramHandle: '@sarah_wellness_journey'
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
      budgetRange: 'Rs 2000+',
      leadScore: 7,
      value: 3500,
      whatsappNumber: '+1 (555) 987-6543',
      facebookHandle: 'mike.chen.sf',
      instagramHandle: '@mikefitnesssf'
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
      budgetRange: 'Rs 2000+',
      leadScore: 9,
      value: 5000,
      whatsappNumber: '+1 (555) 456-7890',
      facebookHandle: 'emma.davis.spa',
      instagramHandle: '@emma_luxury_wellness'
    },
    {
      id: 'LEAD-1705123456792',
      firstName: 'James',
      lastName: 'Rodriguez',
      age: 35,
      weight: '85kg',
      gender: 'Male',
      phone: '+1 (555) 234-5678',
      email: 'james.r@fittech.com',
      preferredContactMethod: 'Email',
      location: 'Austin, TX, CST',
      primaryGoals: 'Marathon training and endurance building',
      challengesPainPoints: 'Previous knee injury, needs specialized training plan',
      currentRoutineLifestyle: 'Software engineer, runs 3x/week, vegetarian diet',
      leadSource: 'Google Ads',
      dateCaptured: '2024-01-20',
      firstContactMadeBy: 'Alex Thompson',
      methodOfContact: 'Landing Page',
      nextFollowUp: '2024-01-22',
      preferredFollowUpTime: 'Morning 7-9 AM',
      notesFromLastConversation: 'Training for Boston Marathon, needs injury prevention focus',
      leadStatus: 'Booked Consultation',
      assignedSalesRep: 'Alex Thompson',
      servicePackageDiscussed: 'Marathon Training Program',
      budgetRange: 'Rs 500-Rs 1000',
      leadScore: 9,
      value: 800,
      whatsappNumber: '+1 (555) 234-5678',
      facebookHandle: 'james.rodriguez.runner',
      instagramHandle: '@james_marathon_journey'
    },
    {
      id: 'LEAD-1705123456793',
      firstName: 'Jessica',
      lastName: 'Kim',
      age: 27,
      weight: '58kg',
      gender: 'Female',
      phone: '+1 (555) 345-6789',
      email: 'jessica.kim@design.co',
      preferredContactMethod: 'WhatsApp',
      location: 'Seattle, WA, PST',
      primaryGoals: 'Muscle toning and strength building',
      challengesPainPoints: 'New to fitness, intimidated by gym environment',
      currentRoutineLifestyle: 'Graphic designer, mostly sedentary, loves outdoor activities',
      leadSource: 'TikTok',
      dateCaptured: '2024-01-12',
      firstContactMadeBy: 'Sarah Williams',
      methodOfContact: 'DM',
      nextFollowUp: '2024-01-24',
      preferredFollowUpTime: 'Evening 5-7 PM',
      notesFromLastConversation: 'Wants to start slow, prefers home workouts initially',
      leadStatus: 'Interested',
      assignedSalesRep: 'Sarah Williams',
      servicePackageDiscussed: 'Beginner Strength Package',
      budgetRange: 'Rs 300-Rs 500',
      leadScore: 6,
      value: 400,
      whatsappNumber: '+1 (555) 345-6789',
      facebookHandle: 'jessica.kim.design',
      instagramHandle: '@jess_design_fitness'
    },
    {
      id: 'LEAD-1705123456794',
      firstName: 'Robert',
      lastName: 'Taylor',
      age: 52,
      weight: '95kg',
      gender: 'Male',
      phone: '+1 (555) 567-8901',
      email: 'robert@consulting.pro',
      preferredContactMethod: 'Phone',
      location: 'Chicago, IL, CST',
      primaryGoals: 'Weight loss and diabetes management',
      challengesPainPoints: 'Type 2 diabetes, joint pain, low energy levels',
      currentRoutineLifestyle: 'Management consultant, frequent travel, irregular meals',
      leadSource: 'LinkedIn',
      dateCaptured: '2024-01-08',
      firstContactMadeBy: 'Dr. Patricia Lee',
      methodOfContact: 'Connection Request',
      nextFollowUp: '2024-01-26',
      preferredFollowUpTime: 'Lunch 12-1 PM',
      notesFromLastConversation: 'Doctor recommended fitness program, very motivated for health reasons',
      leadStatus: 'Enrolled',
      assignedSalesRep: 'Dr. Patricia Lee',
      servicePackageDiscussed: 'Medical Fitness Program',
      budgetRange: 'Rs 2000+',
      leadScore: 10,
      value: 4500,
      whatsappNumber: '+1 (555) 567-8901',
      facebookHandle: 'robert.taylor.consulting',
      instagramHandle: '@rob_health_transformation'
    },
    {
      id: 'LEAD-1705123456795',
      firstName: 'Amanda',
      lastName: 'Foster',
      age: 38,
      weight: '72kg',
      gender: 'Female',
      phone: '+1 (555) 678-9012',
      email: 'amanda@motherhood.com',
      preferredContactMethod: 'WhatsApp',
      location: 'Denver, CO, MST',
      primaryGoals: 'Postpartum fitness and core strength recovery',
      challengesPainPoints: 'Diastasis recti, lack of time, sleep deprivation',
      currentRoutineLifestyle: 'Stay-at-home mom, 2 young children, former athlete',
      leadSource: 'Mom Facebook Group',
      dateCaptured: '2024-01-18',
      firstContactMadeBy: 'Emma Johnson',
      methodOfContact: 'Group Recommendation',
      nextFollowUp: '2024-01-21',
      preferredFollowUpTime: 'Morning 10-11 AM',
      notesFromLastConversation: 'Needs flexible schedule, prefers virtual sessions initially',
      leadStatus: 'Contacted',
      assignedSalesRep: 'Emma Johnson',
      servicePackageDiscussed: 'Postpartum Recovery Program',
      budgetRange: 'Rs 500-Rs 1000',
      leadScore: 8,
      value: 750,
      whatsappNumber: '+1 (555) 678-9012',
      facebookHandle: 'amanda.foster.mom',
      instagramHandle: '@mama_fit_journey'
    },
    {
      id: 'LEAD-1705123456796',
      firstName: 'David',
      lastName: 'Park',
      age: 24,
      weight: '68kg',
      gender: 'Male',
      phone: '+1 (555) 789-0123',
      email: 'david.park@university.edu',
      preferredContactMethod: 'Instagram',
      location: 'Boston, MA, EST',
      primaryGoals: 'Bodybuilding competition prep',
      challengesPainPoints: 'Plateau in muscle growth, need advanced nutrition plan',
      currentRoutineLifestyle: 'College student, gym 6x/week, flexible schedule',
      leadSource: 'YouTube',
      dateCaptured: '2024-01-14',
      firstContactMadeBy: 'Marcus Williams',
      methodOfContact: 'Comment Reply',
      nextFollowUp: '2024-01-23',
      preferredFollowUpTime: 'Afternoon 3-5 PM',
      notesFromLastConversation: 'Preparing for first competition, highly dedicated',
      leadStatus: 'Interested',
      assignedSalesRep: 'Marcus Williams',
      servicePackageDiscussed: 'Competition Prep Program',
      budgetRange: 'Rs 1000-Rs 2000',
      leadScore: 7,
      value: 1200,
      whatsappNumber: '+1 (555) 789-0123',
      facebookHandle: 'david.park.fitness',
      instagramHandle: '@davidpark_bodybuilding'
    },
    {
      id: 'LEAD-1705123456797',
      firstName: 'Lisa',
      lastName: 'Martinez',
      age: 41,
      weight: '68kg',
      gender: 'Female',
      phone: '+1 (555) 890-1234',
      email: 'lisa@realestate.biz',
      preferredContactMethod: 'Email',
      location: 'Phoenix, AZ, MST',
      primaryGoals: 'Menopause fitness and bone density',
      challengesPainPoints: 'Hormonal changes, weight gain, decreased energy',
      currentRoutineLifestyle: 'Real estate agent, irregular hours, used to be very active',
      leadSource: 'Podcast Ad',
      dateCaptured: '2024-01-11',
      firstContactMadeBy: 'Dr. Lisa Chang',
      methodOfContact: 'Podcast Landing Page',
      nextFollowUp: '2024-01-27',
      preferredFollowUpTime: 'Evening 6-8 PM',
      notesFromLastConversation: 'Concerned about bone health, wants science-based approach',
      leadStatus: 'New',
      assignedSalesRep: 'Dr. Lisa Chang',
      servicePackageDiscussed: 'Menopause Wellness Program',
      budgetRange: 'Rs 1000-Rs 2000',
      leadScore: 8,
      value: 1500,
      whatsappNumber: '+1 (555) 890-1234',
      facebookHandle: 'lisa.martinez.realtor',
      instagramHandle: '@lisa_midlife_fitness'
    },
    {
      id: 'LEAD-1705123456798',
      firstName: 'Kevin',
      lastName: 'Brown',
      age: 19,
      weight: '75kg',
      gender: 'Male',
      phone: '+1 (555) 901-2345',
      email: 'kevin@student.edu',
      preferredContactMethod: 'WhatsApp',
      location: 'Orlando, FL, EST',
      primaryGoals: 'Football performance and speed training',
      challengesPainPoints: 'College tryouts coming up, needs explosive power',
      currentRoutineLifestyle: 'College freshman, high school football background',
      leadSource: 'Friend Referral',
      dateCaptured: '2024-01-16',
      firstContactMadeBy: 'Coach Mike Davis',
      methodOfContact: 'Phone Call',
      nextFollowUp: '2024-01-19',
      preferredFollowUpTime: 'Afternoon 4-6 PM',
      notesFromLastConversation: 'Tryouts in 3 months, needs intensive training program',
      leadStatus: 'Not Interested',
      assignedSalesRep: 'Coach Mike Davis',
      servicePackageDiscussed: 'Athletic Performance Program',
      budgetRange: 'Rs 300-Rs 500',
      leadScore: 4,
      value: 400,
      whatsappNumber: '+1 (555) 901-2345',
      facebookHandle: 'kevin.brown.athlete',
      instagramHandle: '@kevin_football_training'
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
              {user && (
                <div className="text-sm text-muted-foreground">
                  Welcome, {user.user_metadata?.display_name || user.email}
                </div>
              )}
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
            <div className="flex items-center space-x-4">
              <Button onClick={() => setShowAddLead(true)} className="bg-gradient-to-r from-primary to-primary-glow">
                <Plus className="w-4 h-4 mr-2" />
                Add Lead
              </Button>
              <Button 
                variant="outline" 
                onClick={signOut}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
              <Card className="bg-gradient-to-br from-card to-secondary/20 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all duration-200 hover:scale-105 animate-slide-up">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Leads</CardTitle>
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stats.totalLeads}</div>
                  <p className="text-xs text-muted-foreground">Active prospects</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-card to-success-light shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all duration-200 hover:scale-105 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Qualified Leads</CardTitle>
                  <div className="p-2 bg-success/10 rounded-full">
                    <Target className="h-4 w-4 text-success" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">{stats.qualifiedLeads}</div>
                  <p className="text-xs text-muted-foreground">Ready to close</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-card to-primary/10 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all duration-200 hover:scale-105 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Pipeline Value</CardTitle>
                  <div className="p-2 bg-primary/10 rounded-full">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">Rs {stats.totalValue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Total potential revenue</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-card to-warning-light shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all duration-200 hover:scale-105 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
                  <div className="p-2 bg-success/10 rounded-full">
                    <CheckCircle className="h-4 w-4 text-success" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stats.conversionRate}%</div>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Leads */}
            <Card className="shadow-[var(--shadow-elevated)] animate-fade-in backdrop-blur-sm bg-card/95 border-border/50" style={{ animationDelay: '0.4s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Calendar className="w-5 h-5 text-primary" />
                  Recent Leads & Follow-ups
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {leads.slice(0, 3).map((lead, index) => (
                  <div 
                    key={lead.id} 
                    className="animate-slide-up"
                    style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                  >
                    <LeadCard lead={lead} />
                  </div>
                ))}
                {leads.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No leads yet. Add your first lead to get started!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                All Leads
              </h2>
              <div className="flex gap-2">
                <Badge variant="secondary" className="animate-pulse-glow">
                  Total: {leads.length}
                </Badge>
                <Badge className="bg-success text-white hover:bg-success/90 transition-colors duration-200">
                  Qualified: {stats.qualifiedLeads}
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {leads.map((lead, index) => (
                <div 
                  key={lead.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <LeadCard lead={lead} />
                </div>
              ))}
              {leads.length === 0 && (
                <div className="col-span-full text-center py-16 animate-fade-in">
                  <div className="text-6xl mb-4">🎯</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No leads yet</h3>
                  <p className="text-muted-foreground mb-6">Start building your pipeline by adding your first lead!</p>
                  <Button
                    onClick={() => setShowAddLead(true)}
                    className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-[var(--shadow-button)] transition-all duration-200 hover:scale-105"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Lead
                  </Button>
                </div>
              )}
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