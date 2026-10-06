import { redirect } from '@sveltejs/kit'
import { getSession } from '$lib/server/auth/session.js'

export const load = async ({ cookies }) => {
  const session = await getSession(cookies)

  if (!session?.userId) {
    throw redirect(303, '/login')
  }

  return {
    userId: session.userId
  }
}