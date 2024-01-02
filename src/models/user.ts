import mongoose from "mongoose";
import validator from "validator";

interface IUser extends Document {
  _id: string;
  name: string;
  photo: string;
  email: string;
  role: "admin" | "user";
  gender: "male" | "female" | "others";
  dob: Date;
  createdAt: Date;
  updatedAt: Date;
  //   Virtual attribute
  age: number;
}

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: [true, "Id is required!"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      unique: [true, "Email already exixts"],
      required: [true, "Email is required"],
      validate: validator.default.isEmail,
    },
    photo: {
      type: String,
      required: [true, "Please add photo"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "gender is required"],
    },
    dob: {
      type: Date,
      required: [true, "Plese enter date of birth"],
    },
  },
  { timestamps: true }
);

userSchema.virtual("age").get(function () {
  const today = new Date();
  const dob = this.dob;

  let age: number = today.getFullYear() - dob.getFullYear();

  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  ) {
    age--;
  }
  return age;
});

export const User = mongoose.model<IUser>("User", userSchema);
