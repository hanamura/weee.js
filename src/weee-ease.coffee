###
weee.ease.* functions are ported from TweenJS:
https://github.com/CreateJS/TweenJS/blob/669c089c3fdae433c744f3a95b9dcba17637f3d6/src/tweenjs/Ease.js

Copyright (c) 2010 gskinner.com, inc.
###

easeFactory = ->
	ease = {}

	ease.none = ease.linear = (t) -> t

	ease.get = (amount) ->
		amount = -1 if amount < -1
		amount = 1 if amount > 1
		(t) ->
			switch
				when amount is 0
					t
				when amount < 0
					t * (t * -amount + 1 + amount)
				else
					t * ((2 - t) * amount + (1 - amount))

	ease.getPowIn = (pow) ->
		(t) ->
			Math.pow t, pow

	ease.getPowOut = (pow) ->
		(t) ->
			1 - Math.pow(1 - t, pow)

	ease.getPowInOut = (pow) ->
		(t) ->
			if (t *= 2) < 1
				0.5 * Math.pow t, pow
			else
				1 - 0.5 * Math.abs Math.pow 2 - t, pow

	ease.quadIn = ease.getPowIn 2
	ease.quadOut = ease.getPowOut 2
	ease.quadInOut = ease.getPowInOut 2

	ease.cubicIn = ease.getPowIn 3
	ease.cubicOut = ease.getPowOut 3
	ease.cubicInOut = ease.getPowInOut 3

	ease.quartIn = ease.getPowIn 4
	ease.quartOut = ease.getPowOut 4
	ease.quartInOut = ease.getPowInOut 4

	ease.quintIn = ease.getPowIn 5
	ease.quintOut = ease.getPowOut 5
	ease.quintInOut = ease.getPowInOut 5

	ease.sineIn = (t) ->
		1 - Math.cos t * Math.PI / 2

	ease.sineOut = (t) ->
		Math.sin t * Math.PI / 2

	ease.sineInOut = (t) ->
		-0.5 * (Math.cos(Math.PI * t) - 1)

	ease.getBackIn = (amount) ->
		(t) ->
			t * t * ((amount + 1) * t - amount)

	ease.backIn = ease.getBackIn 1.7

	ease.getBackOut = (amount) ->
		(t) ->
			--t * t * ((amount + 1) * t + amount) + 1

	ease.backOut = ease.getBackOut 1.7

	ease.getBackInOut = (amount) ->
		amount *= 1.525
		(t) ->
			if (t *= 2) < 1
				0.5 * (t * t * ((amount + 1) * t - amount))
			else
				0.5 * ((t -= 2) * t * ((amount + 1) * t + amount) + 2)

	ease.backInOut = ease.getBackInOut 1.7

	ease.circIn = (t) ->
		-(Math.sqrt(1 - t * t) - 1)

	ease.circOut = (t) ->
		Math.sqrt 1 - (--t) * t

	ease.circInOut = (t) ->
		if (t *= 2) < 1
			-0.5 * (Math.sqrt(1 - t * t) - 1)
		else
			0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1)

	ease.bounceIn = (t) ->
		1 - ease.bounceOut 1 - t

	ease.bounceOut = (t) ->
		switch
			when t < 1 / 2.75
				7.5625 * t * t
			when t < 2 / 2.75
				7.5625 * (t -= 1.5 / 2.75) * t + 0.75
			when t < 2.5 / 2.75
				7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
			else
				7.5625 * (t -= 2.625 / 2.75) * t + 0.984375

	ease.bounceInOut = (t) ->
		if t < 0.5
			ease.bounceIn(t * 2) * 0.5
		else
			ease.bounceOut(t * 2 - 1) * 0.5 + 0.5

	ease.getElasticIn = (amplitude, period) ->
		pi2 = Math.PI * 2
		(t) ->
			if t is 0 or t is 1
				t
			else
				s = period / pi2 * Math.asin 1 / amplitude
				-(amplitude * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * pi2 / period))

	ease.elasticIn = ease.getElasticIn 1, 0.3

	ease.getElasticOut = (amplitude, period) ->
		pi2 = Math.PI * 2
		(t) ->
			if t is 0 or t is 1
				t
			else
				s = period / pi2 * Math.asin 1 / amplitude
				amplitude * Math.pow(2, -10 * t) * Math.sin((t - s) * pi2 / period) + 1

	ease.elasticOut = ease.getElasticOut 1, 0.3

	ease.getElasticInOut = (amplitude, period) ->
		pi2 = Math.PI * 2
		(t) ->
			s = period / pi2 * Math.asin 1 / amplitude
			if (t *= 2) < 1
				-0.5 * (amplitude * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * pi2 / period))
			else
				amplitude * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * pi2 / period) * 0.5 + 1

	ease.elasticInOut = ease.getElasticInOut 1, 0.3 * 1.5

	ease
