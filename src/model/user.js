import pkg from 'mongoose';
import validator from 'validator';




const {Schema, model} = pkg;
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        // validate: validator.isEmail()
    },

    password: {
        type: String,
    }, 

},
{
    timeStamps: true
})


export const User = model('user', userSchema);