
/*
weee.ease.* functions are ported from TweenJS:
https://github.com/CreateJS/TweenJS/blob/669c089c3fdae433c744f3a95b9dcba17637f3d6/src/tweenjs/Ease.js

Copyright (c) 2010 gskinner.com, inc.
 */

(function() {
  var easeFactory, factories, pullFactory, scrollFactory, tickFactory, tweenFactory, utilFactory,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice;

  easeFactory = function() {
    var ease;
    ease = {};
    ease.none = ease.linear = function(t) {
      return t;
    };
    ease.get = function(amount) {
      if (amount < -1) {
        amount = -1;
      }
      if (amount > 1) {
        amount = 1;
      }
      return function(t) {
        switch (false) {
          case amount !== 0:
            return t;
          case !(amount < 0):
            return t * (t * -amount + 1 + amount);
          default:
            return t * ((2 - t) * amount + (1 - amount));
        }
      };
    };
    ease.getPowIn = function(pow) {
      return function(t) {
        return Math.pow(t, pow);
      };
    };
    ease.getPowOut = function(pow) {
      return function(t) {
        return 1 - Math.pow(1 - t, pow);
      };
    };
    ease.getPowInOut = function(pow) {
      return function(t) {
        if ((t *= 2) < 1) {
          return 0.5 * Math.pow(t, pow);
        } else {
          return 1 - 0.5 * Math.abs(Math.pow(2 - t, pow));
        }
      };
    };
    ease.quadIn = ease.getPowIn(2);
    ease.quadOut = ease.getPowOut(2);
    ease.quadInOut = ease.getPowInOut(2);
    ease.cubicIn = ease.getPowIn(3);
    ease.cubicOut = ease.getPowOut(3);
    ease.cubicInOut = ease.getPowInOut(3);
    ease.quartIn = ease.getPowIn(4);
    ease.quartOut = ease.getPowOut(4);
    ease.quartInOut = ease.getPowInOut(4);
    ease.quintIn = ease.getPowIn(5);
    ease.quintOut = ease.getPowOut(5);
    ease.quintInOut = ease.getPowInOut(5);
    ease.sineIn = function(t) {
      return 1 - Math.cos(t * Math.PI / 2);
    };
    ease.sineOut = function(t) {
      return Math.sin(t * Math.PI / 2);
    };
    ease.sineInOut = function(t) {
      return -0.5 * (Math.cos(Math.PI * t) - 1);
    };
    ease.getBackIn = function(amount) {
      return function(t) {
        return t * t * ((amount + 1) * t - amount);
      };
    };
    ease.backIn = ease.getBackIn(1.7);
    ease.getBackOut = function(amount) {
      return function(t) {
        return --t * t * ((amount + 1) * t + amount) + 1;
      };
    };
    ease.backOut = ease.getBackOut(1.7);
    ease.getBackInOut = function(amount) {
      amount *= 1.525;
      return function(t) {
        if ((t *= 2) < 1) {
          return 0.5 * (t * t * ((amount + 1) * t - amount));
        } else {
          return 0.5 * ((t -= 2) * t * ((amount + 1) * t + amount) + 2);
        }
      };
    };
    ease.backInOut = ease.getBackInOut(1.7);
    ease.circIn = function(t) {
      return -(Math.sqrt(1 - t * t) - 1);
    };
    ease.circOut = function(t) {
      return Math.sqrt(1 - (--t) * t);
    };
    ease.circInOut = function(t) {
      if ((t *= 2) < 1) {
        return -0.5 * (Math.sqrt(1 - t * t) - 1);
      } else {
        return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
      }
    };
    ease.bounceIn = function(t) {
      return 1 - ease.bounceOut(1 - t);
    };
    ease.bounceOut = function(t) {
      switch (false) {
        case !(t < 1 / 2.75):
          return 7.5625 * t * t;
        case !(t < 2 / 2.75):
          return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
        case !(t < 2.5 / 2.75):
          return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
        default:
          return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
      }
    };
    ease.bounceInOut = function(t) {
      if (t < 0.5) {
        return ease.bounceIn(t * 2) * 0.5;
      } else {
        return ease.bounceOut(t * 2 - 1) * 0.5 + 0.5;
      }
    };
    ease.getElasticIn = function(amplitude, period) {
      var pi2;
      pi2 = Math.PI * 2;
      return function(t) {
        var s;
        if (t === 0 || t === 1) {
          return t;
        } else {
          s = period / pi2 * Math.asin(1 / amplitude);
          return -(amplitude * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * pi2 / period));
        }
      };
    };
    ease.elasticIn = ease.getElasticIn(1, 0.3);
    ease.getElasticOut = function(amplitude, period) {
      var pi2;
      pi2 = Math.PI * 2;
      return function(t) {
        var s;
        if (t === 0 || t === 1) {
          return t;
        } else {
          s = period / pi2 * Math.asin(1 / amplitude);
          return amplitude * Math.pow(2, -10 * t) * Math.sin((t - s) * pi2 / period) + 1;
        }
      };
    };
    ease.elasticOut = ease.getElasticOut(1, 0.3);
    ease.getElasticInOut = function(amplitude, period) {
      var pi2;
      pi2 = Math.PI * 2;
      return function(t) {
        var s;
        s = period / pi2 * Math.asin(1 / amplitude);
        if ((t *= 2) < 1) {
          return -0.5 * (amplitude * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * pi2 / period));
        } else {
          return amplitude * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * pi2 / period) * 0.5 + 1;
        }
      };
    };
    ease.elasticInOut = ease.getElasticInOut(1, 0.3 * 1.5);
    return ease;
  };

  pullFactory = function(Tween) {
    var Pull;
    return Pull = (function(_super) {
      __extends(Pull, _super);

      Pull.prototype.a = function() {
        return Pull.__super__.a.call(this);
      };

      Pull.prototype.b = function(b) {
        if (b !== void 0) {
          if (this._b !== b) {
            this._b = b;
            this._check();
          }
          return this;
        } else {
          return this._b;
        }
      };

      Pull.prototype.repeatCount = function() {
        return Pull.__super__.repeatCount.call(this);
      };

      Pull.prototype.repeatType = function() {
        return Pull.__super__.repeatType.call(this);
      };

      function Pull(args, options) {
        var a, k, v, _ref;
        if (options == null) {
          options = null;
        }
        if (!(this instanceof Pull)) {
          return new Pull(args, options);
        }
        a = {};
        _ref = args || {};
        for (k in _ref) {
          v = _ref[k];
          a[k] = v;
        }
        a.b = a.a = a.value || a.a || a.from || 0;
        delete a.seek;
        delete a.repeatCount;
        delete a.repeatType;
        Pull.__super__.constructor.call(this, a, options);
      }

      Pull.prototype.synced = function() {
        return this._p === this._b;
      };

      Pull.prototype.syncValue = function() {
        if (this._p !== this._b) {
          this._p = this._b;
          this._invokeSetter();
          this.emit('update', this);
          this._check();
        }
        return this;
      };

      Pull.prototype.syncDest = function() {
        return this.b(this._p);
      };

      Pull.prototype._check = function() {
        var p;
        if (this._p === this._b) {
          if (this.playing()) {
            this.pause();
            return this.emit('end', this);
          }
        } else {
          if (p = this.playing()) {
            this.pause();
          }
          this._a = this._p;
          this._delta = 0;
          this._seek = 0;
          this.emit = function() {};
          this.play();
          delete this.emit;
          if (!p) {
            return this.emit('start', this);
          }
        }
      };

      return Pull;

    })(Tween);
  };

  scrollFactory = function(Pull) {
    var ScrollX, ScrollY;
    ScrollX = (function(_super) {
      __extends(ScrollX, _super);

      ScrollX.prototype._targetValue = function(t, x, v) {
        var nameScroll, nameWindow;
        nameWindow = x ? 'pageXOffset' : 'pageYOffset';
        nameScroll = x ? 'scrollLeft' : 'scrollTop';
        if (v !== void 0) {
          if (t instanceof Window) {
            t.document.body[nameScroll] = v;
            t.document.body.parentElement[nameScroll] = v;
          } else {
            t[nameScroll] = v;
          }
          return this;
        } else {
          if (t instanceof Window) {
            return t[nameWindow] || t.document.body[nameScroll] || t.document.body.parentElement[nameScroll];
          } else {
            return t[nameScroll];
          }
        }
      };

      ScrollX.prototype.b = function(b) {
        if (b !== void 0) {
          ScrollX.__super__.b.call(this, this._targetValue(this._target, this.x()));
          this.syncValue();
          return ScrollX.__super__.b.call(this, b);
        } else {
          return this._b;
        }
      };

      ScrollX.prototype.x = function() {
        return true;
      };

      ScrollX.prototype.setter = function() {
        return ScrollX.__super__.setter.call(this);
      };

      function ScrollX(args, options) {
        var a, event, k, v, _i, _len, _ref, _ref1;
        if (options == null) {
          options = null;
        }
        if (!(this instanceof ScrollX)) {
          return new ScrollX(args, options);
        }
        a = {};
        _ref = args || {};
        for (k in _ref) {
          v = _ref[k];
          a[k] = v;
        }
        a.value = this._targetValue(a.target, this.x());
        a.setter = (function(_this) {
          return function(v) {
            return _this._targetValue(_this._target, _this.x(), v);
          };
        })(this);
        if (a.cancelEvents === void 0) {
          a.cancelEvents = ['mousewheel'];
        }
        ScrollX.__super__.constructor.call(this, a, options);
        _ref1 = a.cancelEvents;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          event = _ref1[_i];
          args.target.addEventListener(event, (function(_this) {
            return function() {
              if (!_this.synced()) {
                return _this.syncDest();
              }
            };
          })(this));
        }
      }

      return ScrollX;

    })(Pull);
    ScrollY = (function(_super) {
      __extends(ScrollY, _super);

      ScrollY.prototype.x = function() {
        return false;
      };

      function ScrollY(args, options) {
        if (options == null) {
          options = null;
        }
        if (!(this instanceof ScrollY)) {
          return new ScrollY(args, options);
        }
        ScrollY.__super__.constructor.call(this, args, options);
      }

      return ScrollY;

    })(ScrollX);
    return {
      ScrollX: ScrollX,
      ScrollY: ScrollY
    };
  };

  tickFactory = function(root, EventEmitter2) {
    var Tick;
    return Tick = (function(_super) {
      __extends(Tick, _super);

      Tick.prototype.raf = function() {
        return this._raf;
      };

      Tick.prototype.fps = function() {
        return this._fps;
      };

      Tick.prototype.time = function() {
        return this._time;
      };

      Tick.prototype.rafAvailable = function() {
        return !!this._request;
      };

      function Tick(args, options) {
        var cancel, request;
        if (options == null) {
          options = null;
        }
        this._onTick = __bind(this._onTick, this);
        this._raf = (args != null ? args.raf : void 0) || false;
        this._fps = (args != null ? args.fps : void 0) || 60;
        this._time = 0;
        this._request = null;
        this._cancel = null;
        Tick.__super__.constructor.call(this, options);
        if (this._raf) {
          if (typeof window === 'object') {
            root = window;
          }
          request = root.requestAnimationFrame || root.webkitRequestAnimationFrame || root.mozRequestAnimationFrame || root.oRequestAnimationFrame || root.msRequestAnimationFrame || null;
          if (request) {
            this._request = function() {
              var args;
              args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
              return request.apply(root, args);
            };
          }
          cancel = root.cancelAnimationFrame || root.webkitCancelAnimationFrame || root.mozCancelAnimationFrame || root.oCancelAnimationFrame || root.msCancelAnimationFrame || null;
          if (cancel) {
            this._cancel = function() {
              var args;
              args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
              return cancel.apply(root, args);
            };
          }
        }
      }

      Tick.prototype.on = function() {
        var args, _;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        _ = EventEmitter2.prototype.on.apply(this, args);
        if (this.listeners('tick').length && !this._id) {
          this._time = +(new Date);
          this._id = this._request ? this._request(this._onTick) : setInterval(this._onTick, 1000 / this._fps);
        }
        return _;
      };

      Tick.prototype.off = function() {
        var args, _;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        _ = EventEmitter2.prototype.off.apply(this, args);
        if (!this.listeners('tick').length && this._id) {
          if (this._cancel) {
            this._cancel(this._id);
          } else {
            clearInterval(this._id);
          }
          this._id = null;
        }
        return _;
      };

      Tick.prototype._onTick = function() {
        if (this._request) {
          this._id = this._request(this._onTick);
        }
        this._time = +(new Date);
        return this.emit('tick', this);
      };

      return Tick;

    })(EventEmitter2);
  };

  tweenFactory = function(EventEmitter2, Tick) {
    var Tween;
    return Tween = (function(_super) {
      __extends(Tween, _super);

      Tween._tick = null;

      Tween.tick = function(tick) {
        if (tick !== void 0) {
          this._tick = tick;
          return this;
        } else {
          return this._tick || (this._tick = new Tick({
            raf: true
          }));
        }
      };

      Tween.css = function(args) {
        var name, unit;
        name = (args != null ? args.name : void 0) || '';
        unit = (args != null ? args.unit : void 0) || '';
        return function(p) {
          switch (false) {
            case !('jquery' in this):
              return this.css(name, "" + p + unit);
            case !('style' in this):
              return this.style[name] = "" + p + unit;
          }
        };
      };

      Tween.prototype.a = function(a) {
        if (a !== void 0) {
          this._a = a;
          return this;
        } else {
          return this._a;
        }
      };

      Tween.prototype.from = function() {
        return this.a.apply(this, arguments);
      };

      Tween.prototype.b = function(b) {
        if (b !== void 0) {
          this._b = b;
          return this;
        } else {
          return this._b;
        }
      };

      Tween.prototype.to = function() {
        return this.b.apply(this, arguments);
      };

      Tween.prototype.p = function() {
        return this._p;
      };

      Tween.prototype.value = function() {
        return this.p.apply(this, arguments);
      };

      Tween.prototype.head = function(head) {
        if (head !== void 0) {
          this._head = head;
          return this;
        } else {
          return this._head;
        }
      };

      Tween.prototype.delayStart = function() {
        return this.head.apply(this, arguments);
      };

      Tween.prototype.delay = function() {
        return this.head.apply(this, arguments);
      };

      Tween.prototype.body = function(body) {
        if (body !== void 0) {
          this._body = body;
          return this;
        } else {
          return this._body;
        }
      };

      Tween.prototype.duration = function() {
        return this.body.apply(this, arguments);
      };

      Tween.prototype.tail = function(tail) {
        if (tail !== void 0) {
          this._tail = tail;
          return this;
        } else {
          return this._tail;
        }
      };

      Tween.prototype.delayEnd = function() {
        return this.tail.apply(this, arguments);
      };

      Tween.prototype.seek = function(seek) {
        if (seek !== void 0) {
          this._seek = seek;
          return this;
        } else {
          return this._seek;
        }
      };

      Tween.prototype.ease = function(ease) {
        if (ease !== void 0) {
          this._ease = ease;
          return this;
        } else {
          return this._ease;
        }
      };

      Tween.prototype.target = function(target) {
        if (target !== void 0) {
          this._target = target;
          return this;
        } else {
          return this._target;
        }
      };

      Tween.prototype.setter = function(setter) {
        if (setter !== void 0) {
          this._setter = setter;
          return this;
        } else {
          return this._setter;
        }
      };

      Tween.prototype.repeatCount = function(count) {
        if (count !== void 0) {
          this._repeatCount = count;
          return this;
        } else {
          return this._repeatCount;
        }
      };

      Tween.prototype.repeatType = function(type) {
        if (type !== void 0) {
          this._repeatType = type;
          return this;
        } else {
          return this._repeatType;
        }
      };

      function Tween(args, options) {
        if (options == null) {
          options = null;
        }
        this._onTick = __bind(this._onTick, this);
        if (!(this instanceof Tween)) {
          return new Tween(args, options);
        }
        this._a = (args != null ? args.a : void 0) || (args != null ? args.from : void 0) || 0;
        this._b = (args != null ? args.b : void 0) || (args != null ? args.to : void 0) || 0;
        this._p = 0;
        this._head = (args != null ? args.head : void 0) || (args != null ? args.delayStart : void 0) || (args != null ? args.delay : void 0) || 0;
        this._body = (args != null ? args.body : void 0) || (args != null ? args.duration : void 0) || 0;
        this._tail = (args != null ? args.tail : void 0) || (args != null ? args.delayEnd : void 0) || 0;
        this._seek = (args != null ? args.seek : void 0) || 0;
        this._ease = args != null ? args.ease : void 0;
        this._tick = (args != null ? args.tick : void 0) || this.constructor.tick();
        this._then = 0;
        this._delta = 0;
        this._target = (args != null ? args.target : void 0) || null;
        this._setter = (args != null ? args.setter : void 0) || null;
        this._repeatCount = (args != null ? args.repeatCount : void 0) || 0;
        this._repeatType = (args != null ? args.repeatType : void 0) || 'none';
        Tween.__super__.constructor.call(this, options);
        this.update();
      }

      Tween.prototype._invokeSetter = function() {
        switch (false) {
          case !(this._target && typeof this._setter === 'string'):
            return this._target[this._setter] = this._p;
          case !(this._target && typeof this._setter === 'function'):
            return this._setter.call(this._target, this._p);
          case typeof this._setter !== 'function':
            return this._setter(this._p);
        }
      };

      Tween.prototype.update = function() {
        var eased, p, ratio;
        ratio = (this._seek - this._head) / this._body;
        if (ratio < 0) {
          ratio = 0;
        }
        if (ratio > 1) {
          ratio = 1;
        }
        eased = this._ease ? this._ease(ratio) : ratio;
        p = (function() {
          switch (false) {
            case ratio !== 0:
              return this._a;
            case ratio !== 1:
              return this._b;
            default:
              return this._a + (this._b - this._a) * eased;
          }
        }).call(this);
        if (this._p !== p) {
          this._p = p;
          this._invokeSetter();
          return this.emit('update', this);
        }
      };

      Tween.prototype.playing = function() {
        return !!~this._tick.listeners('tick').indexOf(this._onTick);
      };

      Tween.prototype.play = function() {
        if (!this.playing()) {
          this._tick.on('tick', this._onTick);
          this._then = this._tick.time() - this._delta;
          if (!this._delta) {
            this.emit('start', this);
          }
        }
        return this;
      };

      Tween.prototype.pause = function() {
        if (this.playing()) {
          this._delta = this._tick.time() - this._then;
          this._tick.off('tick', this._onTick);
        }
        return this;
      };

      Tween.prototype._onTick = function() {
        var count, prog, seek2, tall, talls, time;
        time = this._tick.time();
        count = this._repeatType === 'reverse' || this._repeatType === 'loop' ? Math.max(this._repeatCount, 1) : 1;
        tall = this._head + this._body + this._tail;
        talls = tall * count;
        prog = time - this._then;
        if (prog < 0) {
          prog = 0;
        }
        if (prog > talls) {
          prog = talls;
        }
        this.seek((function() {
          switch (false) {
            case this._repeatType !== 'reverse':
              seek2 = prog % (tall * 2);
              if (seek2 > tall) {
                return tall - (seek2 - tall);
              } else {
                return seek2;
              }
              break;
            case this._repeatType !== 'loop':
              if (prog === talls) {
                return prog;
              } else {
                return prog % tall;
              }
              break;
            default:
              return prog;
          }
        }).call(this));
        this.update();
        if (prog === talls) {
          this.pause();
          this.emit('end', this);
        }
        return this;
      };

      return Tween;

    })(EventEmitter2);
  };

  utilFactory = function() {
    var util;
    util = {};
    util.css = function(args) {
      var name, unit;
      name = (args != null ? args.name : void 0) || '';
      unit = (args != null ? args.unit : void 0) || '';
      return function(p) {
        switch (false) {
          case !('jquery' in this):
            return this.css(name, "" + p + unit);
          case !('style' in this):
            return this.style[name] = "" + p + unit;
        }
      };
    };
    return util;
  };

  factories = {};

  try {
    factories.tick = tickFactory;
  } catch (_error) {}

  try {
    factories.tween = tweenFactory;
  } catch (_error) {}

  try {
    factories.pull = pullFactory;
  } catch (_error) {}

  try {
    factories.ease = easeFactory;
  } catch (_error) {}

  try {
    factories.scroll = scrollFactory;
  } catch (_error) {}

  try {
    factories.util = utilFactory;
  } catch (_error) {}

  (function(root, factories) {
    var factory, weee, weee_;
    factory = function(EventEmitter2) {
      var k, v, weee, _ref, _ref1, _ref2;
      weee = function() {
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor, result = func.apply(child, args);
          return Object(result) === result ? result : child;
        })(weee.Tween, arguments, function(){});
      };
      weee.Tick = typeof factories.tick === "function" ? factories.tick(root, EventEmitter2) : void 0;
      weee.Tween = typeof factories.tween === "function" ? factories.tween(EventEmitter2, weee.Tick) : void 0;
      weee.Pull = typeof factories.pull === "function" ? factories.pull(weee.Tween) : void 0;
      weee.ease = typeof factories.ease === "function" ? factories.ease() : void 0;
      _ref = factories.scroll(weee.Pull), weee.ScrollX = _ref.ScrollX, weee.ScrollY = _ref.ScrollY;
      weee.util = typeof factories.util === "function" ? factories.util() : void 0;
      _ref1 = weee.ease;
      for (k in _ref1) {
        v = _ref1[k];
        if (k.indexOf('_') !== 0) {
          weee[k] = v;
        }
      }
      _ref2 = weee.util;
      for (k in _ref2) {
        v = _ref2[k];
        if (k.indexOf('_') !== 0) {
          weee[k] = v;
        }
      }
      return weee;
    };
    switch (false) {
      case !(typeof define === 'function' && define.amd):
        return define('weee', ['eventemitter2'], factory);
      case typeof (typeof module !== "undefined" && module !== null ? module.exports : void 0) !== 'object':
        return module.exports = factory(require('eventemitter2').EventEmitter2);
      default:
        weee_ = root.weee;
        root.weee = weee = factory(root.EventEmitter2);
        return root.weee.noConflict = function() {
          root.weee = weee_;
          return weee;
        };
    }
  })(this, factories);

}).call(this);
