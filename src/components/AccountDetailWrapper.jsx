// src/components/AccountDetailWrapper.jsx
import React, { useState } from "react";
import AccountDetail from "./AccountDetail.jsx";
export default function AccountDetailWrapper({ accountId }) {
  const [showAccount, setShowAccount] = useState(true);
  if (!showAccount) return null;
  return (
    <AccountDetail
      accountId={accountId}
      closePage={() => setShowAccount(false)}
    />
  );
}
