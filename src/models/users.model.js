import mongoose from 'mongoose';
import validator from 'validator';
import mongoosePaginate from 'mongoose-paginate-v2';
import mongooseDelete from 'mongoose-delete';

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    profilePic: { type: String },
    phone: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(mongoosePaginate);
userSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: ['find', 'findOne'],
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

export default User;
