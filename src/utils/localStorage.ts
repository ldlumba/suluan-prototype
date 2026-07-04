import type { ResearchRecord, ValidationStatus } from '../data/researchRecords'
import { defaultRole, prototypeRoles, type PrototypeRole } from '../data/users'

const ROLE_KEY = 'suluan:selectedRole'
const SUBMITTED_RECORDS_KEY = 'suluan:submittedRecords'
const STATUS_OVERRIDES_KEY = 'suluan:statusOverrides'
const SIMULATED_SESSION_KEY = 'suluan:simulatedSession'
const ACCOUNT_REQUEST_KEY = 'suluan:accountRequest'
const SIDEBAR_COLLAPSED_KEY = 'suluan:sidebarCollapsed'

function readJson<T>(key: string, fallback: T): T {
  try {
    const value = window.localStorage.getItem(key)
    return value ? (JSON.parse(value) as T) : fallback
  } catch {
    return fallback
  }
}

function writeJson<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function getStoredRole(): PrototypeRole {
  const role = window.localStorage.getItem(ROLE_KEY) as PrototypeRole | null
  return role && prototypeRoles.includes(role) ? role : defaultRole
}

export function setStoredRole(role: PrototypeRole) {
  window.localStorage.setItem(ROLE_KEY, role)
}

export function getSubmittedRecords() {
  return readJson<ResearchRecord[]>(SUBMITTED_RECORDS_KEY, [])
}

export function saveSubmittedRecord(record: ResearchRecord) {
  writeJson(SUBMITTED_RECORDS_KEY, [record, ...getSubmittedRecords()])
}

export function getStatusOverrides() {
  return readJson<Record<string, ValidationStatus>>(STATUS_OVERRIDES_KEY, {})
}

export function setStatusOverride(recordId: string, status: ValidationStatus) {
  writeJson(STATUS_OVERRIDES_KEY, { ...getStatusOverrides(), [recordId]: status })
}

export function applyStatusOverrides(records: ResearchRecord[]) {
  const overrides = getStatusOverrides()
  return records.map((record) => ({ ...record, validationStatus: overrides[record.id] ?? record.validationStatus }))
}

export type SimulatedSession = {
  emailOrUaId: string
  role: PrototypeRole
  signedInAt: string
}

export type AccountRequest = {
  fullName: string
  emailOrUaId: string
  userType: 'Student' | 'Faculty' | 'Research Coordinator'
  requestedAt: string
}

export function getSimulatedSession() {
  return readJson<SimulatedSession | null>(SIMULATED_SESSION_KEY, null)
}

export function setSimulatedSession(session: SimulatedSession) {
  writeJson(SIMULATED_SESSION_KEY, session)
  window.dispatchEvent(new Event('suluan-session-change'))
}

export function clearSimulatedSession() {
  window.localStorage.removeItem(SIMULATED_SESSION_KEY)
  window.dispatchEvent(new Event('suluan-session-change'))
}

export function saveAccountRequest(request: AccountRequest) {
  writeJson(ACCOUNT_REQUEST_KEY, request)
}

export function getSidebarCollapsed() {
  return window.localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === 'true'
}

export function setSidebarCollapsed(collapsed: boolean) {
  window.localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(collapsed))
}
