// models/admin.model.ts
import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IAdmin extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'sub-admin';
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
  correctPassword(candidatePassword: string, adminPassword: string): Promise<boolean>;
}

const adminSchema = new Schema<IAdmin>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['admin', 'sub-admin'], default: 'admin' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
  },
  { timestamps: true }
);

// Add the correctPassword method to the schema
adminSchema.methods.correctPassword = async function (
  candidatePassword: string,
  adminPassword: string
): Promise<boolean> {
  // Use bcrypt for password comparison in production
  return await bcrypt.compare(candidatePassword, adminPassword);
};

// Hash password before saving
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Create and export the model
export const Admin = mongoose.model<IAdmin>('Admin', adminSchema);

// Export default for easier imports
export default Admin;