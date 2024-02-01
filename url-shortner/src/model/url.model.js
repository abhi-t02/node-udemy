import { Schema, model } from "mongoose";

const urlSchema = new Schema(
  {
    urlId: {
      type: String,
      required: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

const Url = model("Url", urlSchema);

export default Url;
