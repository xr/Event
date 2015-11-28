/**
 * Eventer master
 *
 * @constructor
 */
function Eventer() {
	this.callbacks = {};
}

/**
 * Add callback on custom event
 *
 * @method     on
 * @param      {String}    event   - custom event name
 * @param      {Function}  fn      - callback
 * @return     {Object}    Eventer
 */
Eventer.prototype.on = function (event, fn) {
	(this.callbacks[event] = this.callbacks[event] || []).push(fn);
	return this;
}

/**
 * Trigger the lisenting event only once then remove it
 *
 * @method     once
 * @param      {String}    event   - custom event name
 * @param      {Function}  fn      - callback
 * @return     {Object}    Eventer
 */
Eventer.prototype.once = function (event, fn) {
	var that = this;
	function one() {
		that.off(event, one);
		console.log('arg', arguments);
		fn.apply(this, arguments);
	}
	this.on(event, one);
	return this;
}
/**
 * Trigger the custom event
 *
 * @method     trigger
 * @param      {String}  event   - custom event name
 * @return     {Object}  Eventer
 */
Eventer.prototype.trigger = function (event) {
	// get the rest arguments except event name and generate an array
	var args = [].slice.call(arguments, 1),
		callbacks = this.callbacks[event];
	if (callbacks) {
		for (var i = 0; i < callbacks.length; i++) {
			callbacks[i].apply(this, args);
		}
	}

	return this;
}

/**
 * Cancel event listening
 * Format: e.off(event, [fn1, fn2])
 *
 * @method     off
 * @param      {String}  event   - event name
 * @return     {Object}  Eventer
 */
Eventer.prototype.off = function (event) {
	var callbacks = this.callbacks[event];
	if (!callbacks) {
		return this;
	}
	// remove all cbs if just given the event name
	if (arguments.length === 1) {
		delete this.callbacks[event];
		return this;
	}
	// otherwise, remove specific cb
	var cbs = [].slice.call(arguments, 1);
	for (var i = 0; i < cbs.length; i++) {
		callbacks.splice(callbacks.indexOf(cbs[i]), 1)
	}

	return this;
}

/**
* export Eventer
*/
module.exports = Eventer;