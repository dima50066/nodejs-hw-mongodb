import { Schema, model, mongoose } from 'mongoose';

const studentsSchema = new Schema(
  {
    userId: {
      type: String,
      ref: 'users',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
    photo: {
      type: String,
      default:
        'https://res.cloudinary.com/divyszzpf/image/upload/v1727786307/e2ft3t0ptrwg6rco1rsm.png',
    },
  },
  {
    timestamps: true,
  },
);

export const StudentsCollection = model('Students', studentsSchema);
