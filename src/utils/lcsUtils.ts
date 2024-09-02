export const storeDataToLCS = (storeName: string, data: any) => {
  if (typeof window === 'undefined') return
  localStorage.setItem(storeName, JSON.stringify(data))
}
export const removeDataFromLCS = (storeName: string) => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(storeName)
}

export const getDataFromLCS = (storeName: string) => {
  if (typeof window === 'undefined') return
  return Boolean(localStorage.getItem(storeName))
    ? JSON.parse(localStorage?.getItem(storeName) || '')
    : undefined
}

export const isStoreEmpty = (storeName: string) => {
  if (typeof window === 'undefined') return
  const data = getDataFromLCS(storeName)
  return Boolean(!data || data.length < 1)
}
