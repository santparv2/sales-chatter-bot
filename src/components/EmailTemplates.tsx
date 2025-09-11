import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Copy, 
  Edit, 
  Clock,
  Users,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  type: 'welcome' | 'follow-up' | 'check-in' | 'offer';
  stage: string;
}

const emailTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Welcome Email',
    subject: 'Welcome! Let\'s discuss your [business goal]',
    body: `Hi [Customer Name],

Thank you for your interest in [Product/Service]. I'm excited to learn more about [specific business challenge or goal mentioned].

I'd love to schedule a brief 15-minute call to understand your needs better and see how we can help you achieve [specific outcome].

Are you available this week for a quick chat?

Best regards,
[Your Name]
[Your Contact Info]`,
    type: 'welcome',
    stage: 'Day 1'
  },
  {
    id: '2',
    name: 'Follow-up Email',
    subject: 'Just checking in – Any questions?',
    body: `Hi [Customer Name],

I just wanted to follow up on our last conversation. I hope you had a chance to think about [product/service name] and how it might support your [goal/business needs].

If you have any questions or need more information, I'm happy to help.

Looking forward to hearing from you!

Best regards,
[Your Name]
[Your Contact Info]`,
    type: 'follow-up',
    stage: 'Day 3'
  },
  {
    id: '3',
    name: 'Value Share Email',
    subject: 'Case study: How [Similar Company] achieved [Result]',
    body: `Hi [Customer Name],

I thought you'd be interested in this case study about how [Similar Company] used our solution to [achieve specific result].

Key highlights:
• [Specific benefit 1]
• [Specific benefit 2] 
• [Quantified result]

I'd be happy to discuss how we could achieve similar results for [Customer's Company].

Would you like to schedule a quick 15-minute call this week?

Best regards,
[Your Name]`,
    type: 'follow-up',
    stage: 'Day 7'
  },
  {
    id: '4',
    name: 'Decision Nudge',
    subject: 'Moving forward with [Solution] – Questions?',
    body: `Hi [Customer Name],

I wanted to reconnect and see if you've had a chance to consider our proposal for [specific solution/service].

I understand decision-making takes time, and I'm here to address any questions or concerns you might have.

If timing isn't right now, I'd love to understand what would make this a better fit for your schedule.

Happy to jump on a quick call at your convenience.

Best regards,
[Your Name]`,
    type: 'offer',
    stage: 'Day 14'
  },
  {
    id: '5',
    name: 'Long-term Check-in',
    subject: 'Checking in – How are things going?',
    body: `Hi [Customer Name],

I hope you're doing well! I wanted to check in and see how things are progressing with [business area/challenge we discussed].

Even if our solution isn't the right fit right now, I'd love to stay connected and be a resource for you.

Is there anything I can help with or any industry insights that might be valuable?

Best regards,
[Your Name]`,
    type: 'check-in',
    stage: 'Day 30+'
  }
];

export const EmailTemplates = () => {
  const { toast } = useToast();

  const getTypeColor = (type: EmailTemplate['type']) => {
    switch (type) {
      case 'welcome':
        return 'bg-success text-success-foreground';
      case 'follow-up':
        return 'bg-primary text-primary-foreground';
      case 'check-in':
        return 'bg-warning text-warning-foreground';
      case 'offer':
        return 'bg-hot-lead text-white';
      default:
        return 'bg-muted';
    }
  };

  const getTypeIcon = (type: EmailTemplate['type']) => {
    switch (type) {
      case 'welcome':
        return <Users className="w-4 h-4" />;
      case 'follow-up':
        return <Clock className="w-4 h-4" />;
      case 'check-in':
        return <Mail className="w-4 h-4" />;
      case 'offer':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  const copyTemplate = (template: EmailTemplate) => {
    const fullTemplate = `Subject: ${template.subject}\n\n${template.body}`;
    navigator.clipboard.writeText(fullTemplate);
    toast({
      title: "Template Copied",
      description: "Email template has been copied to your clipboard",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Email Templates</h2>
        <Badge variant="secondary">
          {emailTemplates.length} Templates
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {emailTemplates.map((template) => (
          <Card key={template.id} className="bg-gradient-to-br from-card to-secondary/20 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {getTypeIcon(template.type)}
                    {template.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Use on: {template.stage}
                  </p>
                </div>
                <Badge className={getTypeColor(template.type)}>
                  {template.type}
                </Badge>
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
                  Copy Template
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-primary/5 to-primary-glow/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg text-primary">
            📧 Follow-Up Schedule Quick Reference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="space-y-2">
              <p className="font-medium">Day 1: Welcome Email</p>
              <p className="text-muted-foreground">Acknowledge interest, intro call</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Day 3: Follow-up</p>
              <p className="text-muted-foreground">Address questions, build rapport</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Day 7: Share Value</p>
              <p className="text-muted-foreground">Case study, demo, testimonial</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Day 14: Decision Nudge</p>
              <p className="text-muted-foreground">Reconnect with offer</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Day 30: Check-in</p>
              <p className="text-muted-foreground">Stay top-of-mind</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Day 60+: Nurture</p>
              <p className="text-muted-foreground">Monthly newsletters</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};