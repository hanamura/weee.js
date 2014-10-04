scrollFactory = (Pull) ->
  class ScrollX extends Pull
    _targetValue: (t, x, v) ->
      nameWindow = if x then 'pageXOffset' else 'pageYOffset'
      nameScroll = if x then 'scrollLeft' else 'scrollTop'

      if v isnt undefined
        if t instanceof Window
          t.document.body[nameScroll] = v
          t.document.body.parentElement[nameScroll] = v
        else
          t[nameScroll] = v
        @
      else
        if t instanceof Window
          t[nameWindow] or t.document.body[nameScroll] or t.document.body.parentElement[nameScroll]
        else
          t[nameScroll]

    b: (b) ->
      if b isnt undefined
        super @_targetValue @_target, @x()
        @syncValue()
        super b
      else
        @_b

    x: -> true

    setter: -> super()

    constructor: (args, options = null) ->
      unless @ instanceof ScrollX
        return new ScrollX args, options

      # clone
      a = {}
      a[k] = v for k, v of args or {}

      # modify args
      a.value = @_targetValue a.target, @x()
      a.setter = (v) => @_targetValue @_target, @x(), v
      a.cancelEvents = ['mousewheel'] if a.cancelEvents is undefined

      super a, options

      # cancel
      for event in a.cancelEvents
        args.target.addEventListener event, =>
          @syncDest() unless @synced()

  class ScrollY extends ScrollX
    x: -> false

    constructor: (args, options = null) ->
      unless @ instanceof ScrollY
        return new ScrollY args, options

      super args, options

  # return
  ScrollX: ScrollX, ScrollY: ScrollY
