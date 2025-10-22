import { UserProvider } from '../context/UserContext.jsx';
import Dashboard from './Dashboard.jsx';

export default function DashboardWrapper() {
  return (
    <UserProvider>
      <Dashboard />
    </UserProvider>
  );
}
