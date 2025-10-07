const mongoose = require("mongoose");
const validator = require("validator");

const videoSchema = new mongoose.Schema(
  {
    videoLink: {
      type: String,
      required: [true, "Video link is required"],
      trim: true,
      validate: {
        validator: function (value) {
          return (
            value.match(/youtube\.com\/embed\//) ||
            value.match(/player\.vimeo\.com\/video\//)
          );
        },
        message: "Video link must be a valid YouTube embed or Vimeo player URL",
      },
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
      minlength: [1, "Title must be at least 1 character long"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      enum: {
        values: ["Education", "Sports", "Movies", "Comedy", "Lifestyle"],
        message:
          "Genre must be one of: Education, Sports, Movies, Comedy, Lifestyle",
      },
    },
    contentRating: {
      type: String,
      required: [true, "Content rating is required"],
      enum: {
        values: ["Anyone", "7+", "12+", "16+", "18+"],
        message: "Content rating must be one of: Anyone, 7+, 12+, 16+, 18+",
      },
    },
    releaseDate: {
      type: Date,
      required: [true, "Release date is required"],
      validate: {
        validator: function (value) {
          return value <= new Date();
        },
        message: "Release date cannot be in the future",
      },
    },
    previewImage: {
      type: String,
      required: [true, "Preview image is required"],
      trim: true,
      validate: {
        validator: function (value) {
          return validator.isURL(value, { protocols: ["http", "https"] });
        },
        message: "Preview image must be a valid URL",
      },
    },
    votes: {
      upVotes: {
        type: Number,
        default: 0,
        min: [0, "Up votes cannot be negative"],
      },
      downVotes: {
        type: Number,
        default: 0,
        min: [0, "Down votes cannot be negative"],
      },
    },
    viewCount: {
      type: Number,
      min: [0, "View count cannot be negative"],
      default: 0,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for total votes
videoSchema.virtual("totalVotes").get(function () {
  return this.votes.upVotes + this.votes.downVotes;
});

// Virtual for vote ratio
videoSchema.virtual("voteRatio").get(function () {
  if (this.totalVotes === 0) return 0;
  return (this.votes.upVotes / this.totalVotes) * 100;
});

// Indexes for better query performance
videoSchema.index({ title: "text" }); // Text search on title
videoSchema.index({ genre: 1 }); // Genre filtering
videoSchema.index({ contentRating: 1 }); // Content rating filtering
videoSchema.index({ releaseDate: -1 }); // Date sorting
videoSchema.index({ viewCount: -1 }); // View count sorting
videoSchema.index({ "votes.upVotes": -1 }); // Popularity sorting

// Compound indexes for common queries
videoSchema.index({ genre: 1, contentRating: 1 });
videoSchema.index({ genre: 1, releaseDate: -1 });
videoSchema.index({ contentRating: 1, releaseDate: -1 });

// Pre-save middleware to ensure data integrity
videoSchema.pre("save", function (next) {
  // Ensure votes are integers
  this.votes.upVotes = Math.floor(this.votes.upVotes);
  this.votes.downVotes = Math.floor(this.votes.downVotes);
  this.viewCount = Math.floor(this.viewCount);

  next();
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
