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
 *	This file is responsible for AWS connection
 */

/*
 * import libs
 */
let awsIot = require('aws-iot-device-sdk'),
	iotLogic = require('../business/iotLogic');


/*
 * configure the AWS device
 */
let device = awsIot.device({
	keyPath: './aws/certs/DTMS.private.key',
	certPath: './aws/certs/DTMS.cert.pem',
	caPath: './aws/certs/root-CA.crt',
	clientId: 'DTMS',
	region: 'us-west-2'
});

/*
 * Start the server
 * @param {null} void
 */
function startConnection() {

	/*
	 * connect to AWS
	 */
	device.on('connect', function() {
		console.log('connected with AWS IOT');

		/*
		 * subscribe to topic 1
		 */
		device.subscribe('topic_1', function(error, result) {
			console.log(result);
		});

		/*
		 * test code to publish message to 'topic_1'
		 */
		//device.publish('topic_1', JSON.stringify({ test_data: 2}));
	});

	/*
	 * subscribe to messages
	 */
	device.on('message', function(topic, payload) {
		console.log('message', topic, payload.toString());

		/*
		 * Pass the message to IOT logic
		 */
		iotLogic.iot.messageReceived(topic, payload.toString());
	});


}

/* 
 * export to others 
 */
exports.startConnection = startConnection;

