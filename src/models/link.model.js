import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    shortCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    targetUrl: {
      type: String,
      required: true,
      trim: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    lastClicked: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Link = mongoose.model("Link", linkSchema);

