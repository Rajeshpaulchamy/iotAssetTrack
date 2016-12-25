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
 *	This file contains all the database operations
 */

/*
 * import libs
 */
let AWS = require("aws-sdk"),
	env = require("../aws/certs/env.json");


/*
 * AWS SDK access code
 */
AWS.config.update(
	{
		accessKeyId: env.accessKeyId,
		secretAccessKey: env.secretAccessKey,	
		region: "us-west-2",
		endpoint: "https://dynamodb.us-west-2.amazonaws.com"
	});
	/*{
		accessKeyId: "AKIAJAMZJRS544SSSGKQ",
		secretAccessKey: "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",	
		region: "us-west-2",
		endpoint: "https://dynamodb.us-west-2.amazonaws.com"
	});*/

/*
 * docClient
 */
let docClient = new AWS.DynamoDB.DocumentClient();


/*
 * object exports to others
 */
let db = {

	/*
	 * Message format
	 */
	/*
	{
		"updatedon": 1482413102051,
		"mrid": "mRID_TRANSFORMER_001",
		"info":{
			"resourceType": "TRANSFORMER",
			"ambientTemp": 120,
			"oilTemp": 110,
			"oilLevel": 130,
			"longitude": 111,
			"latitude": 112,
			"volts": 1240,
			"ampere": 1100
		}
	}
	*/

	/*
	 * read the resource info
	 * @param {String} type
	 */
	getResourcesByType: function (type, callback) {

		/*
		 * form the query
		 */
		var query = {
			TableName: "resources",
			ProjectionExpression: "#mrid, #type, info",
			FilterExpression: "#type = :val1",
			ExpressionAttributeNames: {
				"#mrid": "mrid",
				"#type": "resourcetype"
			},
			ExpressionAttributeValues: {
				":val1": type
			}
		};

		/*
		 * execute the query
		 */
		docClient.scan(query, function(err, data) {

			if (err) {
				console.error("Unable to execute query. Error:", JSON.stringify(err, null, 2));

				if(callback && typeof(callback) == 'function'){ 
					callback(undefined);
				}

			} else {
				console.log("Query succeeded." + data);

				if(callback && typeof(callback) == 'function'){ 
					callback(data);
				}
			}
		});
	},


	/*
	 * read the resource info
	 * @param {String} mrid
	 */
	getResource: function (mrid, callback) {

		/*
		 * form the query
		 */
		var query = {
			TableName: "resources",
			KeyConditionExpression: "#mrid = :val1",
			ExpressionAttributeNames: {
				"#mrid": "mrid"
			},
			ExpressionAttributeValues: {
				":val1": mrid
			}
		};

		/*
		 * execute the query
		 */
		docClient.query(query, function(err, data) {

			if (err) {
				console.error("Unable to execute query. Error:", JSON.stringify(err, null, 2));

				if(callback && typeof(callback) == 'function'){ 
					callback(undefined);
				}

			} else {
				console.log("Query succeeded.");

				if(callback && typeof(callback) == 'function'){ 
					callback(data);
				}
			}
		});
	},

	/*
	 * add the resource in to the db
	 * @param {Object} data
	 */
	addResource: function (data, callback) {

		/*
		 * form the query
		 */
		let query = {
			TableName: "resources",
			Item:{
				"mrid": data.mrid,
				"resourcetype": data.info.resourceType,
				"info":{
					"updatedon": data.updatedon,
					"ambientTemp": data.info.ambientTemp,
					"oilTemp": data.info.oilTemp,
					"oilLevel": data.info.oilLevel,
					"gps": data.info.gps,
					"longitude": data.info.longitude,
					"latitude": data.info.latitude,
					"volts": data.info.volts,
					"ampere": data.info.ampere
				}
			}
		};

		/*
		 * execute the query
		 */
		docClient.put(query, function(err, data) {

			if (err) {
				console.error("Unable to execute query. Error:", JSON.stringify(err, null, 2));

				if(callback && typeof(callback) == 'function'){ 
					callback(undefined);
				}
			} else {
				console.log("Query succeeded.");

				if(callback && typeof(callback) == 'function'){ 
					callback(data);
				}
			}
		});
	},

	/*
	 * update the resource in to the db
	 * @param {Object} data
	 */
	updateResource: function (data, callback) {

		/*
		 * form the query
		 */
		let query = {
			TableName: "resources",
			Key: {
				"mrid": data.mrid,
				"resourcetype": data.info.resourceType
			},
			UpdateExpression: "set info.updatedon = :uo, info.ambientTemp = :at, info.oilTemp = :ot, info.oilLevel = :ol, info.longitude = :lgt, info.latitude = :ltt, info.volts = :vol, info.ampere = :amp",
			ExpressionAttributeValues: {
				":uo": data.updatedon,
				":at": data.info.ambientTemp,
				":ot": data.info.oilTemp,
				":ol": data.info.oilLevel,
				":lgt": data.info.longitude,
				":ltt": data.info.latitude,
				":vol": data.info.volts,
				":amp": data.info.ampere
			},
			ReturnValues:"UPDATED_NEW"
		}

		/*
		 * execute the query
		 */
		docClient.update(query, function(err, data) {

			if (err) {
				console.error("Unable to execute query. Error:", JSON.stringify(err, null, 2));

				if(callback && typeof(callback) == 'function'){ 
					callback(undefined);
				}
			} else {
				console.log("Query succeeded.");

				if(callback && typeof(callback) == 'function'){ 
					callback(data);
				}
			}
		});
	}

}

/* 
 * export to others 
 */
exports.db = db;

