const mongoose = require('mongoose');
const ProblemSchema = mongoose.Schema({
    id: Number,
    name: String,
    desc: String,
    difficulty: String
});
collectionName = "problems";
const ProblemModel = mongoose.model('ProblemModel', ProblemSchema, collectionName);
ProblemModel.createCollection();
module.exports = ProblemModel;