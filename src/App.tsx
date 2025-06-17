import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Roadmap from "./pages/Roadmap";
import BudgetActual from "./pages/BudgetActual";
import Support from "./pages/Support";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Setup from "./pages/Setup";

// 認証が必要なページをラップするコンポーネント
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/mietoru/login" replace />;
  }

  if (!user.isSetupComplete) {
    return <Navigate to="/mietoru/setup" replace />;
  }

  return <>{children}</>;
};

// メインアプリケーションコンポーネント
const AppContent: React.FC = () => {
  return (
    <Routes>
      {/* ログイン画面 */}
      <Route path="/mietoru/login" element={<Login />} />

      {/* 初期設定画面 */}
      <Route path="/mietoru/setup" element={<Setup />} />

      {/* 認証が必要なページ */}
      <Route
        path="/mietoru"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/mietoru/roadmap"
        element={
          <ProtectedRoute>
            <Layout>
              <Roadmap />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/mietoru/budget-actual"
        element={
          <ProtectedRoute>
            <Layout>
              <BudgetActual />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/mietoru/support"
        element={
          <ProtectedRoute>
            <Layout>
              <Support />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/mietoru/settings"
        element={
          <ProtectedRoute>
            <Layout>
              <Settings />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* デフォルトリダイレクト */}
      <Route path="/" element={<Navigate to="/mietoru/login" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
