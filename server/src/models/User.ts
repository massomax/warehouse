import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId
  login: string;
  password: string;
  role: 'manager' | 'employee';
  warehouses?: mongoose.Types.ObjectId[];
  lastLogin?: Date;
  matchPassword(password: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema({
  login: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['manager', 'employee'],
    default: 'employee'
  },
  lastLogin: Date,
  warehouses: [{
    type: Schema.Types.ObjectId,
    ref: 'Warehouse'
  }]
});

userSchema.pre<IUser>('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function(password: string) {
  return bcrypt.compare(password, this.password);
};

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;