import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { Field, SelectInput, TextInput } from '../components/common/FormControls'
import { PageHeader } from '../components/common/PageHeader'
import { SimulationNotice } from '../components/common/SimulationNotice'
import { saveAccountRequest, type AccountRequest } from '../utils/localStorage'

type RequestableUserType = AccountRequest['userType']

const userTypes: RequestableUserType[] = ['Student', 'Faculty', 'Research Coordinator']

export function CreateAccountPage() {
  const [fullName, setFullName] = useState('')
  const [emailOrUaId, setEmailOrUaId] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [userType, setUserType] = useState<RequestableUserType>('Student')
  const [message, setMessage] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!fullName.trim() || !emailOrUaId.trim() || !password || !confirmPassword) {
      setMessage('Complete all fields to demonstrate the account request flow.')
      return
    }

    if (password !== confirmPassword) {
      setMessage('Password and confirm password must match for the interface demonstration.')
      return
    }

    saveAccountRequest({
      fullName: fullName.trim(),
      emailOrUaId: emailOrUaId.trim(),
      userType,
      requestedAt: new Date().toISOString(),
    })

    setPassword('')
    setConfirmPassword('')
    setMessage('Prototype only: account request captured for interface demonstration. No real account was created.')
  }

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader eyebrow="Account request simulation" title="Create Account" description="A normal-looking public account request flow for proposal demonstration only." />
      <SimulationNotice>Account creation is simulated with localStorage for harmless request metadata only. Passwords are not stored, and no real account database is used.</SimulationNotice>

      <section className="mt-5 rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Field label="Full Name">
            <TextInput value={fullName} onChange={(event) => setFullName(event.target.value)} autoComplete="name" placeholder="Full name" />
          </Field>
          <Field label="Email or UA ID">
            <TextInput value={emailOrUaId} onChange={(event) => setEmailOrUaId(event.target.value)} autoComplete="username" placeholder="example@ua.edu.ph or UA ID" />
          </Field>
          <Field label="Password">
            <TextInput value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="new-password" placeholder="Password" />
          </Field>
          <Field label="Confirm Password">
            <TextInput value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} type="password" autoComplete="new-password" placeholder="Confirm password" />
          </Field>
          <Field label="User Type">
            <SelectInput value={userType} onChange={(event) => setUserType(event.target.value as RequestableUserType)}>
              {userTypes.map((type) => <option key={type} value={type}>{type}</option>)}
            </SelectInput>
          </Field>

          <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm leading-6 text-amber-950">
            Admin and Repository Manager access are assigned by authorized university personnel and are not available through public registration.
          </p>

          {message ? <p className="rounded-lg border border-[#c7d8f5] bg-[#edf4ff] px-3 py-2 text-sm leading-6 text-[#002D72]">{message}</p> : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button type="submit" className="inline-flex items-center justify-center rounded-lg bg-[#0038A8] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#002D72]">
              Create Account
            </button>
            <Link to="/login" className="text-sm font-bold text-[#0038A8] hover:text-[#002D72]">Already have an account? Sign in</Link>
          </div>
        </form>
      </section>
    </div>
  )
}
