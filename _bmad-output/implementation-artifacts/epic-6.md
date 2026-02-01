# Epic 6: Marketing Automation & CRM Integration

**Goal:** Transform the static "Apply" and "Contact" forms into active lead generation pipelines by connecting them to Email and CRM services.

## Rationale
Currently, the "Apply" wizard and "Book Call" buttons do not actually send data anywhere. To make this a functional lead-gen machine, we need to capture this high-value data and route it to the appropriate systems (Email for notifications, CRM for sales).

## Stories

### 6.1 Email API Integration
- **Goal:** Replace `console.log` submissions with real email delivery.
- **Tech:** Use Resend (or a mock service interface) to send transactional emails.
- **Tasks:**
    - Create `emailService.ts` abstraction.
    - Implement `sendLeadNotification` function.
    - Connect Wizard completion to send email to Admin.

### 6.2 Lead Capture & CRM Sync
- **Goal:** Store lead data structured for a CRM (e.g., HubSpot/Salesforce mock).
- **Tech:** Mock API endpoint `api/crm/sync`.
- **Tasks:**
    - Define `Lead` schema (Zod).
    - Create `crmService.ts`.
    - Implement `syncLead` function called on Wizard completion.

### 6.3 Automation Flow Triggers
- **Goal:** Trigger different follow-up flows based on user qualification.
- **Logic:**
    - **Qualified Lead:** Trigger "High Priority" email to Sales + "Booking Link" email to User.
    - **Partner Referral:** Trigger "Referral Network" email to User.
    - **Disqualified:** Trigger "Educational Resources" email to User.

## Success Metrics
- 100% of Wizard completions trigger an email.
- Data sent to "CRM" matches the schema perfectly.
- Different user segments receive different automated responses.
