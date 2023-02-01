import axios from 'axios'

const backend = (URL: String) =>
  (process.env.NEXT_PUBLIC_BACKEND_URL || '') + URL

export type IAPIResponse = Array<{
  name: String
  dob: String
  phoneNo: String
  email: String
}>

type TGetUserFormList = (data: {
  pageNo: Number
  per_page: Number
}) => Promise<IAPIResponse>

export const getUserFormList: TGetUserFormList = ({
  pageNo = 1,
  per_page = 10,
}) => {
  return axios
    .get(backend(`/user-form?pageNo=${pageNo}&per_page=${per_page}`))
    .then((val) => val.data || [])
    .catch((err) => {
      throw new Error(err?.response?.data || 'Something went wrong')
    })
}

export const getTotalUserEntries = () => {
  return axios
    .get(backend('/total-user-entries'))
    .then((val) => Number(val.data))
    .catch((err) => err?.response?.data || 'Something went wrong')
}
