import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../services/api.js'

function ManulsPage() {
  const [manuls, setManuls] = useState([])
  const [sortBy, setSortBy] = useState('createdAt')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadManuls = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await apiFetch(`/manuls?sortBy=${sortBy}&order=desc&page=1&limit=20`)
        setManuls(data.items || data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadManuls()
  }, [sortBy])

  if (loading) return <div className="container"><p>Loading…</p></div>
  if (error) return <div className="container"><p>Error: {error}</p></div>

  return (
    <div className="container">
      <h1>Manuls</h1>
      <div className="formRow">
        <label className="label">Sort by</label>
        <select className="input" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="createdAt">Newest</option>
          <option value="likesCount">Likes</option>
          <option value="favoritesCount">Favorites</option>
          <option value="name">Name</option>
        </select>
      </div>
      <div className="cardGrid">
        {manuls.map((m) => (
          <div key={m.id} className="card">
            <img className="cardImage" src={m.photoUrl} alt={m.name} />
            <h3>{m.name}</h3>
            <p>{m.shortDescription}</p>
            <Link className="button" to={`/manuls/${m.id}`}>Open</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ManulsPage
