var should = require('should');
var Eventer = require('..');

describe('Eventer', function() {
  describe('test .on method', function () {
    it('should add events and trigger event might invoke multiple events ', function () {
    	var eventer = new Eventer;
    	var results = [];

    	eventer.on('foo', function (data) {
    		results.push(data)
    	});

    	eventer.on('bar', function (data) {
    		results.push(data)
    	});

    	eventer.on('foo', function (data) {
    		results.push(data)
    	});

    	eventer.trigger('foo', 1);
    	eventer.trigger('bar', 2);
    	eventer.trigger('foo', 3);

    	results.should.eql([1,1,2,3,3]);
    });
  });

  describe('test .once method', function () {
  	it('should add events and trigger exactly that callback only once', function() {
  		var eventer = new Eventer;
    	var results = [];

    	eventer.once('foo', function (data) {
    		results.push(data)
    	});

    	eventer.once('bar', function (data) {
    		results.push(data)
    	});

    	eventer.once('foo', function (data) {
    		results.push(data)
    	});

    	eventer.trigger('foo', 1);
    	eventer.trigger('bar', 2);
    	eventer.trigger('foo', 3);
    	eventer.trigger('foo', 3);

    	results.should.eql([1,2,3]);
  	});
  })

  describe('test .off(event) method', function () {
  	it('should cancel added events', function() {
  		var eventer = new Eventer;
  		var results = [];

  		eventer.on('foo', function (data) {
    		results.push(data)
    	});

    	eventer.on('bar', function (data) {
    		results.push(data)
    	});

    	eventer.on('bar', function (data) {
    		results.push(data)
    	});

    	eventer.off('bar');

    	eventer.trigger('foo', 1);
    	eventer.trigger('bar', 2);

    	results.should.eql([1]);
  	});
  })

  describe('test .off(event, [fn1, fn2..]) method', function () {
  	it('should cancel added events', function() {
  		var eventer = new Eventer;
  		var results = [];

  		eventer.on('foo', function (data) {
    		results.push(data)
    	});

    	var foo2 = function (data) {
    		results.push(data)
    	};
    	eventer.on('foo', foo2);

    	var foo3 = function (data) {
    		results.push(data)
    	};
    	eventer.on('foo', foo3);

    	eventer.off('foo', foo2, foo3);

    	eventer.trigger('foo', 1);

    	results.should.eql([1]);
  	});
  })
});