var Event = require('./index');

var e = new Event;


var f3 = function (data, hehe) {
	console.log('ha3 ' + data);
};
e.once('ha', f3)


setTimeout(function () {
	e.trigger('ha', 'guoliang', '333');
}, 2000);


setTimeout(function () {
	e.trigger('ha', 'guoliang');
}, 3000);