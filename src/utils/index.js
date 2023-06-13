import { format, addDays, startOfWeek, endOfWeek } from "date-fns"

export const formatDate = (date) => {
  return format(date, 'HH:mm dd MMMM yyyy')
}

export const getTomorrow = () => {
  const currentDate = new Date()
  const tomorrow = addDays(currentDate, 1)
  return tomorrow
}

export const getFirstDateOfWeek = () => {
  const currentDate = new Date()
  const firstDateOfWeek = startOfWeek(currentDate)
  return firstDateOfWeek
}

export const getLastDateOfWeek = () => {
  const currentDate = new Date()
  const lastDateOfWeek = endOfWeek(currentDate)
  return lastDateOfWeek
}

/* LOCAL */
export const BASE_URL = "http://127.0.0.1:3001/api/v1"

/* PRODUCTION */
// export const BASE_URL = "https://ble-backend-production.up.railway.app/api/v1"