var Tasks = require('../../models/tasks');
//set up route to read our tasks from database
exports.read = function(req, res, next) {
	Tasks.find({completed: false}).exec(function(err, data) {
		if (err) { res.send('Error');
		} else { res.json(data); }
	});
	return next();
}
//ROUTE FOR CREATING TASKS!!!
exports.create = function (req, res, next) {
	var task = new Tasks();

	task.task = req.params.task;
	task.date = new Date();
	task.completed = false;

	task.save(function(err, data) {
		if (err) { console.log("Error saving to db: " + err); }
		else { res.json( {status: "success", id: data._id} ); }
	});
	return next();
}