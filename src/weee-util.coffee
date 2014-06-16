utilFactory = ->
	util = {}

	util.css = (args) ->
		name = args?.name or ''
		unit = args?.unit or ''
		(p) ->
			switch
				when 'jquery' of @ then @css name, "#{p}#{unit}"
				when 'style' of @ then @style[name] = "#{p}#{unit}"

	util
