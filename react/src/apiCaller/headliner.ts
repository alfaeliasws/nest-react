import { HeadlineType } from '@/adminPanel/AdminPanel'
import { authType } from '../auth/Auth'
import instance from '../axios'

export const createHeadliner = async (headline: HeadlineType | "") => {
  const response = await instance.post('/api/headliners', headline)
  return response.data
}

export const getHeadliner = async (id: string | "") => {
    const response = await instance.get('/api/headliners/'+ id)
    return response.data
}

export const searchHeadliner = async (highlight: string, size: string = "1", page: string = "0") => {
    const response = await instance.get(`/api/headliners/?highlight=${highlight}&size=${size}&page=${page}`)
    return response.data
}

export const updateHeadliner = async (headline: HeadlineType) => {
    const response = await instance.put(`/api/headliners/${headline.id}`, headline)
    return response.data
}

export const deleteHeadliner = async (id: string) => {
    const response = await instance.delete(`/api/headliners/${id}`)
    return response.data
}
