const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a task title'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    project: {
      type: mongoose.Schema.ObjectId,
      ref: 'Project',
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['To Do', 'In Progress', 'Completed'],
      default: 'To Do',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    dueDate: {
      type: Date,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

// Index for faster queries
taskSchema.index({ project: 1, status: 1 });
taskSchema.index({ assignedTo: 1 });

module.exports = mongoose.model('Task', taskSchema);
