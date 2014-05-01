pullFactory = (Tween) ->
	class Pull extends Tween
		a: -> super()

		b: (b) ->
			if b isnt undefined
				if @_b isnt b
					@_b = b
					@_check()
				@
			else
				@_b

		repeatCount: -> super()

		repeatType: -> super()

		constructor: (args, options = null) ->
			unless @ instanceof Pull
				return new Pull args, options

			# clone args
			a = {}
			a[k] = v for k, v of args or {}

			# modify args
			a.b = a.a = a.value or a.a or a.from or 0
			delete a.seek
			delete a.repeatCount
			delete a.repeatType

			super a, options

		synced: -> @_p is @_b

		syncValue: ->
			if @_p isnt @_b
				@_p = @_b
				@_invokeSetter()
				@emit 'update', @
				@_check()
			@

		syncDest: -> @b @_p

		_check: ->
			if @_p is @_b
				if @playing()
					@pause()
					@emit 'end', @
			else
				if p = @playing()
					@pause()

				# set start point current value
				@_a = @_p

				# reset before play
				@_delta = 0
				@_seek = 0

				# replace emit temporarily then play
				@emit = ->
				@play()
				delete @emit

				# alternative event
				if not p
					@emit 'start', @
