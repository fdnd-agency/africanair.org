import { fail, redirect } from '@sveltejs/kit'
import bcrypt from 'bcryptjs'

import getDb from '$lib/server/db/getDb.js'
import {
  createSession,
  destroySession,
  getSession
} from '$lib/server/auth/session.js'

export const csr = false

export const actions = {
  default: async ({ request, cookies }) => {
    const session = await getSession(cookies)

    if (!session?.pendingEmail) {
      throw redirect(303, '/login')
    }

    const formData = await request.formData()
    const codeValue = formData.get('code')
    const code = String(codeValue ?? '').trim()

    if (!/^\d{6}$/.test(code)) {
      return fail(400, {
        error: 'Enter the 6-digit code.'
      })
    }

    const db = await getDb()
    const loginCodesCollection = db.collection('LoginCodes')

    const record = await loginCodesCollection.findOne(
      {
        email: session.pendingEmail,
        used: false,
        expiresAt: { $gt: new Date() }
      },
      {
        sort: { createdAt: -1 }
      }
    )

    if (!record) {
      return fail(400, {
        error: 'The code is invalid or has expired.'
      })
    }

    const isValid = await bcrypt.compare(code, record.code)

    if (!isValid) {
      return fail(400, {
        error: 'The code is invalid or has expired.'
      })
    }

    // Claim the code atomically.
    const result = await loginCodesCollection.updateOne(
      {
        _id: record._id,
        used: false,
        expiresAt: { $gt: new Date() }
      },
      {
        $set: {
          used: true,
          usedAt: new Date()
        }
      }
    )

    if (result.modifiedCount !== 1) {
      return fail(400, {
        error: 'The code is invalid or has expired.'
      })
    }

  //  replaces the temporary session with the actual logged-in session
    await destroySession(cookies)

    await createSession(cookies, {
      userId: record.userId
    })

    throw redirect(303, '/beheer')
  }
}