// Auth is not yet implemented on the server.
// This stub keeps the type contract so pages that import useAuth compile cleanly.

interface AuthUser {
  name?: string | null;
  email?: string | null;
}

export function useAuth(_options?: { redirectOnUnauthenticated?: boolean; redirectPath?: string }) {
  return {
    user: null as AuthUser | null,
    loading: false,
    error: null as Error | null,
    isAuthenticated: false,
    refresh: () => {},
    logout: async () => {},
  };
}
