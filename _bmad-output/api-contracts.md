# API Contracts (Service Layer)

Currently, the application uses **Mock Services** to simulate backend interactions. These contracts define the interface between the UI and the Data Layer.

## Audit Service (`src/services/auditService.ts`)

### `analyzeUrl(url: string)`

Analyzes a provided URL for marketing performance metrics.

**Request:**
- `url` (string): The landing page URL to audit.

**Response (Promise<AuditResult>):**
```typescript
interface AuditResult {
  score: number; // 0-100
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  analysis: {
    headlines: string;
    descriptions: string;
    keywords: string;
  };
  recommendations: string[];
}
```

**Behavior:**
- Simulates network latency (1.5s - 3.5s).
- Returns mocked data for demonstration purposes.

---

*(Note: Future real API integration should adhere to these TypeScript interfaces to ensure frontend compatibility.)*
