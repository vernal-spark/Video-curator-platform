const httpStatus = require("http-status");
const Video = require("../model/video.model");
const ApiError = require("../utils/ApiError");
const logger = require("../utils/logger");
const { VIDEO_CONSTANTS } = require("../utils/constants");

/**
 * Get possible content ratings based on the selected rating
 * @param {string} contentRating - The selected content rating
 * @returns {string[]} Array of applicable content ratings
 */
const getPossibleContentRatings = (contentRating) => {
  const possibleRatings = VIDEO_CONSTANTS.CONTENT_RATINGS.filter(
    (rating) => rating !== "Anyone"
  );

  if (contentRating === "Anyone") {
    return possibleRatings;
  }

  const index = possibleRatings.indexOf(contentRating);
  if (index === -1) {
    logger.warn(`Invalid content rating: ${contentRating}`);
    return possibleRatings;
  }

  return possibleRatings.slice(index);
};
/**
 * Search and filter videos with advanced options
 * @param {string} title - Search query for video title
 * @param {string[]} genre - Array of genres to filter by
 * @param {string} contentRating - Content rating filter
 * @param {string} sortBy - Field to sort by (releaseDate, viewCount, title)
 * @param {number} page - Page number for pagination
 * @param {number} limit - Number of results per page
 * @returns {Promise<{videos: Array, total: number, page: number, totalPages: number}>}
 */
const searchVideos = async (
  title,
  genre,
  contentRating,
  sortBy,
  page = 1,
  limit = VIDEO_CONSTANTS.DEFAULT_PAGE_SIZE
) => {
  try {
    logger.info("Searching videos", {
      title,
      genre,
      contentRating,
      sortBy,
      page,
      limit,
    });

    // Build query object
    const query = {};

    // Title search (case-insensitive with index support)
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
    const sortOptions = {
      releaseDate: { releaseDate: -1 },
      viewCount: { viewCount: -1 },
      title: { title: 1 },
    };
    const sortByMatch = sortOptions[sortBy] || sortOptions.releaseDate;

    // Pagination
    const skip = (page - 1) * limit;
    const validLimit = Math.min(
      Math.max(1, limit),
      VIDEO_CONSTANTS.MAX_PAGE_SIZE
    );

    // Execute query with pagination
    const [videos, total] = await Promise.all([
      Video.find(query).sort(sortByMatch).skip(skip).limit(validLimit).lean(),
      Video.countDocuments(query),
    ]);

    logger.info(`Found ${total} videos matching criteria`);

    return {
      videos,
      total,
      page,
      totalPages: Math.ceil(total / validLimit),
      hasMore: skip + videos.length < total,
    };
  } catch (error) {
    logger.error("Error searching videos", { error: error.message });
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
