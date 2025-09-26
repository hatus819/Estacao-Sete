import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware() {
    // Add custom logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Allow access to /admin/cozinha for COZINHA role
        if (pathname.startsWith('/admin/cozinha')) {
          return token?.role === 'COZINHA' || token?.role === 'ADMIN'
        }

        // Allow access to other /admin for ADMIN only
        if (pathname.startsWith('/admin')) {
          return token?.role === 'ADMIN'
        }

        return true
      }
    }
  }
)

export const config = {
  matcher: ['/admin/:path*']
}
