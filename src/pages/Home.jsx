import { useEffect, useState } from 'react'
import { getMe } from '../api/user'
import { useNavigate } from 'react-router'
import useAuthStore from '../store/auth.store'

function Home() {
  const navigate = useNavigate()
  const token = useAuthStore(state => state.token)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }

    getMe(token)
      .then(res => {
        setUser(res.data.user)
        setLoading(false)
      })
      .catch(err => {
        console.error('API /me error:', err)
        setError('Failed to load user data')
        setLoading(false)
      })
  }, [navigate, token])

  if (loading) return <div className="text-center mt-10 text-blue-500">Loading...</div>
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>
  if (!user) return <div className="text-center mt-10 text-red-500">No user data found</div>

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">
        👋 Welcome, {user.firstName} {user.lastName}
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-4 border border-gray-200">
        <div className="flex items-center space-x-4">
          <img
            src={user.profileImage || 'https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg'}
            alt="Profile"
            className="w-20 h-20 rounded-full border border-gray-300"
          />
          <div>
            <p className="text-xl font-semibold">{user.firstName} {user.lastName}</p>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div><span className="font-medium">Position:</span> {user.position || '-'}</div>
          <div><span className="font-medium">Department:</span> {user.department || '-'}</div>
          <div><span className="font-medium">Mobile:</span> {user.mobile || '-'}</div>
          <div>
            <span className="font-medium">Start Date:</span>{' '}
            {new Date(user.startDate).toLocaleDateString('en-GB')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
