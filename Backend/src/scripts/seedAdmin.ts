import mongoose from 'mongoose';
import { Admin } from '../models/admin.model';  // Now this import will work
import bcrypt from 'bcrypt'; // Changed from bcryptjs to bcrypt for consistency
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function seedAdmins() {
  try {
    // 1. Connect to MongoDB
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/omsound';
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // 2. Clear existing admins (optional - comment out if you want to keep existing data)
    await Admin.deleteMany({});
    console.log('🗑️ Cleared existing admin accounts');

    // 3. Create new admin accounts
    const admins = [
      {
        username: 'admin',
        email: 'admin@omsound.com',
        password: 'admin123', // Will be hashed by the pre-save middleware
        role: 'admin' as const,
        status: 'active' as const
      },
      {
        username: 'subadmin',
        email: 'subadmin@omsound.com',
        password: 'admin123', // Will be hashed by the pre-save middleware
        role: 'sub-admin' as const,
        status: 'active' as const
      }
    ];

    // Use create instead of insertMany to trigger pre-save middleware
    for (const adminData of admins) {
      await Admin.create(adminData);
    }

    console.log('✅ Admin accounts created successfully');
    console.log('📧 Admin credentials:');
    console.log('   - Username: admin, Password: admin123');
    console.log('   - Username: subadmin, Password: admin123');
    
  } catch (error: unknown) {
    // 4. Proper error handling
    if (error instanceof Error) {
      console.error('❌ Seeding failed:', error.message);
    } else {
      console.error('❌ Unknown error occurred during seeding');
    }
    process.exit(1);
  } finally {
    // 5. Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  }
}

// Execute the function only if this file is run directly
if (require.main === module) {
  seedAdmins();
}

export default seedAdmins;

// ========================================

// package.json scripts section (add this to your package.json)
/*
{
  "scripts": {
    "seed:admins": "ts-node src/scripts/seedAdmins.ts",
    "seed:admins:dev": "tsx src/scripts/seedAdmins.ts"
  }
}
*/