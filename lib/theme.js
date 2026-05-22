// Plain (non-"use client") module so the key can be shared by both the client
// ThemeProvider and the server-rendered ThemeScript. Importing a value across a
// client/server boundary yields a reference proxy, not the value — keeping this
// constant framework-agnostic avoids that pitfall.
export const THEME_STORAGE_KEY = "ai-studio-theme";
