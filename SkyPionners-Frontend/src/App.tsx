import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ForecastPage from './pages/ForecastPage';
import AboutPage from './pages/AboutPage';
import Visualization3DPage from './pages/3DVisualizationPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import IndividualDashboard from './components/dashboard/IndividualDashboard';
import HospitalDashboardPage from './pages/dashboard/HospitalDashboardPage';
import TempoDashboardPage from './pages/dashboard/TempoDashboardPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forecast" element={<ForecastPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/3d" element={<Visualization3DPage />} />

        {/* Routes protégées avec layout de dashboard */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<IndividualDashboard />} />
            <Route path="hospital" element={<HospitalDashboardPage />} />
            <Route path="tempo" element={<TempoDashboardPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
