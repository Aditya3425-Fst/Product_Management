import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
   
    name: {
        type: String,
        trim: true,
        required: [true, "please Enter the name "]
    },
    phone: {
        type: String,
        required: [true, "please Enter the mobile number"],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "please Enter the email Id"],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        trim: true,
        required: [true, "please Enter the password"],
        minLength: 8,
        maxLength: 15
    }
}, { timestamps: true }
)
export default mongoose.model("UserCollection", userSchema)