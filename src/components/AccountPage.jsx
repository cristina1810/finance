// src/components/AccountPage.jsx
import React from "react";
import { UserProvider } from "../context/UserContext.jsx";
import AccountDetailWrapper from "./AccountDetailWrapper.jsx";

export default function AccountPage({ accountId }) {
  return (
    <UserProvider>
      <AccountDetailWrapper accountId={accountId} />
    </UserProvider>
  );
}
