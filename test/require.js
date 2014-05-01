describe('require.js', function() {
	it('should load weee', function(done) {
		require.config({
			paths: {
				'eventemitter2': '../bower_components/eventemitter2/lib/eventemitter2',
				'weee': '../weee'
			}
		})(['weee'], function(weee) {
			expect(weee).to.not.be.undefined;
			done();
		});
	});
});
