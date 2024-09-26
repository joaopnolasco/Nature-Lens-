// models/FavoriteSpecies.js

import mongoose from 'mongoose';

const favoriteSpeciesSchema = new mongoose.Schema({
  speciesName: String,
  description: String,
  imageUrl: String,
  dateIdentified: { type: Date, default: Date.now },
});

const FavoriteSpecies = mongoose.model('FavoriteSpecies', favoriteSpeciesSchema);

export default FavoriteSpecies;
