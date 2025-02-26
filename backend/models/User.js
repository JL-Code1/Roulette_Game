const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs'); 

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    }, 
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    balance: {
        type: Number,
        default: 1000, // Starting balance for bets
    },
});

// Hash password before saving to MongoDB, DONOT manually hash password in schema.js
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

// Compare entered password with stored hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
    try {
        return await bcrypt.compare(enteredPassword, this.password);
    } catch (error) {
        console.error("Error comparing passwords:", error);
        return false;
    }
};

const User = mongoose.model('User', userSchema);
module.exports = User;
