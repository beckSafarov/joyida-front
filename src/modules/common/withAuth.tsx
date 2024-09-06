// import { useRouter } from 'next/router'
// import { useEffect } from 'react'
// import Cookies from 'js-cookie'

// const withAuth = (WrappedComponent) => {
//   return (props) => {
//     const router = useRouter()

//     useEffect(() => {
//       const refreshToken = Cookies.get('refreshToken')
//       if (!refreshToken) {
//         router.replace('/login')
//       }
//     }, [])

//     return <WrappedComponent {...props} />
//   }
// }

// export default withAuth
