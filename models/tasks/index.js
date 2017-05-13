var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
	task: String,
	date: Date,
	completed: Schema.Types.Boolean
	user: String
});

module.exports = mongoose.model('tasks', schema);