// MongoDB initialization script
db = db.getSiblingDB("video-curator");

// Create collections with validation
db.createCollection("videos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "videoLink",
        "title",
        "genre",
        "contentRating",
        "releaseDate",
        "previewImage",
      ],
      properties: {
        videoLink: {
          bsonType: "string",
          description: "Video link must be a string and is required",
        },
        title: {
          bsonType: "string",
          minLength: 1,
          maxLength: 200,
          description: "Title must be a string between 1 and 200 characters",
        },
        genre: {
          enum: ["Education", "Sports", "Movies", "Comedy", "Lifestyle"],
          description: "Genre must be one of the allowed values",
        },
        contentRating: {
          enum: ["Anyone", "7+", "12+", "16+", "18+"],
          description: "Content rating must be one of the allowed values",
        },
        releaseDate: {
          bsonType: "date",
          description: "Release date must be a date",
        },
        previewImage: {
          bsonType: "string",
          description: "Preview image must be a string",
        },
        votes: {
          bsonType: "object",
          properties: {
            upVotes: {
              bsonType: "number",
              minimum: 0,
            },
            downVotes: {
              bsonType: "number",
              minimum: 0,
            },
          },
        },
        viewCount: {
          bsonType: "number",
          minimum: 0,
        },
      },
    },
  },
});

// Create indexes for better performance
db.videos.createIndex({ title: "text" });
db.videos.createIndex({ genre: 1 });
db.videos.createIndex({ contentRating: 1 });
db.videos.createIndex({ releaseDate: -1 });
db.videos.createIndex({ viewCount: -1 });
db.videos.createIndex({ "votes.upVotes": -1 });
db.videos.createIndex({ genre: 1, contentRating: 1 });
db.videos.createIndex({ genre: 1, releaseDate: -1 });
db.videos.createIndex({ contentRating: 1, releaseDate: -1 });

// Insert sample data
db.videos.insertMany([
  {
    videoLink: "youtube.com/embed/dQw4w9WgXcQ",
    title: "Sample Video 1",
    genre: "Education",
    contentRating: "Anyone",
    releaseDate: new Date("2023-01-15"),
    previewImage: "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
    votes: { upVotes: 10, downVotes: 2 },
    viewCount: 150,
  },
  {
    videoLink: "youtube.com/embed/9bZkp7q19f0",
    title: "Sample Video 2",
    genre: "Comedy",
    contentRating: "Anyone",
    releaseDate: new Date("2023-02-20"),
    previewImage: "https://i.ytimg.com/vi/9bZkp7q19f0/mqdefault.jpg",
    votes: { upVotes: 25, downVotes: 1 },
    viewCount: 300,
  },
]);

print("Database initialized successfully with sample data");
