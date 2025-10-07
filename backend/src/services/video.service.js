const httpStatus = require("http-status");
const Video = require("../model/video.model");
const ApiError = require("../utils/ApiError");

const getPossibleContentRatings = (contentRating) => {
  const possibleRatings = ["7+", "12+", "16+", "18+"];
  if (contentRating === "Anyone") {
    return possibleRatings;
  }
  const i = possibleRatings.indexOf(contentRating);
  if (i === -1) {
    return possibleRatings; // Return all if not found
  }
  return possibleRatings.slice(i); // Use slice instead of splice to avoid mutation
};
const searchVideos = async (title, genre, contentRating, sortBy) => {
  try {
    // Build query object
    const query = {};

    // Title search (case-insensitive)
    if (title && title.trim()) {
      query.title = { $regex: title.trim(), $options: "i" };
    }

    // Genre filtering
    if (genre && !genre.includes("All")) {
      query.genre = { $in: genre };
    }

    // Content rating filtering
    if (contentRating && contentRating !== "Anyone") {
      const contentRatingArray = getPossibleContentRatings(contentRating);
      query.contentRating = { $in: contentRatingArray };
    }

    // Sorting
    let sortByMatch = { releaseDate: -1 };
    if (sortBy === "viewCount") {
      sortByMatch = { viewCount: -1 };
    }

    const result = await Video.find(query).sort(sortByMatch).lean();
    return result;
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Error searching videos"
    );
  }
};
const getById = async (videoId) => {
  try {
    const video = await Video.findById(videoId).lean();
    if (!video) {
      throw new ApiError(httpStatus.NOT_FOUND, "Video not found");
    }
    return video;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Error fetching video"
    );
  }
};

const createVideos = async (video) => {
  try {
    const result = await Video.create(video);
    return result;
  } catch (error) {
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors)
        .map((err) => err.message)
        .join(", ");
      throw new ApiError(httpStatus.BAD_REQUEST, message);
    }
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Error creating video"
    );
  }
};

const patchVotes = async (videoId, vote, change) => {
  try {
    const video = await Video.findById(videoId);
    if (!video) {
      throw new ApiError(httpStatus.NOT_FOUND, "Video not found");
    }

    const voteType = vote === "upVote" ? "upVotes" : "downVotes";
    const increment = change === "increase" ? 1 : -1;

    // Ensure votes don't go below 0
    if (change === "decrease" && video.votes[voteType] <= 0) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `Cannot decrease ${voteType} below 0`
      );
    }

    video.votes[voteType] += increment;
    await video.save();

    return video;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Error updating votes"
    );
  }
};

const patchViews = async (videoId) => {
  try {
    const video = await Video.findById(videoId);
    if (!video) {
      throw new ApiError(httpStatus.NOT_FOUND, "Video not found");
    }

    video.viewCount += 1;
    await video.save();

    return video;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Error updating view count"
    );
  }
};

module.exports = {
  searchVideos,
  getById,
  createVideos,
  patchVotes,
  patchViews,
};
