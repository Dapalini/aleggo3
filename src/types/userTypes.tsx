import * as Yup from 'yup';
import mongoose, { Schema } from 'mongoose';
import connectMongoDB from '@/lib/mongodb';

export const userValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    company: Yup.string(),
    postTitle: Yup.string(),
    role: Yup.string().required('Role is required').notOneOf([''], 'Select a valid role'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    homeAddress: Yup.string(),
    workTelephone: Yup.string(),
    privateTelephone: Yup.string(),
    dutiesSkills: Yup.array().of(Yup.string()),
    userNotes: Yup.string(),
});

export interface IUser {
    name: string;
    company: string;
    postTitle: string;
    role: string;
    email: string;
    homeAddress: string;
    workTelephone: string;
    privateTelephone: string;
    dutiesSkills: string[];
    userNotes: string;
  }

export const initialUserValues: IUser = {
    name: '',
    company: '',
    postTitle: '',
    role: '',
    email: '',
    homeAddress: '',
    workTelephone: '',
    privateTelephone: '',
    dutiesSkills: [],
    userNotes: '',
  };

const userSchema = new Schema({
  name: { type: String, required: true },
  company: { type: String },
  postTitle: { type: String },
  role: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  homeAddress: { type: String },
  workTelephone: { type: String },
  privateTelephone: { type: String},
  dutiesSkills: { type: [String]},
  userNotes: { type: String}
})

export const createUser = async () => {
  const User = mongoose.models.User || mongoose.model('User', userSchema);
  return User
}

