import { NuxtAuthHandler } from '#auth'
import GoogleProvider from 'next-auth/providers/google'

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET || 'your-secret-key-change-this-in-production',
  
  providers: [
    // @ts-expect-error
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile"
        }
      }
    })
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      // Allow specific email domains
      const allowedDomains = ['lsu.edu.ph', 'gmail.com', 'yahoo.com']
      const email = user.email || ''
      const emailDomain = email.split('@')[1]

      if (allowedDomains.includes(emailDomain)) {
        return true
      }

      // Reject sign in
      return false
    },
    async jwt({ token, account, profile }) {
      if (account) {
        console.log('JWT Callback - Profile:', profile)
        console.log('JWT Callback - Picture:', profile?.picture)
        token.accessToken = account.access_token
        token.id = profile?.sub
        // @ts-expect-error
        token.picture = profile?.picture
      }
      return token
    },
    async session({ session, token }) {
      // @ts-expect-error
      session.accessToken = token.accessToken
      // @ts-expect-error
      session.user.id = token.id
      // @ts-expect-error
      session.user.image = token.picture
      return session
    }
  },

  pages: {
    signIn: '/login',
  }
})

