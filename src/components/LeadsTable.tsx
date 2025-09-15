import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  Phone, 
  Mail, 
  Calendar,
  Search,
  Printer,
  Eye,
  EyeOff
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

interface LeadsTableProps {
  leads: Lead[];
}

export const LeadsTable = ({ leads }: LeadsTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllColumns, setShowAllColumns] = useState(false);

  const filteredLeads = leads.filter(lead => 
    `${lead.firstName} ${lead.lastName} ${lead.email} ${lead.leadSource} ${lead.leadStatus}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

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

  const handlePrint = () => {
    window.print();
  };

  const getDaysUntilFollowUp = (followUpDate: string) => {
    const today = new Date();
    const followUp = new Date(followUpDate);
    const diffTime = followUp.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-4">
      {/* Header with controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between print:hidden">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAllColumns(!showAllColumns)}
          >
            {showAllColumns ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
            {showAllColumns ? 'Less Details' : 'More Details'}
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-1" />
            Print
          </Button>
        </div>
      </div>

      {/* Print header */}
      <div className="hidden print:block mb-6">
        <h1 className="text-2xl font-bold text-center mb-2">CRM Leads Report</h1>
        <p className="text-center text-muted-foreground">Generated on {new Date().toLocaleDateString()}</p>
        <div className="flex justify-center gap-8 mt-4 text-sm">
          <span>Total Leads: {filteredLeads.length}</span>
          <span>Total Value: Rs{filteredLeads.reduce((sum, lead) => sum + lead.value, 0).toLocaleString()}</span>
        </div>
        <hr className="mt-4 mb-6" />
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Contact</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Value</TableHead>
              <TableHead className="font-semibold">Source</TableHead>
              <TableHead className="font-semibold">Follow-up</TableHead>
              {showAllColumns && (
                <>
                  <TableHead className="font-semibold">Goals</TableHead>
                  <TableHead className="font-semibold">Assigned Rep</TableHead>
                  <TableHead className="font-semibold">Score</TableHead>
                  <TableHead className="font-semibold">Budget Range</TableHead>
                </>
              )}
              <TableHead className="font-semibold print:hidden">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => {
              const daysUntilFollowUp = getDaysUntilFollowUp(lead.nextFollowUp);
              const isOverdue = daysUntilFollowUp < 0;
              const isDueToday = daysUntilFollowUp === 0;

              return (
                <TableRow key={lead.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell>
                    <div>
                      <div className="font-medium">{lead.firstName} {lead.lastName}</div>
                      <div className="text-sm text-muted-foreground">
                        {lead.age}y, {lead.gender}
                      </div>
                      <div className="text-xs text-muted-foreground">ID: {lead.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="w-3 h-3" />
                        <span className="truncate max-w-[150px]">{lead.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="w-3 h-3" />
                        <span className="truncate">{lead.phone}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Prefers: {lead.preferredContactMethod}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(lead.leadStatus)} variant="secondary">
                      {lead.leadStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold text-success">
                      Rs{lead.value.toLocaleString()}
                    </div>
                    {lead.budgetRange && (
                      <div className="text-xs text-muted-foreground">
                        Budget: {lead.budgetRange}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {lead.leadSource}
                    </Badge>
                    <div className="text-xs text-muted-foreground mt-1">
                      Added: {new Date(lead.dateCaptured).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`flex items-center gap-1 text-sm font-medium ${
                      isOverdue 
                        ? 'text-destructive' 
                        : isDueToday 
                          ? 'text-warning' 
                          : 'text-success'
                    }`}>
                      <Calendar className="w-3 h-3" />
                      {new Date(lead.nextFollowUp).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {isOverdue && 'Overdue'}
                      {isDueToday && 'Due Today'}
                      {!isOverdue && !isDueToday && `In ${daysUntilFollowUp} days`}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {lead.preferredFollowUpTime}
                    </div>
                  </TableCell>
                  {showAllColumns && (
                    <>
                      <TableCell>
                        <div className="text-sm max-w-[200px]">
                          <div className="font-medium truncate">{lead.primaryGoals}</div>
                          {lead.challengesPainPoints && (
                            <div className="text-xs text-muted-foreground mt-1 truncate">
                              Issues: {lead.challengesPainPoints}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{lead.assignedSalesRep}</div>
                        {lead.servicePackageDiscussed && (
                          <div className="text-xs text-muted-foreground">
                            Package: {lead.servicePackageDiscussed}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <div className="font-semibold text-primary">
                            {lead.leadScore}/10
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs">
                          {lead.budgetRange}
                        </Badge>
                      </TableCell>
                    </>
                  )}
                  <TableCell className="print:hidden">
                    <div className="flex gap-1">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => window.open(`tel:${lead.phone}`)}
                        className="px-2"
                      >
                        <Phone className="w-3 h-3" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => window.open(`mailto:${lead.email}`)}
                        className="px-2"
                      >
                        <Mail className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Print footer */}
      <div className="hidden print:block mt-8 pt-4 border-t">
        <div className="text-center text-sm text-muted-foreground">
          CRM Dashboard Report - Page 1 of 1
        </div>
      </div>

      {filteredLeads.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No leads found matching your search criteria.
        </div>
      )}
    </div>
  );
};