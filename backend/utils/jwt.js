const jwt = require('jsonwebtoken');
require('dotenv').config(); //Load the enviroment variables

//Generation of JWT token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, 
        { expiresIn: '30d' }); //Change as needed, fine for project
};

model.exports = generateToken;
