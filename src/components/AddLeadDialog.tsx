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
  name: string;
  email: string;
  company: string;
  stage: 'hot' | 'warm' | 'cold';
  lastContact: string;
  nextFollowUp: string;
  value: number;
  source: string;
}

interface AddLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddLead: (lead: Lead) => void;
}

export const AddLeadDialog = ({ open, onOpenChange, onAddLead }: AddLeadDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Lead>({
    name: '',
    email: '',
    company: '',
    stage: 'warm',
    lastContact: new Date().toISOString().split('T')[0],
    nextFollowUp: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    value: 0,
    source: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.company) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    onAddLead(formData);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      stage: 'warm',
      lastContact: new Date().toISOString().split('T')[0],
      nextFollowUp: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: 0,
      source: ''
    });

    toast({
      title: "Lead Added",
      description: "New lead has been successfully added to your pipeline",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Lead</DialogTitle>
          <DialogDescription>
            Enter the details for your new lead. This will be added to your CRM pipeline.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter lead's full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="lead@company.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company *</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Company name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stage">Lead Stage</Label>
              <Select value={formData.stage} onValueChange={(value: 'hot' | 'warm' | 'cold') => setFormData({ ...formData, stage: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hot">Hot</SelectItem>
                  <SelectItem value="warm">Warm</SelectItem>
                  <SelectItem value="cold">Cold</SelectItem>
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

          <div className="space-y-2">
            <Label htmlFor="source">Lead Source</Label>
            <Select value={formData.source} onValueChange={(value) => setFormData({ ...formData, source: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select lead source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Website Form">Website Form</SelectItem>
                <SelectItem value="Cold Email">Cold Email</SelectItem>
                <SelectItem value="Referral">Referral</SelectItem>
                <SelectItem value="Social Media">Social Media</SelectItem>
                <SelectItem value="Phone Call">Phone Call</SelectItem>
                <SelectItem value="Trade Show">Trade Show</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lastContact">Last Contact</Label>
              <Input
                id="lastContact"
                type="date"
                value={formData.lastContact}
                onChange={(e) => setFormData({ ...formData, lastContact: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nextFollowUp">Next Follow-up</Label>
              <Input
                id="nextFollowUp"
                type="date"
                value={formData.nextFollowUp}
                onChange={(e) => setFormData({ ...formData, nextFollowUp: e.target.value })}
              />
            </div>
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