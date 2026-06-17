import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'
import { apiFetch } from '../services/api.js'

function ManulDetailsPage() {
  const { id } = useParams()
  const { currentUser } = useContext(AuthContext)
  const [manul, setManul] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [liked, setLiked] = useState(false)
  const [suggestionText, setSuggestionText] = useState('')

  useEffect(() => {
    const loadManul = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await apiFetch(`/manuls/${id}`)
        setManul(data)
        setLiked(false)
      } catch (e) {
        setError(e?.message || 'Failed to load manul')
        setManul(null)
      } finally {
        setLoading(false)
      }
    }
    loadManul()
  }, [id])

  const handleLike = async () => {
    if (!currentUser) return alert('Login required')
    if (!manul || liked) return

    try {
      await apiFetch('/suggestions', {
        method: 'POST',
        body: JSON.stringify({ manulId: manul.id, type: 'LIKE' }),
      })
      setManul((prev) => ({ ...prev, likesCount: prev.likesCount + 1 }))
      setLiked(true)
    } catch (e) {
      alert(e.message || 'Like failed')
    }
  }

  const handleSuggestionSubmit = async (event) => {
    event.preventDefault()
    if (!currentUser) return alert('Login required')

    try {
      await apiFetch('/suggestions', {
        method: 'POST',
        body: JSON.stringify({ manulId: id, type: 'STORY', content: suggestionText, status: 'PENDING' }),
      })
      setSuggestionText('')
      alert('Suggestion sent')
    } catch (e) {
      alert(e.message || 'Suggestion failed')
    }
  }

  return (
    <div className="container">
      {loading && <p>Loading…</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && manul && (
        <>
          <h1>{manul.name}</h1>
          <div className="details">
            <img className="detailsImage" src={manul.photoUrl} alt={manul.name} />
            <div className="detailsBody">
              <p>{manul.longStory}</p>
              <div className="likeRow">
                <span className="likeBadge" title="Likes">{manul.likesCount}</span>
                <button className={`button likeButton ${liked ? 'likeButtonActive' : ''}`} type="button" onClick={handleLike}>{liked ? '♥' : '♡'}</button>
              </div>
            </div>
          </div>
          <h2>Suggest a story</h2>
          <form className="form" onSubmit={handleSuggestionSubmit}>
            <div className="formRow">
              <label className="label">Your story</label>
              <textarea className="input" value={suggestionText} onChange={(e) => setSuggestionText(e.target.value)} required />
            </div>
            <button className="button" type="submit">Submit suggestion</button>
          </form>
        </>
      )}
    </div>
  )
}

export default ManulDetailsPage
