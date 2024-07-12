import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import relativeTime from 'dayjs/plugin/relativeTime'

export const getDateFromNow = (date: Date) => {
  dayjs.extend(relativeTime)
  return dayjs(date).fromNow()
}

export const formatDate = (date: Date | string) => {
  return dayjs(date).format('DD/MM/YYYY')
}
