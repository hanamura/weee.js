(function(root) {
	describe('.noConflict()', function() {
		var w;

		before(function() {
			w = root.weee.noConflict();
		});

		it('should return weee object', function() {
			expect(w).to.have.property('Tick');
			expect(w).to.have.property('Tween');
			expect(w).to.have.property('ease');
		});

		it('should reset global variable', function() {
			expect(root.weee).to.be.undefined;
			expect(root.weee).to.not.equal(w);
		});
	});
})(this);
