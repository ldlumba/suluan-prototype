import { LogIn } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { Field, TextInput } from '../components/common/FormControls'
import { PageHeader } from '../components/common/PageHeader'
import { SimulationNotice } from '../components/common/SimulationNotice'
import { getStoredRole, setSimulatedSession } from '../utils/localStorage'

export function LoginPage() {
  const [emailOrUaId, setEmailOrUaId] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedEmail = emailOrUaId.trim()

    if (!trimmedEmail || !password) {
      setMessage('Enter an email or UA ID and password to continue the interface demonstration.')
      return
    }

    const role = getStoredRole()
    setSimulatedSession({ emailOrUaId: trimmedEmail, role, signedInAt: new Date().toISOString() })
    setPassword('')
    setMessage(`Prototype session started as ${role}. No real authentication was performed.`)
  }

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader eyebrow="Account simulation" title="Sign in to SULUAN" description="Use this mock sign-in page to demonstrate the intended account entry point without real authentication or credential storage." />
      <SimulationNotice>Prototype simulation: sign-in is for interface demonstration only. No real authentication or account database is used.</SimulationNotice>

      <section className="mt-5 rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-2xl font-black text-stone-950">SULUAN</p>
          <p className="mt-1 text-sm font-semibold text-stone-500">AI-Assisted Institutional Research Intelligence Platform</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Field label="Email or UA ID">
            <TextInput value={emailOrUaId} onChange={(event) => setEmailOrUaId(event.target.value)} autoComplete="username" placeholder="example@ua.edu.ph or UA ID" />
          </Field>
          <Field label="Password">
            <TextInput value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="current-password" placeholder="Password" />
          </Field>

          {message ? <p className="rounded-lg border border-[#c7d8f5] bg-[#edf4ff] px-3 py-2 text-sm leading-6 text-[#002D72]">{message}</p> : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0038A8] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#002D72]">
              <LogIn className="h-4 w-4" aria-hidden="true" />
              Sign In
            </button>
            <Link to="/create-account" className="text-sm font-bold text-[#0038A8] hover:text-[#002D72]">Create Account</Link>
          </div>
        </form>
      </section>
    </div>
  )
}
