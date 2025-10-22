import { UserProvider } from '../context/UserContext.jsx';
import AccountForm from './AccountForm.jsx';

export default function AccountFormWrapper() {
  return (
    <UserProvider>
      <AccountForm />
    </UserProvider>
  );
}
