import type { ResearchRecord } from './researchRecords'

export type SemanticScenario = {
  id: string
  label: string
  triggers: string[]
  recordIds: string[]
  explanation: string
  resultReasons: Record<string, string>
}

export const semanticScenarios: SemanticScenario[] = [
  {
    id: 'learning-support',
    label: 'Learning support and student performance',
    triggers: ['learning support', 'student performance', 'feedback', 'quiz', 'rubric', 'academic confidence'],
    recordIds: ['UA-R-2022-006', 'UA-R-2023-017', 'UA-R-2024-023', 'UA-R-2021-001'],
    explanation: 'Groups studies about feedback, assessment transparency, review behavior, and academic confidence.',
    resultReasons: {
      'UA-R-2022-006': 'Connects teacher feedback timing with revision quality in online classes.',
      'UA-R-2023-017': 'Discusses formative quiz design and review behavior in general education.',
      'UA-R-2024-023': 'Matches assessment transparency and self-assessment concepts.',
      'UA-R-2021-001': 'Provides related context on digital reading and academic confidence.',
    },
  },
  {
    id: 'campus-services',
    label: 'Campus service digitization',
    triggers: ['campus service', 'queue', 'help desk', 'office transaction', 'service time', 'digital transformation'],
    recordIds: ['UA-R-2022-005', 'UA-R-2023-013', 'UA-R-2025-031', 'UA-R-2023-012'],
    explanation: 'Connects capstones and service studies about office workflows, routing, and campus visitor support.',
    resultReasons: {
      'UA-R-2022-005': 'Directly addresses mobile queueing for campus offices.',
      'UA-R-2023-013': 'Shows a rule-based support concern classifier for student services.',
      'UA-R-2025-031': 'Adds service time indicators for office transactions.',
      'UA-R-2023-012': 'Provides a service quality angle through campus wayfinding needs.',
    },
  },
  {
    id: 'repository-governance',
    label: 'Research repository governance',
    triggers: ['repository', 'metadata', 'validation', 'research office', 'provenance', 'submission review'],
    recordIds: ['UA-R-2024-021', 'UA-R-2024-022', 'UA-R-2024-028', 'UA-R-2025-030'],
    explanation: 'Highlights records about metadata quality, review workflows, abstract clarity, and research discovery.',
    resultReasons: {
      'UA-R-2024-021': 'Defines metadata quality dimensions for institutional repositories.',
      'UA-R-2024-022': 'Maps submission review steps and handoffs.',
      'UA-R-2024-028': 'Adds manuscript abstract clarity review indicators.',
      'UA-R-2025-030': 'Directly evaluates the SULUAN-style discovery concept.',
    },
  },
  {
    id: 'community-risk',
    label: 'Community risk communication',
    triggers: ['disaster', 'emergency', 'preparedness', 'heat index', 'risk communication', 'advisory'],
    recordIds: ['UA-R-2021-002', 'UA-R-2022-009', 'UA-R-2025-033', 'UA-R-2024-020'],
    explanation: 'Surfaces records about preparedness, advisories, public information, and environmental communication.',
    resultReasons: {
      'UA-R-2021-002': 'Covers community disaster preparedness mapping.',
      'UA-R-2022-009': 'Focuses on emergency advisory communication channels.',
      'UA-R-2025-033': 'Matches heat index preparedness messaging.',
      'UA-R-2024-020': 'Adds campus environmental compliance communication.',
    },
  },
  {
    id: 'student-wellbeing',
    label: 'Student well-being and support',
    triggers: ['well-being', 'wellbeing', 'stress', 'belonging', 'peer support', 'student support', 'budget'],
    recordIds: ['UA-R-2021-004', 'UA-R-2023-016', 'UA-R-2024-029', 'UA-R-2025-035'],
    explanation: 'Clusters studies about belonging, stress, support awareness, and student financial pressure.',
    resultReasons: {
      'UA-R-2021-004': 'Introduces wellness check-in patterns during modular learning.',
      'UA-R-2023-016': 'Links peer support circles with student belonging.',
      'UA-R-2024-029': 'Addresses budget stress and support awareness.',
      'UA-R-2025-035': 'Explores savings support for academic expenses.',
    },
  },
]

export type SemanticResult = {
  record: ResearchRecord
  reason: string
}
