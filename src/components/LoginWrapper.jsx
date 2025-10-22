import { UserProvider } from '../context/UserContext.jsx';
import Login from './Login.jsx';

export default function LoginWrapper() {
  return (
    <UserProvider>
      <Login />
    </UserProvider>
  );
}
