// models/Itinerary.js
const mongoose = require('mongoose');

const ItinerarySchema = new mongoose.Schema({
  city: { type: String, required: true },
  description: String,
  activities: [String],
  duration: String,
  // Se quiser adicionar um campo de data de criação:
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Itinerary', ItinerarySchema);
