# SULUAN Static Prototype

SULUAN is a high-fidelity, mostly static web prototype for an AI-assisted institutional research intelligence platform for the University of the Assumption.

This prototype uses React, Vite, TypeScript, Tailwind CSS, React Router, Recharts, React Flow, lucide-react, clsx, static TypeScript datasets, and localStorage. It does not use a backend, real AI integration, real databases, paid APIs, Supabase, Firebase, OpenAI API, or confidential university records.

## Run locally

```powershell
npm install
npm run dev
```

Build for verification:

```powershell
npm run build
```

## Prototype limits

- Semantic search is simulated with predefined scenarios and temporary sample metadata.
- Role switching, validation status changes, and submitted records are stored in localStorage only.
- Analytics and knowledge graph views are based on fictional sample records.
- Full authentication, database storage, AI services, audit trails, and repository integrations are planned for a future implementation after proposal approval.
