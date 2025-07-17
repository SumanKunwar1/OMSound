import mongoose, { Document, Schema } from 'mongoose';

interface ISEOPage extends Document {
  pageName: string;
  path: string;
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  isActive: boolean;
  structuredData?: object;
  updatedAt: Date;
  createdAt: Date;
}

const SEOSchema = new Schema<ISEOPage>({
  pageName: { type: String, required: true },
  path: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  keywords: { type: [String], default: [] },
  ogImage: { type: String },
  isActive: { type: Boolean, default: true },
  structuredData: { type: Object },
}, { timestamps: true });

const SEOPage = mongoose.model<ISEOPage>('SEOPage', SEOSchema);

export default SEOPage;