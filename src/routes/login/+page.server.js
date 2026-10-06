// +page.server.js
// This page is for the fucntion of the login page.
import { fail, redirect } from '@sveltejs/kit'

import getDb from '$lib/server/db/getDb.js'
import generateCode from '$lib/server/helpers/generateCode.js'
import getResendClient from '$lib/server/services/resend.js'
import {
  createSession,
  destroySession
} from '$lib/server/auth/session.js'

import { FROM_EMAIL } from '$env/static/private'

export const csr = false

export const actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData()
    const emailValue = formData.get('email')

    if (typeof emailValue !== 'string' || !emailValue.trim()) {
      return fail(400, {
        error: 'Enter an email address.',
        email: ''
      })
    }

    const email = emailValue.trim().toLowerCase()

    if (!isValidEmail(email)) {
      return fail(400, {
        error: 'Enter a valid email address.',
        email
      })
    }

    const db = await getDb()
    const usersCollection = db.collection('Users')

    const user = await usersCollection.findOne({ email })

    // Remove an existing temporary or logged-in session. 
    await destroySession(cookies)

    // A temporary session is also created for an unknown email address
    await createSession(cookies, {
      pendingEmail: email
    });

    if (!user) {
      throw redirect(303, '/login-verification')
    }

    const { plain, hash } = await generateCode()

    // De e-mail zegt 10 minuten; gebruik dus ook echt 10 minuten.
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

    const loginCodesCollection = db.collection('LoginCodes')

    await loginCodesCollection.deleteMany({ email })

    await loginCodesCollection.insertOne({
      email,
      code: hash,
      userId: user._id.toString(),
      expiresAt,
      used: false,
      createdAt: new Date()
    })

    const resend = getResendClient()

    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Your login code',
      html: `
        <p>Your login code is: <strong>${plain}</strong></p>
        <p>This code is valid for 10 minutes.</p>
      `,
      text: `Your login code is: ${plain}. This code is valid for 10 minutes.`
    })

    throw redirect(303, '/login-verification')
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}