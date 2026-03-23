import { useAuth } from '@/hooks/useAuth';
import AuthPage from '@/components/AuthPage';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const { user, login, logout } = useAuth();

  if (!user) {
    return <AuthPage onLogin={login} />;
  }

  return <Dashboard user={user} onLogout={logout} />;
};

export default Index;
