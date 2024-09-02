export const getCookie = (cname: string) => {
  if (typeof document === 'undefined') return ''
  let name = cname + '='
  let ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

export const setCookie = (name: string, value: string) => {
  if (typeof document === 'undefined') return
  document.cookie = `${name}=${value}`
}

export const createColumnData = (
  id: string,
  label: string,
  minWidth: number
) => ({ id, label, minWidth })

export const refreshHeader = {
  headers: {
    Authorization: `Bearer ${getCookie('refresh_token')}`,
  },
}
export const accessHeader = {
  headers: {
    Authorization: `Bearer ${getCookie('access_token')}`,
  },
}

export const getAvatarLetters = (name: string) => {
  return name
    .split(' ')
    .map((name) => name[0])
    .join('')
}
