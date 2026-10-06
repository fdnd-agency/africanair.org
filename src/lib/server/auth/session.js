import crypto from 'node:crypto'

import getDb from '$lib/server/db/getDb.js'

const COOKIE_NAME = 'africanair_session'
const SESSION_DURATION = 60 * 60 * 1000

function hashToken(token) {
  return crypto
    .createHash('sha256')
    .update(token)
    .digest('hex')
}

export async function createSession(cookies, data = {}) {
  const db = await getDb()

  const token = crypto.randomBytes(32).toString('base64url')
  const tokenHash = hashToken(token)

  const expiresAt = new Date(Date.now() + SESSION_DURATION)

  await db.collection('Sessions').insertOne({
    tokenHash,
    userId: data.userId ?? null,
    pendingEmail: data.pendingEmail ?? null,
    createdAt: new Date(),
    expiresAt
  })

  cookies.set(COOKIE_NAME, token, {
    path: '/',
    httpOnly: true,
    secure: !import.meta.env.DEV,
    sameSite: 'lax',
    maxAge: 60 * 60
  })
}

export async function getSession(cookies) {
  const token = cookies.get(COOKIE_NAME)

  if (!token) {
    return null
  }

  const db = await getDb();

  return db.collection('Sessions').findOne({
    tokenHash: hashToken(token),
    expiresAt: {
      $gt: new Date()
    }
  })
}

export async function destroySession(cookies) {
  const token = cookies.get(COOKIE_NAME)

  if (token) {
    const db = await getDb()

    await db.collection('Sessions').deleteOne({
      tokenHash: hashToken(token)
    })
  }

  cookies.delete(COOKIE_NAME, {
    path: '/'
  })
}