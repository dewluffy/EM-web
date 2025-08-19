import axios from "axios";


export const actionRegister = async (value) => {
  return await axios.post('http://localhost:8899/api/auth/register', value)
}

export const actionLogin = async (value) => {
  return await axios.post('http://localhost:8899/api/auth/login', value)
}