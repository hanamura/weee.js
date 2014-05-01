describe('tick', function() {
	this.timeout(3000);

	it('should tick 60 times in about 1 second', function(done) {
		var then = +new Date();
		var count = 60;
		new weee.Tick({raf: true, fps: 60}).on('tick', function(tick) {
			count--;
			if (count === 0 && new Date() - then < 2000) {
				tick.off('tick', arguments.callee);
				done();
			}
		});
	});

	it('should return current time', function(done) {
		new weee.Tick({raf: true, fps: 60}).on('tick', function(tick) {
			tick.off('tick', arguments.callee);
			var now = +new Date();
			if (now - 100 < tick.time() && tick.time() <= now) {
				done();
			}
		});
	});

	it('should use requestAnimationFrame', function() {
		var tick = new weee.Tick({raf: true});
		var raf = !!(
			window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame
		);
		expect(tick.rafAvailable()).to.equal(raf);
	});
});
