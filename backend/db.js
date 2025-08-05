import mongoose,{Schema, model} from "mongoose"
import { MONGO_URI } from "./config.js";

try {
    await mongoose.connect(MONGO_URI);
  console.log("✅ Connected to MongoDB");
} catch(error) {
    console.log(  "❌ MongoDB connection error:", error.message)
}

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  }
});

export const User=model('User',userSchema);

const accountSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User' //tells with whom userid is connected
    },
    balance: {
        type: Number,
        required: true
    }
});

export const Account = model('Account',accountSchema);
