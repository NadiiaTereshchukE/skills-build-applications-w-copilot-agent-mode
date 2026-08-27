import { useEffect, useState } from 'react'
import { getResource } from '../api.js'

export default function ResourceTable({ resource, title, description, columns }) {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getResource(resource).then(setItems).catch((requestError) => setError(requestError.message))
  }, [resource])

  return <section>
    <div className="page-heading"><div><p className="eyebrow">Octofit / {resource}</p><h1>{title}</h1><p className="subtitle">{description}</p></div><span className="count-badge">{items.length} records</span></div>
    {!apiConfigured() && <div className="alert alert-warning">Add <code>VITE_CODESPACE_NAME</code> to <code>.env.local</code> to connect this dashboard.</div>}
    {error && <div className="alert alert-danger">{error}</div>}
    <div className="table-responsive data-panel"><table className="table align-middle mb-0"><thead><tr>{columns.map(([key, label]) => <th key={key}>{label}</th>)}</tr></thead><tbody>
      {items.length ? items.map((item, index) => <tr key={item._id || item.id || index}>{columns.map(([key]) => <td key={key}>{String(item[key] ?? '—')}</td>)}</tr>) : <tr><td colSpan={columns.length} className="empty-state">No records available.</td></tr>}
    </tbody></table></div>
  </section>
}

function apiConfigured() { return Boolean(import.meta.env.VITE_CODESPACE_NAME?.trim()) }