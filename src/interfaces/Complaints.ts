interface VideoProps {
  title: string
  author: string
}

export interface ComplaintOverPerson {
  name: string
  title: string
}

export interface ComplaintDataProps {
  id: string
  image: string
  date: Date
  video: VideoProps
  to: ComplaintOverPerson
  author: string
  rating: number
  body: string
}
