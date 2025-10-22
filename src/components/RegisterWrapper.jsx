import { UserProvider } from "../context/UserContext.jsx";
import Register from "./Register.jsx";

export default function RegisterWrapper() {
  return (
    <UserProvider>
      <Register />
    </UserProvider>
  );
}
