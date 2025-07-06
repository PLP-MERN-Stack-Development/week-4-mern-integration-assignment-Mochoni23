const mongoose = require('mongoose');
const slugify = require('slugify');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a category name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Category name cannot exceed 50 characters']
  },
  slug: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  featuredImage: {
    type: String,
    default: 'default-category.jpg'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for category's posts
CategorySchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'category',
  justOne: false,
  options: { sort: { createdAt: -1 } }
});

// Create slug from name before saving
CategorySchema.pre('save', function(next) {
  if (!this.isModified('name')) return next();
  
  this.slug = slugify(this.name, { 
    lower: true,
    strict: true
  });
  next();
});

// Cascade delete posts when category is deleted
CategorySchema.pre('remove', async function(next) {
  await this.model('Post').deleteMany({ category: this._id });
  next();
});

module.exports = mongoose.model('Category', CategorySchema);