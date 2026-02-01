---
story_id: "6-3-automation-flow-triggers"
epic_id: "epic-6"
title: "Automation Flow Triggers"
description: "Implement distinct email automation flows based on the wizard's qualification outcome (Qualified Lead vs Partner Referral)."
status: "in-progress"
assigned_to: "dev-agent"
---

## Tasks

- [ ] **Data Logic**: Update `emailService.ts` to accept an `outcome` parameter in the notification logic.
- [ ] **Templates**: Create distinct HTML email templates for:
    - **Qualified Flow**: Schedule a Call CTA.
    - **Partner Flow**: "We'll introduce you to our partners" messaging.
- [ ] **Implementation**: Refactor `sendLeadNotification` to dispatch the correct template based on `wizardData.outcome`.
- [ ] **Testing**: Verify that the correct email log appears for each outcome in dev console.

## Technical Notes
- Keep templates simple (inline strings) for now.
- Ensure the Admin notification clearly highlights the "Qualified" status so high-priority leads are obvious.
