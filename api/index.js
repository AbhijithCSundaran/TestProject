const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
// const ObjectId = require("mongodb").ObjectID;
const { ObjectId } = require('mongodb');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
var cors = require('cors');

const multer = require('multer');


var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.use(cors());

// var CONNECTION_URL = "mongodb+srv://csabhi007:csabhi123@cluster0.s3d24sx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var CONNECTION_URL = "mongodb+srv://csabhi007:csabhi123@cluster0.s3d24sx.mongodb.net";





var DATABASE_NAME = "TestDB";
var database;

app.listen(5000, () => {
    MongoClient.connect(CONNECTION_URL, (error, client) => {
        if (error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        console.log("Connected to '" + DATABASE_NAME + "'!");
    });
});

app.get('/api/UserList/GetUsers', (request, response) => {
    database.collection("UserList").find({}).toArray((error, result) => {
        if (error) {
            console.error('Error fetching data:', error);
            response.status(500).send('An error occurred');
            return;
        }
        response.send(result);
    });
});


app.post('/api/UserList/Login', multer().none(), async (req, res) => {
    const { Email, Password } = req.body;
    if (!Email || !Password)
        return res.json({ error: 'Email and Password are required.' });

    try {
        const user = await database.collection('UserList').findOne({ Email: Email });
        if (!user)
            return res.json({ error: 'Invalid Email.' });

        if (Password != user.Password)
            return res.json({ error: 'Invalid Password.' });

        const token = ''//jwt.sign({ id: user._id, username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });

        res.json({ message: 'Login successful.', token });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'An error occurred during login.' });
    }
});
// app.post('/api/UserList/Login', multer().none(), (request, response) => {
//     var user = checkEmailPassword(request);
//     if (user) {
//         response.json(user)
//     }
//     else
//         response.json("Invalid Email or Password")
// })
app.post('/api/UserList/AddUser', multer().none(), (request, response) => {
    // var isEmailExist = checkEmail(request);
    // if (!isEmailExist) {
    database.collection("UserList").insertOne({
        FirstName: request.body.FirstName,
        LastName: request.body.LastName,
        Email: request.body.Email,
        Mobile: request.body.Mobile,
        Role: request.body.Role,
        Password: request.body.Password
    })
    response.json("Added Successfully")
    // }
    // response.json("Email ")
})

// app.delete('/api/UserList/DeleteUser', (request, response) => {
//     database.collection("UserList").deleteOne({
//         id: request.query._id
//     });
//     response.json("Deleted Successfully")
// });
app.delete('/api/UserList/DeleteUser', (request, response) => {
    const userId = request.query._id;

    // Check if the _id is provided and valid
    if (!ObjectId.isValid(userId)) {
        return response.status(400).json({ error: "Invalid user ID" });
    }

    // Convert the string _id to an ObjectId
    database.collection("UserList").deleteOne({ _id: new ObjectId(userId) }, (err, result) => {
        if (err) {
            return response.status(500).json({ error: "Failed to delete user" });
        }

        if (result.deletedCount === 0) {
            return response.status(404).json({ error: "User not found" });
        }

        response.json("Deleted Successfully");
    });
});

