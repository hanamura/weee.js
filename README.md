# weee.js: JavaScript Tween Library

## Installation

### Browser

```
 <script src="path/to/weee.pkgd.js"></script>
```

**weee.pkgd.js** is packaged file with dependencies ([EventEmitter2](https://github.com/asyncly/EventEmitter2)).
If you already have EventEmitter2 in your project, use **weee.js**.

### Node

```
npm install weee
```

## Examples

### Simple tween for DOM element

```
var target = document.getElementById('target');

weee({
		from: 0,
		to: 500,
		duration: 2000,
		ease: weee.cubicInOut,
		target: target,
		setter: weee.Tween.css({name: 'left', unit: 'px'})
	})
	.play();
```

### Repeating tween

```
var target = document.getElementById('target');

weee({
		from: 0,
		to: 500,
		duration: 2000,
		ease: weee.cubicInOut,
		repeatType: 'reverse',
		repeatCount: Infinity,
		target: target,
		setter: weee.Tween.css({name: 'left', unit: 'px'})
	})
	.play();
```

### Set multiple properties with single tween

```
var target = document.getElementById('target');

weee({
		from: 0,
		to: 1,
		duration: 2000,
		ease: weee.cubicInOut,
		target: target,
		setter: function(value) {
			// `this` is set to the target
			this.style.left = String(value * 500) + 'px';
			this.style.top = String(value * 300) + 'px';
		}
	})
	.play();
```

### Using events

```
var target = document.getElementById('target');

weee({
		from: 0,
		to: 500,
		duration: 2000,
		ease: weee.cubicInOut
	})
	.on('start', function(tween) {
		console.log('start', tween.value());
	})
	.on('update', function(tween) {
		console.log('update', tween.value());
		target.style.left = String(tween.value()) + 'px';
	})
	.on('end', function(tween) {
		console.log('end', tween.value());
	})
	.play();
```

### Method chaining

```
weee()
	.from(0)
	.to(500)
	.duration(2000)
	.ease(weee.cubicInOut)
	.target(target)
	.setter(weee.Tween.css({name: 'left', unit: 'px'}))
	.play();
```

### Extra: window scrolling

```
var t = weee.ScrollY({
	duration: 500,
	ease: weee.cubicOut,
	target: window
});

t.to(1000);
```

## Dependencies

- [EventEmitter2](https://github.com/asyncly/EventEmitter2)
