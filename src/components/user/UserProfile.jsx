function UserProfile({ user }) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <img
          src={user?.profileImage || 'https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg'}
          alt="Profile"
          className="w-16 h-16 rounded-full border"
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {user?.firstName} {user?.lastName}
          </h2>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>

      <div className="text-sm text-gray-600 space-y-1">
        <p><strong>Position:</strong> {user?.position || '-'}</p>
        <p><strong>Department:</strong> {user?.department || '-'}</p>
        <p><strong>Phone:</strong> {user?.mobile || '-'}</p>
        <p><strong>Start Date:</strong> {new Date(user?.startDate).toLocaleDateString('th-TH')}</p>
      </div>
    </div>
  )
}

export default UserProfile
