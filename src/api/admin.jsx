import axios from "axios";


export const getAllEmployees = async (token) => {
  return await axios.get('http://localhost:8899/api/admin/users',{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
}
