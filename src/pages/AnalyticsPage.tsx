import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { ChartFrame } from '../components/analytics/ChartFrame'
import { PageHeader } from '../components/common/PageHeader'
import { SimulationNotice } from '../components/common/SimulationNotice'
import { researchRecords } from '../data/researchRecords'
import { countBy } from '../utils/filters'
import { applyStatusOverrides, getSubmittedRecords } from '../utils/localStorage'

const colors = ['#1f6f5b', '#28536b', '#b88a1d', '#7c3f58', '#4f6f2f', '#a4463a']

function toChartData(counts: Record<string, number>) {
  return Object.entries(counts).map(([name, value]) => ({ name, value }))
}

export function AnalyticsPage() {
  const records = applyStatusOverrides([...getSubmittedRecords(), ...researchRecords])
  const byDepartment = toChartData(countBy(records.map((record) => record.department)))
  const byYear = toChartData(countBy(records.map((record) => record.year))).sort((a, b) => Number(a.name) - Number(b.name))
  const byTheme = toChartData(countBy(records.map((record) => record.researchTheme))).sort((a, b) => b.value - a.value).slice(0, 8)
  const byValidation = toChartData(countBy(records.map((record) => record.validationStatus)))
  const byAccess = toChartData(countBy(records.map((record) => record.accessStatus)))

  return (
    <div>
      <PageHeader eyebrow="Prototype analytics" title="Analytics Dashboard" description="Charts summarize fictional sample metadata and browser-local prototype submissions." />
      <SimulationNotice>Analytics are based on prototype sample data only. They do not represent official university repository statistics.</SimulationNotice>
      <section className="mt-5 grid gap-5 xl:grid-cols-2">
        <ChartFrame title="Papers by department"><ResponsiveContainer><BarChart data={byDepartment} layout="vertical" margin={{ left: 24, right: 16 }}><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" allowDecimals={false} /><YAxis type="category" dataKey="name" width={170} tick={{ fontSize: 11 }} /><Tooltip /><Bar dataKey="value" fill="#1f6f5b" radius={[0, 4, 4, 0]} /></BarChart></ResponsiveContainer></ChartFrame>
        <ChartFrame title="Papers by year"><ResponsiveContainer><LineChart data={byYear}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis allowDecimals={false} /><Tooltip /><Line type="monotone" dataKey="value" stroke="#28536b" strokeWidth={3} dot={{ r: 4 }} /></LineChart></ResponsiveContainer></ChartFrame>
        <ChartFrame title="Top themes"><ResponsiveContainer><BarChart data={byTheme}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-15} textAnchor="end" height={70} /><YAxis allowDecimals={false} /><Tooltip /><Bar dataKey="value" fill="#b88a1d" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></ChartFrame>
        <ChartFrame title="Validation status distribution"><ResponsiveContainer><PieChart><Pie data={byValidation} dataKey="value" nameKey="name" outerRadius={92} label>{byValidation.map((entry, index) => <Cell key={entry.name} fill={colors[index % colors.length]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></ChartFrame>
        <ChartFrame title="Access status distribution"><ResponsiveContainer><PieChart><Pie data={byAccess} dataKey="value" nameKey="name" innerRadius={50} outerRadius={92} label>{byAccess.map((entry, index) => <Cell key={entry.name} fill={colors[index % colors.length]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></ChartFrame>
      </section>
    </div>
  )
}
