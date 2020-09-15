var mongoose = require('mongoose');
exports.mongoConnection = mongoose.connect('mongodb://localhost/moviesapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = Promise;
