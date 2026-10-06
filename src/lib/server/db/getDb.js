import { MongoClient } from 'mongodb'
import { env } from '$env/dynamic/private'
import ensureApiIndexes from './ensureApiIndexes.js'

let db = null
let dbPromise = null

export default async function getDb() {
  if (db) {
    return db
  }

  if (dbPromise) {
    return dbPromise
  }

  const uri = (env.MONGODB_URI || '').trim()
  const dbName = (env.MONGODB_DB_NAME || '').trim()

  if (!uri || !dbName) {
    throw new Error(
      'MONGODB_URI or MONGODB_DB_NAME is missing in the environment.'
    )
  }

  const client = new MongoClient(uri)

  dbPromise = client
    .connect()
    .then(async (client) => {
      db = client.db(dbName)

      await ensureApiIndexes(db)

      return db
    })
    .catch((error) => {
      dbPromise = null
      throw error
    })

  return dbPromise
}