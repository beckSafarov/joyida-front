export const storeDataToLCS = (storeName: string, data: any) => {
  localStorage.setItem(storeName, JSON.stringify(data))
}

export const getDataFromLCS = (storeName: string) => {
  return Boolean(localStorage.getItem(storeName))
    ? JSON.parse(localStorage?.getItem(storeName) || '')
    : undefined
}

export const isStoreEmpty = (storeName: string) => {
  const data = getDataFromLCS(storeName)
  return Boolean(!data || data.length < 1)
}
