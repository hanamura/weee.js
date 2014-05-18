describe('weee', function() {
  describe('shortcut', function() {
    it('should be shortcut of weee.Tween', function() {
      expect(weee()).to.be.instanceof(weee.Tween);
    });
  });

  describe('tween', function() {
    this.timeout(1500);

    it('should properly seek', function() {
      var t = weee({
        from: 0,
        to: 1000,
        duration: 2000
      });
      t.seek(0).update();
      expect(t.value()).to.equal(0);
      t.seek(500).update();
      expect(t.value()).to.equal(250);
      t.seek(1000).update();
      expect(t.value()).to.equal(500);
      t.seek(1500).update();
      expect(t.value()).to.equal(750);
      t.seek(2000).update();
      expect(t.value()).to.equal(1000);
    });

    it('should properly seek even if the tween has delayStart and delayEnd', function() {
      var t = weee({
        from: 0,
        to: 1000,
        delayStart: 1000,
        duration: 2000,
        delayEnd: 1500
      });
      t.seek(0).update();
      expect(t.value()).to.equal(0);
      t.seek(1000).update();
      expect(t.value()).to.equal(0);
      t.seek(2000).update();
      expect(t.value()).to.equal(500);
      t.seek(3000).update();
      expect(t.value()).to.equal(1000);
      t.seek(4000).update();
      expect(t.value()).to.equal(1000);
    });

    it('should be same value as `from` before tween starts', function() {
      var t = weee({
        from: 0,
        to: 1,
        duration: 500
      }).play();
      expect(t.value()).to.equal(0);
    });

    it('should be same value as `to` after tween finishes', function(done) {
      var t = weee({
        from: 0,
        to: 1,
        duration: 500
      }).play();
      setTimeout(function() {
        expect(t.value()).to.equal(1);
        done();
      }, 600);
    });

    it('should be greater than `from` and less than `to` during tweening', function(done) {
      var t = weee({
        from: 0,
        to: 1,
        duration: 500
      }).play();
      setTimeout(function() {
        expect(t.value()).to.be.above(0);
        expect(t.value()).to.be.below(1);
        done();
      }, 250);
    });

    it('should return to be same value as `from` after repeat', function(done) {
      var t = weee({
        from: 0,
        to: 1,
        duration: 500,
        repeatType: 'reverse',
        repeatCount: 2
      }).play();
      setTimeout(function() {
        expect(t.value()).to.equal(0);
        done();
      }, 1100);
    });
  });
});
