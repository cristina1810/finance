// src/components/TagDetailWrapper.jsx
import React from "react";
import { UserProvider } from "../context/UserContext";
import TagDetail from "./TagDetail";

export default function TagDetailWrapper({ tagId }) {
  return (
    <UserProvider>
      <TagDetail tagId={tagId} />
    </UserProvider>
  );
}
