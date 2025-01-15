import { useAuth } from '../hooks/useAuth';
import AdminLogin from '../components/admin/AdminLogin';
import AdminPanel from '../components/admin/AdminPanel';

export default function AdminRoute() {
  const { user } = useAuth();

  if (!user) {
    return <AdminLogin />;
  }

  return <AdminPanel />;
}