const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const AWS = require('aws-sdk');

const app = express();
const port = 3000;

// Initialize DynamoDB client
const dynamoDB = new AWS.DynamoDB({ region: 'ap-south-1' });

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Serve index.html as the home page
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname + '/public' });
});

// Handle user signup
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to DynamoDB
    await createUser({ username, email, password: hashedPassword });

    // Redirect to the home page
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user');
  }
});

// Handle user login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Compare passwords
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send('Invalid password');
    }

    // Authentication successful
    res.send('Login successful!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in');
  }
});

// Get user by username from DynamoDB
async function getUserByUsername(username) {
  const params = {
    TableName: 'my-dynamodb-tablee',
    Key: { 'username': { S: username } }
  };

  const data = await dynamoDB.getItem(params).promise();
  return data.Item ? AWS.DynamoDB.Converter.unmarshall(data.Item) : null;
}

// Create user in DynamoDB
async function createUser(user) {
  const params = {
    TableName: 'my-dynamodb-table',
    Item: AWS.DynamoDB.Converter.marshall(user)
  };

  await dynamoDB.putItem(params).promise();
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
