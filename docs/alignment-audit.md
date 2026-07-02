# SULUAN Prototype Alignment Audit

Date: July 2, 2026

This audit aligns the current SULUAN static prototype with the uploaded capstone references. The uploaded PDFs were used only for scope alignment and were not copied into the repository.

## Reference Basis

- Chapter 1, Section 1.4: Purpose and Description
- Chapter 1, Section 1.5: General and Specific Objectives
- Chapter 1, Section 1.6: Scope and Delimitation
- Chapter 2 conceptual framing: governed institutional research intelligence, semantic retrieval, Knowledge Graphs, provenance, descriptive analytics, and responsible interpretation
- Chapter 3, Section 3.1: Developmental and evaluative research approaches
- Chapter 3, Section 3.2: Agile development phases and module sequencing
- Chapter 3 methodology/evaluation framing: ISO/IEC 25010-oriented evaluation, adviser-approved semantic search test cases, descriptive interpretation, and human review
- Pre-Proposal Project Design: centralized repository, controlled submission/import, metadata/provenance management, administrative validation, role-based access, simulated semantic search, journal/alumni metadata inclusion, Knowledge Graph exploration, descriptive analytics, and citation/metadata support
- MSR / Capstone Manual: proposal-defense prototype expectations, Chapters 1-3 alignment, scope/objectives readiness, and initial system prototype compliance

## Current Feature Alignment

| Prototype page or feature | Current status | Alignment finding | Supported paper section/objective/scope item |
| --- | --- | --- | --- |
| Home page | Implemented | Aligned, but wording should emphasize UA-governed prototype and simulated features. | Chapter 1 Sections 1.4-1.6; Pre-Proposal Project Design |
| Browse Research Records | Implemented | Aligned. Supports repository browsing and metadata discovery with approved filter categories. | Chapter 1 Specific Objective 1; Scope and Delimitation |
| Research Detail Page | Implemented | Aligned. Shows metadata, abstract, citation, provenance, related records, and access labels. Must not imply restricted document access. | Chapter 1 Objectives 1, 3, and citation/metadata support scope |
| Semantic Search Page | Implemented | Partially aligned. Behavior is safe, but page title and copy should say "Simulated Semantic Search" consistently. | Chapter 1 Objective 2; Chapter 3 semantic retrieval test framing |
| Knowledge Graph Page | Implemented | Aligned. Static metadata graph supports paper, author, academic unit, theme, keyword, and related-paper relationships. | Chapter 1 Objective 3; Chapter 2 conceptual framework |
| Analytics Dashboard | Implemented | Aligned. Charts are descriptive only and do not predict trends or evaluate quality. | Chapter 1 Objective 4; Scope analytics delimitation |
| Admin Dashboard | Implemented | Aligned, with clarification needed that status changes are not institutional approvals. | Chapter 1 metadata/provenance/admin validation scope; Chapter 3 module sequencing |
| Submit / Import Research Record | Implemented | Partially aligned. Should be renamed "Submit / Import Metadata" to avoid implying real document or database submission. | Chapter 1 record submission/import scope; prototype-only delimiter |
| Role Demo Page | Implemented | Aligned. Uses Student, Faculty, Repository Manager, and Admin with localStorage simulation. | Chapter 1 role-based access scope; prototype delimiter |
| Sample research dataset | Implemented | Aligned. Contains 34 fictional records with required metadata fields. Should remain clearly sample-only. | Chapter 1 repository and metadata scope |
| Citation copy support | Implemented | Aligned. It is basic citation/metadata support, not automated citation recommendation. | Chapter 1 citation or metadata support scope |
| localStorage state changes | Implemented | Aligned only as prototype simulation. Needs consistent labeling. | Static prototype delimitation and Chapter 3 presentation/testing framing |

## Items To Remove, Rename, Or Clarify

- Rename page/navigation references from "Semantic Search" to "Simulated Semantic Search" where user-facing.
- Rename "Submit Record" / "Submit / Import Research Record" to "Submit / Import Metadata".
- Replace "AI-like discovery" with "simulated semantic discovery".
- Avoid wording that implies real authentication, real database submission, real restricted-document access, real AI model use, or institutional approval.
- Clarify that administrative validation status changes are local prototype demonstrations, not official UA approval.
- Clarify that analytics are descriptive only and based on a temporary sample dataset.
- Clarify that the Knowledge Graph is generated from sample metadata and requires validated inputs in a full system.
- Keep future implementation language bounded to approved scope and avoid promising Google Scholar integration, prediction, originality checking, quality scoring, research-gap determination, or automated citation recommendations.

## Proposed Changes Before Editing

1. Update `AGENTS.md` with stricter capstone-scope rules tied to Chapter 1, Chapter 3, and MSR guidance.
2. Update `README.md` to map the prototype to SULUAN objectives and emphasize proposal-defense demonstration limits.
3. Update `docs/prototype-scope.md`, `docs/demo-script.md`, and `docs/feature-checklist.md` to match approved wording.
4. Revise UI copy in Home, navigation, Semantic Search, Admin Dashboard, Submit page, Role Demo, Knowledge Graph, and Analytics where needed.
5. Keep the existing 34-record fictional dataset because it already includes the required fields and no confidential records.
6. Run `npm run build`, fix any build errors, then commit with `Align prototype with SULUAN capstone scope`.


## Post-Edit Implementation Summary

The proposed alignment changes were applied after this audit was drafted. User-facing labels now use "Simulated Semantic Search" and "Submit / Import Metadata." Notices clarify that semantic results, role switching, validation status changes, metadata submissions, Knowledge Graph relationships, and analytics are prototype simulations based on temporary sample metadata. Sample record titles that suggested scoring or prediction were revised to use review-indicator wording.

## Validation Workflow Visibility Update

Normal discovery views now use validated sample records by default: Browse, Simulated Semantic Search, Knowledge Graph, Analytics, and public record detail pages. Pending Review, Needs Revision, and Rejected records are reserved for the Admin Dashboard validation workflow simulation. The UI defines validation states separately from access status so that access labels do not imply validation and validation labels do not imply real UA approval.
