const {
  searchVideos,
  getById,
  createVideos,
  patchVotes,
  patchViews,
} = require("../services/index");
const catchAsync = require("../utils/CatchAsync");
const logger = require("../utils/logger");
const { VIDEO_CONSTANTS } = require("../utils/constants");

/**
 * Get videos with filtering, sorting, and pagination
 * @route GET /v1/videos
 * @access Public
 */
const getVideos = catchAsync(async (req, res) => {
  const title = req.query.title || "";
  const genre = req.query.genres || "All";
  const genres = genre.split(",");
  const contentRating = req.query.contentRating || "Anyone";
  const sortBy = req.query.sortBy || "releaseDate";
  const page = parseInt(req.query.page, 10) || 1;
  const limit =
    parseInt(req.query.limit, 10) || VIDEO_CONSTANTS.DEFAULT_PAGE_SIZE;

  logger.info("GET /v1/videos", {
    title,
    genres,
    contentRating,
    sortBy,
    page,
    limit,
  });

  const result = await searchVideos(
    title,
    genres,
    contentRating,
    sortBy,
    page,
    limit
  );

  res.status(200).json({
    success: true,
    data: result.videos,
    pagination: {
      total: result.total,
      page: result.page,
      totalPages: result.totalPages,
      hasMore: result.hasMore,
    },
  });
});

/**
 * Get video by ID
 * @route GET /v1/videos/:videoId
 * @access Public
 */
const getVideoById = catchAsync(async (req, res) => {
  const { videoId } = req.params;
  logger.info("GET /v1/videos/:videoId", { videoId });

  const result = await getById(videoId);

  res.status(200).json({
    success: true,
    data: result,
  });
});

/**
 * Create new video
 * @route POST /v1/videos
 * @access Public
 */
const addVideos = catchAsync(async (req, res) => {
  const video = req.body;
  logger.info("POST /v1/videos", { title: video.title });

  const result = await createVideos(video);

  res.status(201).json({
    success: true,
    message: "Video created successfully",
    data: result,
  });
});

/**
 * Update video votes
 * @route PATCH /v1/videos/:videoId/votes
 * @access Public
 */
const updateVotes = catchAsync(async (req, res) => {
  const { videoId } = req.params;
  const { vote, change } = req.body;
  logger.info("PATCH /v1/videos/:videoId/votes", { videoId, vote, change });

  const result = await patchVotes(videoId, vote, change);

  res.status(200).json({
    success: true,
    message: "Vote updated successfully",
    data: result,
  });
});

/**
 * Update video view count
 * @route PATCH /v1/videos/:videoId/views
 * @access Public
 */
const updateViews = catchAsync(async (req, res) => {
  const { videoId } = req.params;
  logger.info("PATCH /v1/videos/:videoId/views", { videoId });

  const result = await patchViews(videoId);

  res.status(200).json({
    success: true,
    message: "View count updated successfully",
    data: result,
  });
});

module.exports = {
  getVideoById,
  getVideos,
  addVideos,
  updateVotes,
  updateViews,
};
