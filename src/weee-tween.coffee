tweenFactory = (EventEmitter2, Tick) ->
	class Tween extends EventEmitter2
		# tick
		@_tick: null

		@tick: (tick) ->
			if tick isnt undefined
				@_tick = tick
				@
			else
				@_tick ||= new Tick raf: true

		# deprecated
		@css: (args) ->
			name = args?.name or ''
			unit = args?.unit or ''
			(p) ->
				switch
					when 'jquery' of @ then @css name, "#{p}#{unit}"
					when 'style' of @ then @style[name] = "#{p}#{unit}"

		# props
		a: (a) ->
			if a isnt undefined
				@_a = a
				@
			else
				@_a

		from: -> @a arguments...

		b: (b) ->
			if b isnt undefined
				@_b = b
				@
			else
				@_b

		to: -> @b arguments...

		p: -> @_p

		value: -> @p arguments...

		head: (head) ->
			if head isnt undefined
				@_head = head
				@
			else
				@_head

		delayStart: -> @head arguments...
		delay: -> @head arguments...

		body: (body) ->
			if body isnt undefined
				@_body = body
				@
			else
				@_body

		duration: -> @body arguments...

		tail: (tail) ->
			if tail isnt undefined
				@_tail = tail
				@
			else
				@_tail

		delayEnd: -> @tail arguments...

		seek: (seek) ->
			if seek isnt undefined
				@_seek = seek
				@
			else
				@_seek

		ease: (ease) ->
			if ease isnt undefined
				@_ease = ease
				@
			else
				@_ease

		target: (target) ->
			if target isnt undefined
				@_target = target
				@
			else
				@_target

		setter: (setter) ->
			if setter isnt undefined
				@_setter = setter
				@
			else
				@_setter

		repeatCount: (count) ->
			if count isnt undefined
				@_repeatCount = count
				@
			else
				@_repeatCount

		repeatType: (type) ->
			if type isnt undefined
				@_repeatType = type
				@
			else
				@_repeatType

		# init
		constructor: (args, options = null) ->
			# function call
			unless @ instanceof Tween
				return new Tween args, options

			# a/b/p
			@_a = args?.a or args?.from or 0
			@_b = args?.b or args?.to or 0
			@_p = 0

			# durations
			@_head = args?.head or args?.delayStart or args?.delay or 0
			@_body = args?.body or args?.duration or 0
			@_tail = args?.tail or args?.delayEnd or 0
			@_seek = args?.seek or 0

			# ease
			@_ease = args?.ease

			# times
			@_tick = args?.tick or @constructor.tick()
			@_then = 0
			@_delta = 0

			# target
			@_target = args?.target or null
			@_setter = args?.setter or null

			# repeat
			@_repeatCount = args?.repeatCount or 0
			@_repeatType = args?.repeatType or 'none'

			super options

			@update()

		_invokeSetter: ->
			switch
				when @_target and typeof @_setter is 'string'
					@_target[@_setter] = @_p
				when @_target and typeof @_setter is 'function'
					@_setter.call @_target, @_p
				when typeof @_setter is 'function'
					@_setter @_p

		update: ->
			ratio = (@_seek - @_head) / @_body
			ratio = 0 if ratio < 0
			ratio = 1 if ratio > 1
			eased = if @_ease then @_ease ratio else ratio

			p = switch
				when ratio is 0 then @_a
				when ratio is 1 then @_b
				else @_a + (@_b - @_a) * eased

			if @_p isnt p
				@_p = p
				@_invokeSetter()
				@emit 'update', @

		# play
		playing: -> !!~@_tick.listeners('tick').indexOf @_onTick

		play: ->
			if not @playing()
				@_tick.on 'tick', @_onTick
				@_then = @_tick.time() - @_delta
				if not @_delta
					@emit 'start', @
			@

		pause: ->
			if @playing()
				@_delta = @_tick.time() - @_then
				@_tick.off 'tick', @_onTick
			@

		_onTick: =>
			time = @_tick.time()

			count = if \
				@_repeatType is 'reverse' or
				@_repeatType is 'loop'
			then Math.max @_repeatCount, 1
			else 1

			tall = @_head + @_body + @_tail
			talls = tall * count

			prog = time - @_then
			prog = 0     if prog < 0
			prog = talls if prog > talls

			@seek switch
				when @_repeatType is 'reverse'
					seek2 = prog % (tall * 2)
					if seek2 > tall
						tall - (seek2 - tall)
					else
						seek2
				when @_repeatType is 'loop'
					if prog is talls
						prog
					else
						prog % tall
				else
					prog

			@update()

			if prog is talls
				@pause()
				@emit 'end', @
			@
