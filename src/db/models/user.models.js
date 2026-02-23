import mongoose, { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudinary url
      required: true,
    },
    coverimage: {
      type: String, //cloudinary url
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "password is required"], //custom message
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);
//encrypting the password whenever user changes its password so it doesnt go in as simple string
//middleware flag is next to say pass it flag forward
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); //if password is modified
  this.password = bcrypt.hash(this.password, 10); //second argument is the salt rounds its applying the hash function
  next();
});
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password); //string password that user entered and encrypted password
};

//since this is faster we dont need async awai tbut can be used based ont he uage and needs
userSchema.methods.generateAccessToken = function () {
  //jwt.sign method to generate token
 return jwt.sign(
    {
      //this is the payload
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
    {
      //this is the payload
      _id: this._id,
      email: this.email,
    },
    process.env.REFRESH_TOKEN_SECRET,//key
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,//expiry
    }
  );
};

export const User = model("User", userSchema);
