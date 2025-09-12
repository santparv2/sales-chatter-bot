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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

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
    age: 0,
    weight: '',
    gender: 'Male',
    phone: '',
    email: '',
    preferredContactMethod: '',
    location: '',
    primaryGoals: '',
    challengesPainPoints: '',
    currentRoutineLifestyle: '',
    leadSource: '',
    dateCaptured: new Date().toISOString().split('T')[0],
    firstContactMadeBy: '',
    methodOfContact: '',
    nextFollowUp: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    preferredFollowUpTime: '',
    notesFromLastConversation: '',
    leadStatus: 'New',
    assignedSalesRep: '',
    servicePackageDiscussed: '',
    budgetRange: '',
    leadScore: 0,
    value: 0,
    whatsappNumber: '',
    facebookHandle: '',
    instagramHandle: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (Name and Email)",
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
      age: 0,
      weight: '',
      gender: 'Male',
      phone: '',
      email: '',
      preferredContactMethod: '',
      location: '',
      primaryGoals: '',
      challengesPainPoints: '',
      currentRoutineLifestyle: '',
      leadSource: '',
      dateCaptured: new Date().toISOString().split('T')[0],
      firstContactMadeBy: '',
      methodOfContact: '',
      nextFollowUp: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      preferredFollowUpTime: '',
      notesFromLastConversation: '',
      leadStatus: 'New',
      assignedSalesRep: '',
      servicePackageDiscussed: '',
      budgetRange: '',
      leadScore: 0,
      value: 0,
      whatsappNumber: '',
      facebookHandle: '',
      instagramHandle: ''
    });

    toast({
      title: "Lead Added",
      description: "New lead has been successfully added to your pipeline",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>🧾 Add New Lead</DialogTitle>
          <DialogDescription>
            Enter the wellness lead details. This will be added to your CRM pipeline.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 🧍 Lead Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">🧍 Lead Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Full Name *</Label>
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

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age || ''}
                  onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                  placeholder="25"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg/lbs)</Label>
                <Input
                  id="weight"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  placeholder="70kg / 154lbs"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value: 'Male' | 'Female') => setFormData({ ...formData, gender: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="lead@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="preferredContactMethod">Preferred Contact Method</Label>
                <Select value={formData.preferredContactMethod} onValueChange={(value) => setFormData({ ...formData, preferredContactMethod: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select contact method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Call">Call</SelectItem>
                    <SelectItem value="Text">Text</SelectItem>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location / Time Zone</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="City, State/Country, Timezone"
                />
              </div>
            </div>

            {/* Social Media Handles */}
            <div className="space-y-4">
              <h4 className="text-md font-medium text-muted-foreground">📱 Social Media Contact</h4>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                  <Input
                    id="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    placeholder="+1234567890"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebookHandle">Facebook Handle</Label>
                  <Input
                    id="facebookHandle"
                    value={formData.facebookHandle}
                    onChange={(e) => setFormData({ ...formData, facebookHandle: e.target.value })}
                    placeholder="username or profile.php?id=123"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagramHandle">Instagram Handle</Label>
                  <Input
                    id="instagramHandle"
                    value={formData.instagramHandle}
                    onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value })}
                    placeholder="@username"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 🧘‍♀️ Wellness Interests */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">🧘‍♀️ Wellness Interests</h3>
            
            <div className="space-y-2">
              <Label htmlFor="primaryGoals">Primary Goal(s)</Label>
              <Textarea
                id="primaryGoals"
                value={formData.primaryGoals}
                onChange={(e) => setFormData({ ...formData, primaryGoals: e.target.value })}
                placeholder="e.g., weight loss, weight gain, stress management, fitness, holistic health, etc."
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="challengesPainPoints">Challenges / Pain Points</Label>
              <Textarea
                id="challengesPainPoints"
                value={formData.challengesPainPoints}
                onChange={(e) => setFormData({ ...formData, challengesPainPoints: e.target.value })}
                placeholder="What are their main challenges or pain points?"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentRoutineLifestyle">Current Routine / Lifestyle</Label>
              <Textarea
                id="currentRoutineLifestyle"
                value={formData.currentRoutineLifestyle}
                onChange={(e) => setFormData({ ...formData, currentRoutineLifestyle: e.target.value })}
                placeholder="Describe their current routine and lifestyle"
                rows={2}
              />
            </div>
          </div>

          {/* 📅 Contact History */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">📅 Contact History</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="leadSource">Lead Source</Label>
                <Select value={formData.leadSource} onValueChange={(value) => setFormData({ ...formData, leadSource: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                    <SelectItem value="Website">Website</SelectItem>
                    <SelectItem value="Referral">Referral</SelectItem>
                    <SelectItem value="Workshop">Workshop</SelectItem>
                    <SelectItem value="Event">Event</SelectItem>
                    <SelectItem value="Ad">Ad</SelectItem>
                    <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstContactMadeBy">First Contact Made By</Label>
                <Input
                  id="firstContactMadeBy"
                  value={formData.firstContactMadeBy}
                  onChange={(e) => setFormData({ ...formData, firstContactMadeBy: e.target.value })}
                  placeholder="Coach Name or Team Member"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="methodOfContact">Method of Contact</Label>
              <Select value={formData.methodOfContact} onValueChange={(value) => setFormData({ ...formData, methodOfContact: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select contact method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Phone">Phone</SelectItem>
                  <SelectItem value="Email">Email</SelectItem>
                  <SelectItem value="DM">DM</SelectItem>
                  <SelectItem value="Form Submission">Form Submission</SelectItem>
                  <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                  <SelectItem value="In Person">In Person</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 🔁 Follow-Up Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">🔁 Follow-Up Details</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nextFollowUp">Next Follow-Up Date</Label>
                <Input
                  id="nextFollowUp"
                  type="date"
                  value={formData.nextFollowUp}
                  onChange={(e) => setFormData({ ...formData, nextFollowUp: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredFollowUpTime">Preferred Time for Follow-Up</Label>
                <Input
                  id="preferredFollowUpTime"
                  value={formData.preferredFollowUpTime}
                  onChange={(e) => setFormData({ ...formData, preferredFollowUpTime: e.target.value })}
                  placeholder="e.g., Morning, 2-4 PM, Evenings"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="leadStatus">Lead Status</Label>
              <Select value={formData.leadStatus} onValueChange={(value: Lead['leadStatus']) => setFormData({ ...formData, leadStatus: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
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
              <Label htmlFor="notesFromLastConversation">Notes from Last Conversation</Label>
              <Textarea
                id="notesFromLastConversation"
                value={formData.notesFromLastConversation}
                onChange={(e) => setFormData({ ...formData, notesFromLastConversation: e.target.value })}
                placeholder="Important notes, preferences, special needs, availability times..."
                rows={3}
              />
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Details</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="assignedSalesRep">Assigned Sales Rep</Label>
                <Input
                  id="assignedSalesRep"
                  value={formData.assignedSalesRep}
                  onChange={(e) => setFormData({ ...formData, assignedSalesRep: e.target.value })}
                  placeholder="Sales representative name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budgetRange">Budget Range</Label>
                <Select value={formData.budgetRange} onValueChange={(value) => setFormData({ ...formData, budgetRange: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="$0-$500">$0-$500</SelectItem>
                    <SelectItem value="$500-$1000">$500-$1000</SelectItem>
                    <SelectItem value="$1000-$2000">$1000-$2000</SelectItem>
                    <SelectItem value="$2000+">$2000+</SelectItem>
                    <SelectItem value="Not Disclosed">Not Disclosed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="leadScore">Lead Score (0-100)</Label>
                <Input
                  id="leadScore"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.leadScore || ''}
                  onChange={(e) => setFormData({ ...formData, leadScore: parseInt(e.target.value) || 0 })}
                  placeholder="Lead quality score"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="value">Potential Value ($)</Label>
                <Input
                  id="value"
                  type="number"
                  value={formData.value || ''}
                  onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })}
                  placeholder="Expected revenue"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Lead</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};