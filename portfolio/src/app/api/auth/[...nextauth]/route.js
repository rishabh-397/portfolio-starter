import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // Anyone can sign in now -- admin-only access to /admin is enforced
    // separately in the /api/admin/messages route, not here.
    async signIn() {
      return true;
    },
  },
  pages: {
    signIn: "/admin",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };