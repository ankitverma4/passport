import { Mongoose, Schema, model } from "mongoose";
import jwt from 'jsonwebtoken';

const schema = new Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

// schema.method('setPassword', (password) => {
//     this.password = password;
// });

schema.methods.setPassword = function(password) {
    this.password = password;
}

schema.methods.generateToken = function() {
    let today = new Date();
    let expirationDate= new Date(today);
    expirationDate.setDate(today.getDate() + 6) // 6 days expiration

    return jwt.sign({
        userName: this.userName,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
}

schema.methods.toAuthResponse = function() {
    return{
        userName: this.userName,
        token: this.generateToken()
    }
}

schema.methods.checkPassword = function(password) {
    return this.password === password;
}
export default model('user', schema);