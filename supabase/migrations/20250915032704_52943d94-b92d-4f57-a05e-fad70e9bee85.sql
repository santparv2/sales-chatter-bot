-- Create email templates table
CREATE TABLE public.email_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  lead_status TEXT,
  template_type TEXT NOT NULL DEFAULT 'follow_up',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  CONSTRAINT valid_lead_status CHECK (
    lead_status IS NULL OR 
    lead_status IN ('New', 'Contacted', 'Interested', 'Not Interested', 'Booked Consultation', 'Enrolled')
  ),
  CONSTRAINT valid_template_type CHECK (
    template_type IN ('follow_up', 'welcome', 'reminder', 'promotional', 'thank_you')
  )
);

-- Enable Row Level Security
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;

-- Create policies for email templates
CREATE POLICY "Users can view their own templates" 
ON public.email_templates 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own templates" 
ON public.email_templates 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own templates" 
ON public.email_templates 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own templates" 
ON public.email_templates 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_email_templates_updated_at
BEFORE UPDATE ON public.email_templates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some default templates
INSERT INTO public.email_templates (user_id, name, subject, body, lead_status, template_type) VALUES
(
  '00000000-0000-0000-0000-000000000000', -- This will be replaced by actual user_id in the app
  'New Lead Welcome',
  'Welcome to our wellness program!',
  'Hi {{firstName}},

Thank you for your interest in our wellness program! We''re excited to help you achieve your goals of {{primaryGoals}}.

Based on your information, I believe we can create a perfect plan to address your concerns about {{challengesPainPoints}}.

I''ll be reaching out soon to schedule a consultation at your preferred time: {{preferredFollowUpTime}}.

Best regards,
{{assignedSalesRep}}',
  'New',
  'welcome'
),
(
  '00000000-0000-0000-0000-000000000000',
  'Follow-up for Contacted Leads',
  'Following up on our conversation',
  'Hi {{firstName}},

I hope you''re doing well! I wanted to follow up on our previous conversation about your wellness goals.

As discussed, you''re interested in {{servicePackageDiscussed}} to help with {{primaryGoals}}.

Would you like to schedule a consultation to discuss the next steps? I have availability during your preferred time: {{preferredFollowUpTime}}.

Looking forward to hearing from you!

Best regards,
{{assignedSalesRep}}',
  'Contacted',
  'follow_up'
),
(
  '00000000-0000-0000-0000-000000000000',
  'Interested Lead Next Steps',
  'Ready to start your wellness journey?',
  'Hi {{firstName}},

It''s great to hear that you''re interested in moving forward with {{servicePackageDiscussed}}!

Based on our discussion about your goals ({{primaryGoals}}) and your budget range of {{budgetRange}}, I''ve prepared a customized proposal for you.

Let''s schedule a consultation to go over the details and answer any questions you might have.

Best regards,
{{assignedSalesRep}}',
  'Interested',
  'follow_up'
);