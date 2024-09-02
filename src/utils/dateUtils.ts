import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

export const getDateFromNow = (date: Date) => {
  dayjs.extend(relativeTime)
  return dayjs(date).fromNow()
}

export const formatDate = (date: Date | string) => {
  return dayjs(date).format('DD/MM/YYYY h:mm A')
}

export const unixToDate = (date: number) => {
  return dayjs.unix(date).toDate()
}

export const unixToFormatted = (date: number) => {
  return formatDate(unixToDate(date))
}

export const fromNowToUnixDate = (date: number) => {
  dayjs.extend(relativeTime)
  const timeTo = dayjs().diff(unixToDate(date), 'minutes')
  // const numbersFromTimeTo = Number(timeTo.match(/\d+/g)?.[0])
  return {
    inWords: timeTo,
    // inDays: numbersFromTimeTo || 1,
  }
}
