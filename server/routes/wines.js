/**
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR 
 * THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * Author:
 *  Rajeshwaran Paulchamy
 *
 * File Description:
 *	This file does CURD operations for wines
 *  and it connects with MongoDB to retrieve the same
 */

/*
 * retrieve the required modules
 */
var mongo = require('mongodb'),
	bson = mongo.BSONPure;

/*
 * connect with mongodb
 */
var server = new mongo.Server('192.168.8.104', 27017, {auto_reconnect: true});
var db = new mongo.Db('winedb', server);	

/*
 * Open the MongoDB
 * @param {function} '' The callback function
 */
db.open(function(err, db) {
	if(!err) {
		console.log("Connected to 'winedb' database");
		db.collection('wines', {strict:true}, function(err, collection) {
			if(err) {
				console.log("The 'wines' collection does not exist;");
				populateDB();
			}
		});
	} else {
		console.log("DB connection err: " + err);
	}
});

/*
 * Function to find all wines list
 * @param {Object} req The request object
 * @param {Object} res The response object
 */
exports.findAll = function(req, res) {
	console.log("Getting all wine data");

	res.send('{ "msg": "Hello" }');
	return;

	db.collection('wines', function(err, collection){
		collection.find().toArray(function(err, item){
			res.send(item);
		});
	});
};

/*
 * Function to find wine by ID
 * @param {Object} req The request object
 * @param {Object} res The response object
 */
exports.findById = function(req, res) {
	var year = req.params.year;

	console.log("Getting wine:" + year);

	db.collection('wines', function(err, collection){
		if(err) {
			res.send({'error': err});
			return;
		}

		collection.findOne(
			{
				'year': year
			},
			function(err, item) {
				res.send(item);
			}
		);
	});
};

/*
 * Function to add wine
 * @param {Object} req The request object
 * @param {Object} res The response object
 */
exports.addWine = function(req, res) {
	var wine = req.body;

	console.log('Adding wine:' + wine);

	db.collection('wines', function(err, collection) {
		collection.insert(
			wine,
			{
				safe: true
			},
			function(err, result){
				if(err) {
					console.log('error: ' + err);
					res.send({'error': 'An error has occurred'});
				} else {
					console.log('Success' + JSON.stringify(result[0]));
					res.send(result[0]);
				}
			}
		);		
	});
};

/*
 * Function to update wine
 * @param {Object} req The request object
 * @param {Object} res The response object
 */
exports.updateWine = function(req, res) {
	var id = req.params.id;
	var wine = req.body;

	console.log('Updating wine:' + id);
	console.log(JSON.stringify(wine));

	db.collection('wines', function(err, collection) {
		collection.update(
			{
				'year': new bson.objectID(id)
			},
			wine,
			{
				safe: true
			},
			function(err, result){
				if(err) {
					console.log('Error updating wine: ' + err);
					res.send({'error': 'An error has occurred'});
				} else {
					console.log('' + result + ' document(s) udpated');
					res.send(wine);
				}
			}
		);		
	});
};

/*
 * Function to delete wine
 * @param {Object} req The request object
 * @param {Object} res The response object
 */
exports.deleteWine = function(req, res) {
	var year = req.params.year;
	var wine = req.body;

	console.log('Deleting wine:' + year);

	db.collection('wines', function(err, collection) {
		collection.remove(
			{
				year: year
			},
			wine,
			{
				safe: true
			},
			function(err, result){
				if(err) {
					res.send({'error': err});
				} else {
					console.log('' + result + ' document(s) deleted');
					res.send(req.body);
				}
			}
		);		
	});
};


/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

	var wines = [
		{
			name: "CHATEAU DE SAINT COSME",
			year: "2009",
			grapes: "Grenache / Syrah",
			country: "France",
			region: "Southern Rhone",
			description: "The aromas of fruit and spice...",
			picture: "saint_cosme.jpg"
		},
		{
			name: "LAN RIOJA CRIANZA",
			year: "2006",
			grapes: "Tempranillo",
			country: "Spain",
			region: "Rioja",
			description: "A resurgence of interest in boutique vineyards...",
			picture: "lan_rioja.jpg"
		}];

	db.collection('wines', function(err, collection) {
		collection.insert(wines, {safe:true}, function(err, result) {});
	});

};

