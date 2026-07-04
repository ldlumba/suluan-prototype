import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { AppLayout } from './components/layout/AppLayout'
import { AdminDashboardPage } from './pages/AdminDashboardPage'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { BrowsePage } from './pages/BrowsePage'
import { CreateAccountPage } from './pages/CreateAccountPage'
import { HomePage } from './pages/HomePage'
import { KnowledgeGraphPage } from './pages/KnowledgeGraphPage'
import { LoginPage } from './pages/LoginPage'
import { ResearchDetailPage } from './pages/ResearchDetailPage'
import { RoleDemoPage } from './pages/RoleDemoPage'
import { SemanticSearchPage } from './pages/SemanticSearchPage'
import { SubmitRecordPage } from './pages/SubmitRecordPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="browse" element={<BrowsePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="create-account" element={<CreateAccountPage />} />
          <Route path="records/:recordId" element={<ResearchDetailPage />} />
          <Route path="semantic-search" element={<SemanticSearchPage />} />
          <Route path="knowledge-graph" element={<KnowledgeGraphPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="admin" element={<AdminDashboardPage />} />
          <Route path="submit" element={<SubmitRecordPage />} />
          <Route path="roles" element={<RoleDemoPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
