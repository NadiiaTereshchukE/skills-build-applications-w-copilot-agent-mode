const codeSpaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
export const apiBaseUrl = codeSpaceName
  ? `https://${codeSpaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function responseItems(payload, resource) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []
  if (Array.isArray(payload[resource])) return payload[resource]
  for (const key of ['data', 'results', 'items', 'docs']) {
    if (Array.isArray(payload[key])) return payload[key]
  }
  return []
}

export async function getResource(resource) {
  const response = await fetch(`${apiBaseUrl}/${resource}/`)
  if (!response.ok) throw new Error(`Request failed (${response.status})`)
  return responseItems(await response.json(), resource)
}