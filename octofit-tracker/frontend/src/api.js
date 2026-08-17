/**
 * Environment variable VITE_CODESPACE_NAME must be defined for production builds.
 * For local development, the API will fall back to http://localhost:8000
 *
 * To use in GitHub Codespaces, add to .env.local:
 * VITE_CODESPACE_NAME=your-codespace-name
 */
const codespaceName = (import.meta.env.VITE_CODESPACE_NAME || '').trim();

export function getApiBaseUrl() {
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}

export function getApiUrl(path) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}

export async function fetchJson(path) {
  const response = await fetch(getApiUrl(path));

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}
