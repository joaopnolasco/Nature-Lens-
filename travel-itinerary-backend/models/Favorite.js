// models/Favorite.js
import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  city: String,
  description: String,
  activities: [String],
  duration: String,
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

export default Favorite;
