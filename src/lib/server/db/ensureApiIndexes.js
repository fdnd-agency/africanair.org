export default async function ensureApiIndexes(db) {
  const apiCollection = db.collection('API')

  await apiCollection.createIndex(
    { emailLower: 1 },
    {
      unique: true,
      name: 'uniq_emailLower'
    }
  )

  await apiCollection.createIndex(
    { apiKey: 1 },
    {
      unique: true,
      name: 'uniq_apiKey',
      partialFilterExpression: {
        apiKey: { $type: 'string' }
      }
    }
  )

  await apiCollection.createIndex(
    { lastCallAt: 1 },
    {
      name: 'idx_lastCallAt'
    }
  )
}