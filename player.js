var log = function() {
    console.log.apply(console, arguments)
}





var songPlay = function(button) {
    // audio play
    $('#id-audio-player')[0].play()
    log('audio paly')
    button.dataset.action = 'pause'
    button.innerText = '暂停'
}
var songPause = function(button) {
    // audio play
    $('#id-audio-player')[0].pause()
    log('audio pause')
    button.dataset.action = 'play'
    button.innerText = '播放'
    log(button)
}

var bindEventPlay = function() {
    $('#id-button-play').on('click', function(){
        var target = event.target
        var action = target.dataset.action
        log(action)
        if (action === 'pause') {
            // audio pause
            log('audio pause')
            songPause(target)
        }else if (action === 'play') {
            // audio play
            log('audio play')
            songPlay(target)
        }
    })
}
