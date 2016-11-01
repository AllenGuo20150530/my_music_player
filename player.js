var log = function() {
    console.log.apply(console, arguments)
}




// audio play
var buttonPlay = function(button) {
    log('button 播放/暂停')
    // audio play
    $('#id-audio-player')[0].play()
    log('audio paly')
    button.dataset.action = 'pause'
    button.innerText = '暂停'
}
// audio pause
var buttonPause = function(button) {
    log('button 播放/暂停')
    // audio play
    $('#id-audio-player')[0].pause()
    log('audio pause')
    button.dataset.action = 'play'
    button.innerText = '播放'
    log(button)
}
// id-button-play bind event
var bindEventPlay = function() {
    log('bind id-button-play')
    $('#id-button-play').on('click', function(){
        var target = event.target
        var action = target.dataset.action
        log(action)
        if (action === 'pause') {
            // audio pause
            log('audio pause')
            buttonPause(target)
        }else if (action === 'play') {
            // audio play
            log('audio play')
            buttonPlay(target)
        }
    })
}

// audio play prev song
var buttonPrev = function() {
    log('button 上一首')
    var currentSong = $('.current-song')
    var currentIndex = currentSong.index()
    var prevIndex = (currentIndex - 1 + 3) % 3
    var songList = $('.single-song')
    currentSong.removeClass('current-song')
    var prevSong = $(songList[prevIndex])
    prevSong.addClass('current-song')
    songSwitch(prevSong)
}
// audio play next song
var buttonNext = function() {
    log('button 下一首')
    var currentSong = $('.current-song')
    var currentIndex = currentSong.index()
    var nextIndex = (currentIndex + 1) % 3
    var songList = $('.single-song')
    currentSong.removeClass('current-song')
    var nextSong = $(songList[nextIndex])
    nextSong.addClass('current-song')
    songSwitch(nextSong)
}
//根据传入的song进行播放
var songSwitch = function(song) {
    $('#id-audio-player').attr('src', `songs/${song.text()}`)
    log($('#id-audio-player')[0])
    log(song.text())
}
// id-button-prev bind event
var bindEventPrev = function() {
    $('#id-button-prev').on('click', function(){
        log('song prev')
        log(event.target)
        var button = event.target
        buttonPrev(button)
    })
}
// id-button-next bind event
var bindEventNext = function() {
    $('#id-button-next').on('click', function(){
        log('song next')
        log(event.target)
        var button = event.target
        buttonNext(button)
    })
}






var __main = function() {
    bindEventPlay()
    bindEventPrev()
    bindEventNext()
}
