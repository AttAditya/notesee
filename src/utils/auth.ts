"use client";

const TOKEN = "sb-nwchnnvbjmyndfjtklem-auth-token";

export function userLoggedIn() {
  const token = localStorage.getItem(TOKEN);
  return token !== null;
}

export function getUser() {
  const tokenData = localStorage.getItem(TOKEN);
  if (!tokenData) return null;

  const { user } = JSON.parse(tokenData);
  return user;
}

export function signOut() {
  localStorage.clear();
  window.location.reload();
}
