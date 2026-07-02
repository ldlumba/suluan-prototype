import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { ChartFrame } from '../components/analytics/ChartFrame'
import { PageHeader } from '../components/common/PageHeader'
import { SimulationNotice } from '../components/common/SimulationNotice'
import { ValidationStatusGuide } from '../components/common/ValidationStatusGuide'
import { researchRecords } from '../data/researchRecords'
import { countBy } from '../utils/filters'
import { applyStatusOverrides, getSubmittedRecords } from '../utils/localStorage'

const colors = ['#063b82', '#0b5cad', '#c81e2a', '#f4c430', '#5b6472', '#8b1e3f']

function toChartData(counts: Record<string, number>) {
  return Object.entries(counts).map(([name, value]) => ({ name, value }))
}

export function AnalyticsPage() {
  const allRecords = applyStatusOverrides([...getSubmittedRecords(), ...researchRecords])
  const records = allRecords.filter((record) => record.validationStatus === 'Validated')
  const byDepartment = toChartData(countBy(records.map((record) => record.department)))
  const byYear = toChartData(countBy(records.map((record) => record.year))).sort((a, b) => Number(a.name) - Number(b.name))
  const byTheme = toChartData(countBy(records.map((record) => record.researchTheme))).sort((a, b) => b.value - a.value).slice(0, 8)
  const byValidation = toChartData(countBy(records.map((record) => record.validationStatus)))
  const byAccess = toChartData(countBy(records.map((record) => record.accessStatus)))

  return (
    <div>
      <PageHeader eyebrow="Prototype analytics" title="Analytics Dashboard" description="Charts summarize validated fictional sample metadata using descriptive analytics only." />
      <SimulationNotice>Analytics use validated sample records only by default. Pending, revision, and rejected sample metadata remain in the Admin Dashboard for validation workflow demonstration.</SimulationNotice>
      <div className="mt-5"><ValidationStatusGuide /></div>
      <section className="mt-5 grid gap-5 xl:grid-cols-2">
        <ChartFrame title="Validated papers by academic unit"><ResponsiveContainer><BarChart data={byDepartment} layout="vertical" margin={{ left: 24, right: 16 }}><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" allowDecimals={false} /><YAxis type="category" dataKey="name" width={170} tick={{ fontSize: 11 }} /><Tooltip /><Bar dataKey="value" fill="#063b82" radius={[0, 4, 4, 0]} /></BarChart></ResponsiveContainer></ChartFrame>
        <ChartFrame title="Validated papers by year"><ResponsiveContainer><LineChart data={byYear}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis allowDecimals={false} /><Tooltip /><Line type="monotone" dataKey="value" stroke="#0b5cad" strokeWidth={3} dot={{ r: 4 }} /></LineChart></ResponsiveContainer></ChartFrame>
        <ChartFrame title="Top themes in validated records"><ResponsiveContainer><BarChart data={byTheme}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-15} textAnchor="end" height={70} /><YAxis allowDecimals={false} /><Tooltip /><Bar dataKey="value" fill="#b88a1d" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></ChartFrame>
        <ChartFrame title="Validation status in discovery set"><ResponsiveContainer><PieChart><Pie data={byValidation} dataKey="value" nameKey="name" outerRadius={92} label>{byValidation.map((entry, index) => <Cell key={entry.name} fill={colors[index % colors.length]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></ChartFrame>
        <ChartFrame title="Access status distribution"><ResponsiveContainer><PieChart><Pie data={byAccess} dataKey="value" nameKey="name" innerRadius={50} outerRadius={92} label>{byAccess.map((entry, index) => <Cell key={entry.name} fill={colors[index % colors.length]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></ChartFrame>
      </section>
    </div>
  )
}
