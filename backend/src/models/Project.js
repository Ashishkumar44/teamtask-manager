const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a project name'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
        role: {
          type: String,
          enum: ['Admin', 'Member'],
          default: 'Member',
        },
      },
    ],
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Completed'],
      default: 'Active',
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
