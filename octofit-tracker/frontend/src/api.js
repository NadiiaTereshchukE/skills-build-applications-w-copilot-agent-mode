const codeSpaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const forwardedCodeSpaceName = window.location.hostname.match(/^(.+)-5173\.app\.github\.dev$/)?.[1]
const resolvedCodeSpaceName = codeSpaceName || forwardedCodeSpaceName
export const apiBaseUrl = resolvedCodeSpaceName
  ? `https://${resolvedCodeSpaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function responseItems(payload, resource) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []
  if (Array.isArray(payload[resource])) return payload[resource]
  for (const key of ['data', 'results', 'items', 'docs']) {
    if (Array.isArray(payload[key])) return payload[key]
    const nestedItems = responseItems(payload[key], resource)
    if (nestedItems.length) return nestedItems
  }
  return []
}

export async function getResource(resource, endpoint = `${apiBaseUrl}/${resource}/`) {
  const response = await fetch(endpoint)
  if (!response.ok) throw new Error(`Request failed (${response.status})`)
  return responseItems(await response.json(), resource)
}