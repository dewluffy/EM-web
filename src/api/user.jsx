import axios from "axios";


export const getMe = async (token) => {
  return await axios.get('http://localhost:8899/api/auth/me',{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
}
