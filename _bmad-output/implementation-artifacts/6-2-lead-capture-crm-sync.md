---
story_id: "6-2-lead-capture-crm-sync"
epic_id: "epic-6"
title: "Lead Capture & CRM Sync"
description: "Implement a service layer to sync lead data to a CRM system (mocked for now) upon wizard completion."
status: "in-progress"
assigned_to: "dev-agent"
---

## Tasks

- [ ] **Service Layer**: Create `src/services/crmService.ts` with a `syncLead` interface.
- [ ] **Data Modeling**: Define a `CrmLead` interface that maps `WizardData` to a flat, CRM-friendly structure.
- [ ] **Implementation**: Implement `MockCrmService` to log CRM sync actions.
- [ ] **Integration**: Connect `WizardContext` completion logic to `crmService.syncLead`.

## Technical Notes
- CRM payload should be flat where possible or use JSON strings for arrays (e.g., goals).
- Include `metadata` fields like `source_url`, `utm_params` (mocked or from window), and `timestamp`.
