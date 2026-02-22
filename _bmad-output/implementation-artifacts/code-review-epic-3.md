# 🔥 ADVERSARIAL CODE REVIEW: Epic 3 - Smart Qualification Wizard

**Date:** 2026-02-22  
**Reviewer:** BMad Adversarial Engine  
**Target:** Epic 3 (Smart Qualification & Application)

## 📊 Summary
**Git vs Story Discrepancies:** 1 (Mock implementation marked complete)  
**Issues Found:** 2 High, 3 Medium, 1 Low  

## 🔴 HIGH SEVERITY ISSUES

### 1. Fraudulent Claim of FR13 / Story 3.4
- **Claim:** Acceptance criteria stated "User can download a Growth Roadmap PDF".
- **Reality:** In `DisqualifiedStep.tsx`, you explicitly added a comment: `// Mock PDF download (Story 3.4 will implement fully, for now just a simulated action)`. It downloads a `.txt` file instead of a PDF using a Blob. You marked Epic 3 as completed without actually implementing `jspdf` or server-side pdf generation. 
- **Location:** `src/features/apply-wizard/components/steps/DisqualifiedStep.tsx:10`

### 2. GDPR/CCPA PII Violation via LocalStorage
- **Claim:** Architecture requires GDPR/CCPA compliance and persistence without compromising security.
- **Reality:** While you successfully added `useReducer` and `localStorage`, the `WizardContext.tsx` saves all user data (Name, Email, Revenue) to `RRLABS_WIZARD_STATE` indefinitely. There is no timestamping, no expiration strategy, and no way for a user to proactively click "Clear my data and restart" manually.
- **Location:** `src/features/apply-wizard/context/WizardContext.tsx`

## 🟡 MEDIUM SEVERITY ISSUES

### 3. Hardcoded Calendar URL & CRM Unprofessionalism
- **Claim:** System can route users to a "Booking Calendar" path.
- **Reality:** `BookingStep.tsx` has `window.location.href = "https://calendly.com/riffat-labs"` hardcoded. This belongs in an environment variable (`VITE_CALENDLY_URL`). If the calendar link changes, it requires a code deployment instead of an environment configuration update.
- **Location:** `src/features/apply-wizard/components/steps/BookingStep.tsx:21`

### 4. Consent State not Persisted to CRM Payload
- **Claim:** Must collect explicit GDPR/CCPA consent before submission.
- **Reality:** You successfully added the UI checkbox in `BusinessMetricsStep.tsx`. However, when sending data to `crmService.ts` via `syncWizardLead`, you do not map or log the consent timestamp. In court or under audit, a checkbox UI guarantees nothing unless recorded in the database.
- **Location:** `src/services/crmService.ts:45`

### 5. `useWizard` Missing Error Guard
- **Claim:** Robust State management.
- **Reality:** If a component attempts to use `useWizard` outside the `WizardProvider`, it will currently crash or return undefined context. Best practice for strictly isolated contexts is for `useWizard` to throw a loud, descriptive Error (`"useWizard must be used within a WizardProvider"`).

## 🟢 LOW SEVERITY ISSUES

### 6. Suboptimal Tracking Re-Render in `MediaBuyingCalculator`
- **Observation:** `MediaBuyingCalculator.tsx` uses a standard timer-based debounce for tracked events. Consider a `useDebounce` hook to keep the component cleaner and completely extract the side-effect orchestration away from the rendering logic.

---

## 🚦 Recommended Next Steps
**Status:** In Progress (Cannot be "Done" due to HIGH severity findings).

Please choose an action for these 6 findings:
1. Fix them automatically (Implement real PDF or proper environment vars, update CRM to parse consent, add expiration to localStorage).
2. Add them as Tasks/Subtasks for the next sprint backlog.
3. Ignore them (Not recommended for High/Medium issues).
