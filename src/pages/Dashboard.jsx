import useAuthStore from '../store/auth.store'
import UserProfile from '../components/user/UserProfile'
import QuickLinks from '../components/user/QuickLinks'

function Dashboard() {
  const user = useAuthStore(state => state.user)

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome back, {user?.firstName || 'User'}!
      </h1>

      <div className="bg-white rounded-lg shadow p-6 max-w-4xl mx-auto">
        <UserProfile user={user} />
        <QuickLinks />
      </div>
    </div>
  )
}

export default Dashboard
