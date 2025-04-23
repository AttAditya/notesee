"use client";

const TOKEN = "sb-nwchnnvbjmyndfjtklem-auth-token";

export function userLoggedIn() {
  if (typeof window === "undefined") return false;
  const token = localStorage.getItem(TOKEN);
  return token !== null;
}

export function getUser() {
  if (typeof window === "undefined") return null;
  const tokenData = localStorage.getItem(TOKEN);
  if (!tokenData) return null;

  const { user } = JSON.parse(tokenData);
  return user;
}

export function signOut() {
  if (typeof window === "undefined") return;
  localStorage.clear();
  window.location.reload();
}
