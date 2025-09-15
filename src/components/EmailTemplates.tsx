import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Plus,
  Edit,
  Trash2,
  Copy,
  Mail,
  Save,
  X,
  AlertCircle,
  Filter,
  Users,
  Clock,
  TrendingUp,
  MessageCircle,
  Gift,
  Heart
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface EmailTemplate {
  id: string;
  user_id: string;
  name: string;
  subject: string;
  body: string;
  lead_status: 'New' | 'Contacted' | 'Interested' | 'Not Interested' | 'Booked Consultation' | 'Enrolled' | null;
  template_type: 'welcome' | 'follow_up' | 'reminder' | 'promotional' | 'thank_you';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

type LeadStatus = 'New' | 'Contacted' | 'Interested' | 'Not Interested' | 'Booked Consultation' | 'Enrolled' | 'All';
type TemplateType = 'welcome' | 'follow_up' | 'reminder' | 'promotional' | 'thank_you';

const initialFormData = {
  name: '',
  subject: '',
  body: '',
  lead_status: null as LeadStatus | null,
  template_type: 'follow_up' as TemplateType
};

export const EmailTemplates = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [formData, setFormData] = useState(initialFormData);
  const [statusFilter, setStatusFilter] = useState<LeadStatus>('All');

  useEffect(() => {
    if (user) {
      fetchTemplates();
    }
  }, [user]);

  const fetchTemplates = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Type assertion to ensure proper typing
      const typedData = (data || []) as EmailTemplate[];
      setTemplates(typedData);
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast({
        title: "Error",
        description: "Failed to fetch email templates",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      if (editingTemplate) {
        // Update existing template
        const { error } = await supabase
          .from('email_templates')
          .update({
            name: formData.name,
            subject: formData.subject,
            body: formData.body,
            lead_status: formData.lead_status === 'All' ? null : formData.lead_status,
            template_type: formData.template_type,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingTemplate.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Template updated successfully"
        });
      } else {
        // Create new template
        const { error } = await supabase
          .from('email_templates')
          .insert({
            user_id: user.id,
            name: formData.name,
            subject: formData.subject,
            body: formData.body,
            lead_status: formData.lead_status === 'All' ? null : formData.lead_status,
            template_type: formData.template_type
          });

        if (error) throw error;

        toast({
          title: "Success",
          description: "Template created successfully"
        });
      }

      setFormData(initialFormData);
      setShowForm(false);
      setEditingTemplate(null);
      fetchTemplates();
    } catch (error) {
      console.error('Error saving template:', error);
      toast({
        title: "Error",
        description: "Failed to save template",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (template: EmailTemplate) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      subject: template.subject,
      body: template.body,
      lead_status: template.lead_status || 'All',
      template_type: template.template_type
    });
    setShowForm(true);
  };

  const handleDelete = async (templateId: string) => {
    try {
      const { error } = await supabase
        .from('email_templates')
        .update({ is_active: false })
        .eq('id', templateId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Template deleted successfully"
      });
      fetchTemplates();
    } catch (error) {
      console.error('Error deleting template:', error);
      toast({
        title: "Error",
        description: "Failed to delete template",
        variant: "destructive"
      });
    }
  };

  const copyTemplate = (template: EmailTemplate) => {
    const fullTemplate = `Subject: ${template.subject}\n\n${template.body}`;
    navigator.clipboard.writeText(fullTemplate);
    toast({
      title: "Template Copied",
      description: "Email template has been copied to your clipboard"
    });
  };

  const getStatusColor = (status: LeadStatus | null) => {
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
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeColor = (type: TemplateType) => {
    switch (type) {
      case 'welcome':
        return 'bg-success text-success-foreground';
      case 'follow_up':
        return 'bg-primary text-primary-foreground';
      case 'reminder':
        return 'bg-warning text-warning-foreground';
      case 'promotional':
        return 'bg-hot-lead text-white';
      case 'thank_you':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-muted';
    }
  };

  const getTypeIcon = (type: TemplateType) => {
    switch (type) {
      case 'welcome':
        return <Users className="w-4 h-4" />;
      case 'follow_up':
        return <Clock className="w-4 h-4" />;
      case 'reminder':
        return <AlertCircle className="w-4 h-4" />;
      case 'promotional':
        return <TrendingUp className="w-4 h-4" />;
      case 'thank_you':
        return <Heart className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  const filteredTemplates = templates.filter(template => {
    if (statusFilter === 'All') return true;
    return template.lead_status === statusFilter;
  });

  if (loading) {
    return <div className="flex justify-center p-8">Loading templates...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Email Templates
        </h2>
        <div className="flex gap-2">
          <Badge variant="secondary">
            {filteredTemplates.length} Templates
          </Badge>
          <Button onClick={() => setShowForm(true)} className="bg-gradient-to-r from-primary to-primary-glow">
            <Plus className="w-4 h-4 mr-2" />
            Add Template
          </Button>
        </div>
      </div>

      {/* Filter */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Label htmlFor="status-filter">Filter by Lead Status:</Label>
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as LeadStatus)}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Contacted">Contacted</SelectItem>
              <SelectItem value="Interested">Interested</SelectItem>
              <SelectItem value="Not Interested">Not Interested</SelectItem>
              <SelectItem value="Booked Consultation">Booked Consultation</SelectItem>
              <SelectItem value="Enrolled">Enrolled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Form */}
      {showForm && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              {editingTemplate ? 'Edit Template' : 'Create New Template'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Template Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g., Welcome Email for New Leads"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="template_type">Template Type</Label>
                  <Select value={formData.template_type} onValueChange={(value) => setFormData({...formData, template_type: value as TemplateType})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="welcome">Welcome</SelectItem>
                      <SelectItem value="follow_up">Follow-up</SelectItem>
                      <SelectItem value="reminder">Reminder</SelectItem>
                      <SelectItem value="promotional">Promotional</SelectItem>
                      <SelectItem value="thank_you">Thank You</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lead_status">Lead Status (Optional)</Label>
                <Select value={formData.lead_status || 'All'} onValueChange={(value) => setFormData({...formData, lead_status: value === 'All' ? null : value as LeadStatus})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select lead status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Statuses</SelectItem>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Contacted">Contacted</SelectItem>
                    <SelectItem value="Interested">Interested</SelectItem>
                    <SelectItem value="Not Interested">Not Interested</SelectItem>
                    <SelectItem value="Booked Consultation">Booked Consultation</SelectItem>
                    <SelectItem value="Enrolled">Enrolled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Email Subject</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  placeholder="Welcome to our wellness program!"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="body">Email Body</Label>
                <Textarea
                  id="body"
                  value={formData.body}
                  onChange={(e) => setFormData({...formData, body: e.target.value})}
                  placeholder="Hi {{firstName}}, ..."
                  rows={8}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Use variables like {`{{firstName}}`}, {`{{primaryGoals}}`}, {`{{assignedSalesRep}}`} to personalize emails
                </p>
              </div>

              <div className="flex gap-2">
                <Button type="submit">
                  <Save className="w-4 h-4 mr-2" />
                  {editingTemplate ? 'Update Template' : 'Create Template'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowForm(false);
                    setEditingTemplate(null);
                    setFormData(initialFormData);
                  }}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="bg-gradient-to-br from-card to-secondary/20 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {getTypeIcon(template.template_type)}
                    {template.name}
                  </CardTitle>
                  <div className="flex gap-2 mt-2">
                    <Badge className={getTypeColor(template.template_type)}>
                      {template.template_type.replace('_', ' ')}
                    </Badge>
                    {template.lead_status && (
                      <Badge className={getStatusColor(template.lead_status)} variant="secondary">
                        {template.lead_status}
                      </Badge>
                    )}
                    {!template.lead_status && (
                      <Badge variant="secondary">
                        All Statuses
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-3">
                <h4 className="text-sm font-medium mb-2">Subject Line:</h4>
                <p className="text-sm text-muted-foreground italic">
                  {template.subject}
                </p>
              </div>

              <div className="bg-muted/30 rounded-lg p-3">
                <h4 className="text-sm font-medium mb-2">Email Body:</h4>
                <div className="text-xs text-muted-foreground max-h-32 overflow-y-auto">
                  <pre className="whitespace-pre-wrap font-sans">
                    {template.body}
                  </pre>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => copyTemplate(template)}
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEdit(template)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDelete(template.id)}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <Card className="p-8 text-center">
          <div className="text-muted-foreground">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No templates found</h3>
            <p className="mb-4">
              {statusFilter === 'All' 
                ? "Create your first email template to get started with lead follow-ups."
                : `No templates found for ${statusFilter} leads.`
              }
            </p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Template
            </Button>
          </div>
        </Card>
      )}

      {/* Help Card */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary-glow/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg text-primary flex items-center gap-2">
            <Gift className="w-5 h-5" />
            Template Variables
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Use these variables in your templates to personalize emails for each lead:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            <code className="bg-muted px-2 py-1 rounded">{`{{firstName}}`}</code>
            <code className="bg-muted px-2 py-1 rounded">{`{{lastName}}`}</code>
            <code className="bg-muted px-2 py-1 rounded">{`{{email}}`}</code>
            <code className="bg-muted px-2 py-1 rounded">{`{{primaryGoals}}`}</code>
            <code className="bg-muted px-2 py-1 rounded">{`{{challengesPainPoints}}`}</code>
            <code className="bg-muted px-2 py-1 rounded">{`{{assignedSalesRep}}`}</code>
            <code className="bg-muted px-2 py-1 rounded">{`{{servicePackageDiscussed}}`}</code>
            <code className="bg-muted px-2 py-1 rounded">{`{{budgetRange}}`}</code>
            <code className="bg-muted px-2 py-1 rounded">{`{{preferredFollowUpTime}}`}</code>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};