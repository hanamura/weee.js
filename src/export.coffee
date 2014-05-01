factories = {}

try factories.tick = tickFactory
try factories.tween = tweenFactory
try factories.pull = pullFactory
try factories.ease = easeFactory
try factories.scroll = scrollFactory

((root, factories) ->
	factory = (EventEmitter2) ->
		weee = -> new weee.Tween arguments...
		weee.Tick = factories.tick? root, EventEmitter2
		weee.Tween = factories.tween? EventEmitter2, weee.Tick
		weee.Pull = factories.pull? weee.Tween
		weee.ease = factories.ease?()
		{ScrollX: weee.ScrollX, ScrollY: weee.ScrollY} = factories.scroll weee.Pull
		weee[k] = v for k, v of weee.ease when k.indexOf('_') isnt 0
		weee
	switch
		when typeof define is 'function' and define.amd
			define 'weee', ['eventemitter2'], factory
		when typeof module?.exports is 'object'
			module.exports = factory require('eventemitter2').EventEmitter2
		else
			weee_ = root.weee
			root.weee = weee = factory root.EventEmitter2
			root.weee.noConflict = ->
				root.weee = weee_
				weee
) this, factories
