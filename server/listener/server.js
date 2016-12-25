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
 *	This file has the major code to run the HTTP (express) 
 *  and the WebSocket (socket.io) server.
 */

/*
 * retrieve the required modules
 */
let express = require('express'),
	app = express(),
	http = require('http').Server(app),
	io = require('socket.io')(http),
	bodyParser = require('body-parser');


/*
 * Socket.io on function
 * @param {String} 'connection' The callback for 'connection' message
 * @param {function} '' The callback function
 */
io.sockets.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

});


/*
 * Start the server
 * @param {Object} router The router module
 */
function start(router) {

	/* configure the express */
	/* parse application/x-www-form-urlencoded */
	app.use(bodyParser.urlencoded({ extended: false }));
	/* parse application/json */
	app.use(bodyParser.json());

	/* 
	 * added for static path
	 * here the path 'client' specified is relative 
	 * to the path from where we are running the server
	 */
	app.use(express.static("/home/rajesh/myfiles/otms/web/client")); 
	app.get("/", function(req, res) {
		res.sendFile("index.html");
	});

	/* configure the routes */
	router(app);

	/* start the server */
	http.listen(3000, function(){
		console.log('listening on *:3000');
	});

	/* the below code commented, if we start the server 
	 * using 'app' the socket.io is not working properly
	 * so it is commented
	 */
	//app.listen(3000);
}


/* 
 * export to others 
 */
exports.start = start;














/*
 SOCKET IO Connection code
 socketio = socketio.listen(http.createServer(app));

 socketio.configure(function () {
 socketio.set('authorization', function (handshakeData, callback) {
 if (handshakeData.xdomain) {
 callback('Cross-domain connections are not allowed');
 } else {
 callback(null, true);
 }
 });
 });

 socketio.sockets.on('connection', function (socket) {

 socket.on('message', function (message) {
 console.log("Got message: " + message);

 ip = socket.handshake.address.address;
 url = message;

 socketio.sockets.emit(
 'pageview', 
 { 
 'connections': Object.keys(socketio.connected).length, 
 'ip': '***.***.***.' + ip.substring(ip.lastIndexOf('.') + 1), 
 'url': url, 
 'xdomain': socket.handshake.xdomain, 
 'timestamp': new Date()
 }
 );
 });

 socket.on('disconnect', function () {
 console.log("Socket disconnected");

 socketio.sockets.emit(
 'pageview', 
 {
 'connections': Object.keys(io.connected).length
 }
 );
 });

 });
*/


