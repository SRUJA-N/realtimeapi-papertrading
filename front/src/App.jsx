// ------------------------------
// ROUTER IMPORTS
// ------------------------------
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // React Router for page navigation
import AuthPage from './pages/AuthPage.jsx';       // Login/Signup page
import Dashboard from './pages/Dashboard.jsx';     // Main dashboard after login
import ProtectedRoute from './ProtectedRoute.jsx'; // Wrapper for routes that require authentication

// ------------------------------
// MAIN APP COMPONENT
// ------------------------------
function App() {
  return (
    // Router wraps the app to enable routing
    <Router>
      {/* Routes define the paths and their corresponding components */}
      <Routes>

        {/* Public route: login/signup page */}
        <Route path="/" element={<AuthPage />} />

        {/* Protected routes: require user to be authenticated */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

      </Routes>
    </Router>
  );
}

// Export App component as default
export default App;
