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
 *	This file is the main file for this application
 *  which starts the server 
 */

/*
 * retrieve the required modules
 */
let server = require( './listener/server'),
	aws = require('./aws/connect'),
	router = require('./routes/router');

/*
 * start the AWS connection 
 */
aws.startConnection();

/*
 * start the webserver module 
 */
server.start(router.route);

