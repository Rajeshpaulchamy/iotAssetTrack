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
 *	This file has the route information 
 */

/*
 * retrieve the required modules
 */
let controller = require('../controller/controller.js');

/* 
 * Defines the routes of the expressApplication
 * @param {Object} expressApp The express object
 */
function route(expressApp) {
	/*
	 * post configuration
	 */
	expressApp.post('/controller', controller.ctrl.postMessage);

	/*
	 * sample get, put, delete
	 */
	//expressApp.get('/wines', wines.findAll);
	//expressApp.put('/wines/:id', wines.updateWine);
	//expressApp.delete('/wines/:year', wines.deleteWine);
}

/* 
 * export to others 
 */
exports.route = route;

