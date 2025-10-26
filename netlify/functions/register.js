const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI; // MongoDB connection string
const client = new MongoClient(uri);

exports.handler = async (event) => {
  const { username, password } = JSON.parse(event.body);

  if (!username || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Username and password are required.' }),
    };
  }

  try {
    await client.connect();
    const database = client.db('your_database_name'); // Replace with your database name
    const users = database.collection('users');

    const existingUser = await users.findOne({ username });
    if (existingUser) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'User already exists.' }),
      };
    }

    const newUser = { username, password }; // Consider hashing the password before storing
    await users.insertOne(newUser);

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'User registered successfully.' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error.' }),
    };
  } finally {
    await client.close();
  }
};