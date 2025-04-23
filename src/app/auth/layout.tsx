"use client";

import { useEffect } from "react";
import { userLoggedIn } from "@/utils/auth";

export default function DashboardLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    if (userLoggedIn()) window.location.href = "/dashboard";
  }, []);

  return (
    <>
      {children}
    </>
  );
}
