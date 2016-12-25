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
 *	This file has the IOT logic to handle the topic messages 
 */

/*
 * import libs
 */
let dynamoDb = require('../aws/dynamodb');

/*
 * Private functions
 */

function processTopic1(message) {
	/*
	 * check the message param
	 */
	if(message) {
		/*
		 * convert it to json format
		 */
		message = JSON.parse(message);

		/*
		 * callback function after the query execution
		 */
		function callback(list) {
			/*
			 * if there is no such resource then add it
			 */
			if(list && list.Count == 0) {
				dynamoDb.db.addResource(message);	
			} else {
				dynamoDb.db.updateResource(message);
			}
		}

		/*
		 * get the info from db
		 */
		dynamoDb.db.getResource(message.mrid, callback);
		//dynamoDb.db.getResourcesByType("TRANSFORMER");
	}
}


/*
 * Functions exposed to outside
 */
let iot = {

	messageReceived: function (topic, message) {

		/*
		 * Check the topic name
		 */
		if(topic == "topic_1") {
			processTopic1(message);
		} else {
			console.log("Unknown topic message received");
		}
	}

};

/* 
 * export to others 
 */
exports.iot = iot;

