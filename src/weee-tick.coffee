tickFactory = (root, EventEmitter2) ->
	class Tick extends EventEmitter2
		# props
		raf: -> @_raf

		fps: -> @_fps

		time: -> @_time

		rafAvailable: -> !!@_request

		# init
		constructor: (args, options = null) ->
			@_raf = args?.raf or false
			@_fps = args?.fps or 60
			@_time = 0
			@_request = null
			@_cancel = null

			super options

			if @_raf
				root = window if typeof window is 'object'
				request =
					root.requestAnimationFrame or
					root.webkitRequestAnimationFrame or
					root.mozRequestAnimationFrame or
					root.oRequestAnimationFrame or
					root.msRequestAnimationFrame or
					null

				if request then @_request = (args...) -> request.apply root, args

				cancel =
					root.cancelAnimationFrame or
					root.webkitCancelAnimationFrame or
					root.mozCancelAnimationFrame or
					root.oCancelAnimationFrame or
					root.msCancelAnimationFrame or
					null

				if cancel then @_cancel = (args...) -> cancel.apply root, args

		# on/off
		on: (args...) ->
			_ = EventEmitter2::on.apply @, args

			if @listeners('tick').length and not @_id
				@_time = +new Date
				@_id = if @_request
					@_request @_onTick
				else
					setInterval @_onTick, 1000 / @_fps
			_

		off: (args...) ->
			_ = EventEmitter2::off.apply @, args

			if not @listeners('tick').length and @_id
				if @_cancel
					@_cancel @_id
				else
					clearInterval @_id
				@_id = null
			_

		# tick
		_onTick: =>
			@_id = @_request @_onTick if @_request
			@_time = +new Date
			@emit 'tick', @
