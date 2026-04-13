import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import MainLayout from './components/MainLayout'
import ActivitiesPage from './pages/ActivitiesPage'
import RecommendationsPage from './pages/RecommendationsPage'
import ProfilePage from './pages/ProfilePage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* La página de Login es pública */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Ruta "padre" protegida que usa el MainLayout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* Rutas "hijas" que se renderizarán dentro del <Outlet> de MainLayout */}
          <Route index element={<DashboardPage />} />
          <Route path="activities" element={<ActivitiesPage />} />
          <Route path="recommendations" element={<RecommendationsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
