// Minimal API client wrapper to centralize backend calls.
export const apiClient = {
  get: async (path: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}${path}`);
    return res.json();
  },
};
