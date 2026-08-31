import axios from 'axios'

export default async function rejectInterest(userId) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_AXIOS_API}/api/reject-interest`,
      { userId },
      { withCredentials: true },
    )

    return response.data
  } catch (error) {
    return error.response?.data || { success: false, message: 'Unable to reject interest' }
  }
}
