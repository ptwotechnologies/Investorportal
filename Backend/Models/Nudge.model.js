import mongoose from 'mongoose';

const nudgeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    msgPreview: {
      type: String,
      trim: true,
    },
    audience: {
      type: String,
      required: true,
      trim: true,
    },
    triggerEvent: {
      type: String,
      required: true,
      trim: true,
    },
    channels: {
      type: [String],
      default: ['inapp'],
    },
    isActive: {
      type: Boolean,
      default: true,
    }
  },
  { timestamps: true }
);

const Nudge = mongoose.model('Nudge', nudgeSchema);

export default Nudge;
