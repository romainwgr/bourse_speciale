const mongoose = require('mongoose');


const likeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    filmId: { type: mongoose.Schema.Types.ObjectId, ref: 'Film', required: true },
    createdAt: { type: Date, default: Date.now } 
  });
  
module.exports = mongoose.model('Like', likeSchema);
  