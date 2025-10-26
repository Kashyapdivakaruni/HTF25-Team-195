const { MongoClient } = require('mongodb');

exports.handler = async (event) => {
  const { username, password } = JSON.parse(event.body);

  const uri = process.env.MONGODB_URI; // MongoDB connection string
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('your_database_name'); // Replace with your database name
    const users = database.collection('users');

    const user = await users.findOne({ username });

    if (!user || user.password !== password) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid username or password' }),
      };
    }

    // Generate a token (this is a placeholder, implement your token generation logic)
    const token = 'your_generated_token';

    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  } finally {
    await client.close();
  }
};