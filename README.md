# SULUAN Static Prototype

SULUAN is a high-fidelity static web prototype for proposal-defense demonstration of an AI-assisted institutional research intelligence platform for the University of the Assumption.

This prototype uses React, Vite, TypeScript, Tailwind CSS, React Router, Recharts, React Flow, lucide-react, clsx, static TypeScript datasets, and localStorage. It does not use a backend, real AI integration, real databases, paid APIs, Supabase, Firebase, OpenAI API, or confidential university records.

## Objective Mapping

The prototype demonstrates the approved SULUAN concept through:

- A centralized sample repository for validated authorized-UA-style research metadata.
- Metadata and provenance management displays.
- Administrative validation simulation using localStorage.
- Simulated role-based access for Student, Faculty, Repository Manager, and Admin.
- Prototype-only Login and Create Account interface flows using harmless localStorage session/request data only.
- Simulated Semantic Search using predefined scenarios and fallback matching over validated sample records.
- Knowledge Graph exploration generated from validated sample metadata.
- Descriptive analytics for academic unit, year, theme, validation status, and access status using validated sample records by default.
- Citation and metadata support through generated sample citations.
- Journal metadata and verified alumni publication metadata represented only as permitted-content simulations.

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

- AI, database, authentication, backend services, document access approval, and external integrations are simulated or absent.
- Semantic search is simulated with predefined scenarios and temporary sample metadata.
- Login, Create Account, role switching, validation status changes, and submitted metadata are prototype simulations stored in localStorage only.
- Login does not authenticate users, and Create Account does not create real accounts or store passwords.
- Analytics and knowledge graph views are based on fictional sample records.
- The prototype does not determine research gaps, verify originality, evaluate research quality, predict trends, check plagiarism, or automate citation recommendations.
- Full production implementation may be considered only after proposal approval and institutional validation.
