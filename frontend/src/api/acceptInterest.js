import axios from 'axios'

export default async function acceptInterest(userId) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_AXIOS_API}/api/accept-interest`,
      { userId },
      { withCredentials: true },
    )
    return response.data
  } catch (error) {
    return error.response?.data || { success: false, message: 'Unable to accept interest' }
  }
}
