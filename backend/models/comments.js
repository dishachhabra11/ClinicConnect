import mongoose from "mongoose";

// Define the comment schema
const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true, // Ensure comment is required
    trim: true, // Trim spaces
  },
  username: {
    type: String,
    required: true, // Ensure username is required
    trim: true, // Trim spaces
  },
  time: {
    type: Date,
    default: Date.now, // Default to the current timestamp
  },
});

// Create and export the model
const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
