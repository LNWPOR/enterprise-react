import { useSelector } from 'react-redux'

export default function ProtectedComponent({ roles, children }) {
  const { isLoading, isProfileLoaded, user } = useSelector(
    (state) => state.auth
  )

  if (!isProfileLoaded) return null
  if (isLoading) return null
  if (!user) return null
  if (!roles.includes(user.role)) return null

  return children
}
