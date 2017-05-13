var Tasks = require('../../models/tasks');
//set up route to read our tasks from database
exports.read = function(req, res, next) {
	Tasks.find({completed: false, user: req.body.user}).exec(function(err, data) {
		if (err) { res.send('Error');
		} else { res.json(data); }
	});
	return next();
}
//ROUTE FOR CREATING TASKS!!!
exports.create = function (req, res, next) {
	var task = new Tasks();

	task.task = req.params.arg1;
	task.date = new Date();
	task.completed = false;
	task.user = req.body.user;

	task.save(function(err, data) {
		if (err) { console.log("Error saving to db: " + err); }
		else { res.json( {status: "success", id: data._id} ); }
	});
	return next();
}

exports.update = function(req, res, next) {
	var arg = req.params.arg1;
	var query = { task: arg }; //define find function

	Tasks.update( query, {completed: true}, function(err, doc) {
		if (err) { 
			console.log("Unable to update document" + err );
			res.send(404);
		} else {
			res.json( {status: "success"} );
		}
		return next();
	})

}