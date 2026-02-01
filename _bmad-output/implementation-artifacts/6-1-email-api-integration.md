---
story_id: "6-1-email-api-integration"
epic_id: "epic-6"
title: "Email API Integration"
description: "Implement a service layer for sending transactional emails upon wizard completion, replacing console logs with a structured email service."
status: "in-progress"
assigned_to: "dev-agent"
---

## Tasks

- [ ] **Service Layer**: Create `src/services/emailService.ts` with a `sendEmail` interface.
- [ ] **Implementation**: Implement a `MockEmailService` (or `ResendService` if API key provided) that logs structured email objects.
- [ ] **Integration**: Connect `WizardContext` completion logic to `emailService.sendLeadNotification`.
- [ ] **Templates**: Define simple text/HTML templates for:
    - Admin Notification ("New Lead: [Name]")
    - User Confirmation ("We received your application")

## Technical Notes
- Use a `EmailProvider` interface pattern to allow easy switching between Mock/SendGrid/Resend.
- Ensure sensitive keys are accessed via `import.meta.env`.
