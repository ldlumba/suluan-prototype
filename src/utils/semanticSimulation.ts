import { researchRecords } from '../data/researchRecords'
import { semanticScenarios, type SemanticResult } from '../data/semanticScenarios'

const discoverableRecords = researchRecords.filter((record) => record.validationStatus === 'Validated')

export function runSemanticSimulation(query: string): {
  mode: 'scenario' | 'fallback'
  title: string
  explanation: string
  results: SemanticResult[]
} {
  const normalized = query.trim().toLowerCase()

  if (!normalized) {
    const scenario = semanticScenarios[0]
    return { mode: 'scenario', title: scenario.label, explanation: withValidationNote(scenario.explanation), results: toScenarioResults(scenario) }
  }

  const scenario = semanticScenarios.find((item) => item.triggers.some((trigger) => normalized.includes(trigger.toLowerCase())))

  if (scenario) {
    return { mode: 'scenario', title: scenario.label, explanation: withValidationNote(scenario.explanation), results: toScenarioResults(scenario) }
  }

  const tokens = normalized.split(/\s+/).map((token) => token.trim()).filter((token) => token.length > 2)
  const scored = discoverableRecords
    .map((record) => {
      const haystack = [record.title, record.abstract, record.researchTheme, record.department, record.program, record.keywords.join(' ')].join(' ').toLowerCase()
      const score = tokens.reduce((sum, token) => sum + (haystack.includes(token) ? 1 : 0), 0)
      return { record, score }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)

  return {
    mode: 'fallback',
    title: 'Keyword and theme fallback',
    explanation: 'No predefined semantic scenario matched closely, so this prototype falls back to simple keyword and theme matching across validated sample records only.',
    results: scored.map(({ record, score }) => ({
      record,
      reason: `Matched ${score} query term${score === 1 ? '' : 's'} across title, abstract, theme, academic unit, or keywords.`,
    })),
  }
}

function toScenarioResults(scenario: (typeof semanticScenarios)[number]) {
  return scenario.recordIds
    .map((recordId) => discoverableRecords.find((record) => record.id === recordId))
    .filter((record) => Boolean(record))
    .map((record) => ({ record: record!, reason: scenario.resultReasons[record!.id] ?? 'Included by a predefined prototype semantic scenario.' }))
}

function withValidationNote(explanation: string) {
  return `${explanation} Only validated sample records are included in normal semantic discovery.`
}
