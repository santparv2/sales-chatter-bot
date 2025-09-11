import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

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

interface AddLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddLead: (lead: Lead) => void;
}

export const AddLeadDialog = ({ open, onOpenChange, onAddLead }: AddLeadDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Lead>({
    id: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    company: '',
    leadSource: '',
    interestArea: '',
    preferredContactMethod: '',
    location: '',
    wellnessGoals: '',
    leadStatus: 'New',
    nextFollowUp: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: '',
    dateCaptured: new Date().toISOString().split('T')[0],
    assignedSalesRep: '',
    servicePackageDiscussed: '',
    budgetRange: '',
    leadScore: 0,
    value: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const leadWithId = {
      ...formData,
      id: `LEAD-${Date.now()}`
    };
    
    onAddLead(leadWithId);
    
    // Reset form
    setFormData({
      id: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      company: '',
      leadSource: '',
      interestArea: '',
      preferredContactMethod: '',
      location: '',
      wellnessGoals: '',
      leadStatus: 'New',
      nextFollowUp: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      notes: '',
      dateCaptured: new Date().toISOString().split('T')[0],
      assignedSalesRep: '',
      servicePackageDiscussed: '',
      budgetRange: '',
      leadScore: 0,
      value: 0
    });

    toast({
      title: "Lead Added",
      description: "New lead has been successfully added to your pipeline",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Lead</DialogTitle>
          <DialogDescription>
            Enter the details for your new lead. This will be added to your CRM pipeline.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="First name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="Last name"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="lead@email.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Company name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="City, State/Country"
              />
            </div>
          </div>

          {/* Lead Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="leadSource">Lead Source</Label>
              <Select value={formData.leadSource} onValueChange={(value) => setFormData({ ...formData, leadSource: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Facebook">Facebook</SelectItem>
                  <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                  <SelectItem value="Website">Website</SelectItem>
                  <SelectItem value="Referral">Referral</SelectItem>
                  <SelectItem value="Event">Event</SelectItem>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="Google Ads">Google Ads</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="interestArea">Interest Area</Label>
              <Select value={formData.interestArea} onValueChange={(value) => setFormData({ ...formData, interestArea: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select interest" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yoga">Yoga</SelectItem>
                  <SelectItem value="Nutrition Coaching">Nutrition Coaching</SelectItem>
                  <SelectItem value="Spa Services">Spa Services</SelectItem>
                  <SelectItem value="Therapy">Therapy</SelectItem>
                  <SelectItem value="Fitness Training">Fitness Training</SelectItem>
                  <SelectItem value="Wellness Consultation">Wellness Consultation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="preferredContactMethod">Preferred Contact</Label>
              <Select value={formData.preferredContactMethod} onValueChange={(value) => setFormData({ ...formData, preferredContactMethod: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Phone">Phone</SelectItem>
                  <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                  <SelectItem value="Email">Email</SelectItem>
                  <SelectItem value="SMS">SMS</SelectItem>
                  <SelectItem value="Video Call">Video Call</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="leadStatus">Lead Status</Label>
              <Select value={formData.leadStatus} onValueChange={(value: 'New' | 'Contacted' | 'Qualified' | 'Not Interested' | 'Converted') => setFormData({ ...formData, leadStatus: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Contacted">Contacted</SelectItem>
                  <SelectItem value="Qualified">Qualified</SelectItem>
                  <SelectItem value="Not Interested">Not Interested</SelectItem>
                  <SelectItem value="Converted">Converted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="wellnessGoals">Wellness Goals</Label>
            <Input
              id="wellnessGoals"
              value={formData.wellnessGoals}
              onChange={(e) => setFormData({ ...formData, wellnessGoals: e.target.value })}
              placeholder="Weight loss, stress relief, fitness, sleep improvement, etc."
            />
          </div>

          {/* Business Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budgetRange">Budget Range</Label>
              <Select value={formData.budgetRange} onValueChange={(value) => setFormData({ ...formData, budgetRange: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Under $500">Under $500</SelectItem>
                  <SelectItem value="$500 - $1,000">$500 - $1,000</SelectItem>
                  <SelectItem value="$1,000 - $2,500">$1,000 - $2,500</SelectItem>
                  <SelectItem value="$2,500 - $5,000">$2,500 - $5,000</SelectItem>
                  <SelectItem value="$5,000+">$5,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="value">Deal Value ($)</Label>
              <Input
                id="value"
                type="number"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="assignedSalesRep">Assigned Sales Rep</Label>
              <Input
                id="assignedSalesRep"
                value={formData.assignedSalesRep}
                onChange={(e) => setFormData({ ...formData, assignedSalesRep: e.target.value })}
                placeholder="Sales rep name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="leadScore">Lead Score (1-10)</Label>
              <Input
                id="leadScore"
                type="number"
                min="1"
                max="10"
                value={formData.leadScore}
                onChange={(e) => setFormData({ ...formData, leadScore: Number(e.target.value) })}
                placeholder="5"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="servicePackageDiscussed">Service Package Discussed</Label>
            <Input
              id="servicePackageDiscussed"
              value={formData.servicePackageDiscussed}
              onChange={(e) => setFormData({ ...formData, servicePackageDiscussed: e.target.value })}
              placeholder="Package or service discussed"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nextFollowUp">Next Follow-up Date</Label>
            <Input
              id="nextFollowUp"
              type="date"
              value={formData.nextFollowUp}
              onChange={(e) => setFormData({ ...formData, nextFollowUp: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <textarea
              id="notes"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Special needs, availability, preferences, etc."
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-primary to-primary-glow">
              Add Lead
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};