import { authType } from '../auth/Auth'
import instance from '../axios'

export const login = async (object: any) => {
  const response = await instance.post('/api/admin/login', {username: object.username, password: object?.password})
  return response.data
}

export const logout = async () => {
  const response = await instance.delete('/api/admin/logout')

  return response.data
}