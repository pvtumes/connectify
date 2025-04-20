const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    course: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["PDF", "Video", "Code", "Slides", "Assignment", "Other"],
    },
    tags: {
      type: [String],
      default: [],
    },
    fileUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dateAdded: {
      type: Date,
      default: Date.now,
    },
    views: {
      type: Number,
      default: 0,
    },
    isBookmarked: {
      type: Boolean,
      default: false,
    },
    isReviewed: {
      type: Boolean,
      default: false,
    },
    estimatedTime: {
      type: Number,
      min: 1,
      default: 30,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better performance on queries
resourceSchema.index({ title: "text", course: "text", tags: "text" });
resourceSchema.index({ course: 1 });
resourceSchema.index({ type: 1 });
resourceSchema.index({ isBookmarked: 1 });
resourceSchema.index({ isReviewed: 1 });

const Resource = mongoose.model("Resource", resourceSchema);

module.exports = Resource;
