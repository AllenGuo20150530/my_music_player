var log = function() {
    console.log.apply(console, arguments)
}

var bindEventAudio = function(){
    $('#id-audio-player').on('ended', function(event){
        log('歌曲播放结束')
        buttonNext()
        log('音乐已切换，继续播放！')
    })
    $('#id-audio-player').on('timeupdate', function(event){
        log('slider slides along with the music')
        sliderSlide()
        var duration = $('#id-audio-player')[0].duration
        setTimeFormat($('#id-time-duration'), duration)
        var currentTime = $('#id-audio-player')[0].currentTime
        setTimeFormat($('#id-time-current'), currentTime)
    })
    $('#id-audio-player').on('volumechange', function(event){
        log('volume changed')
        setVolume()
    })
}


// audio play or pause according to the button
var buttonPlayPause = function(button) {
    if (button == 'play') {
        $('#id-div-play').addClass('display-none')
        $('#id-div-pause').removeClass('display-none')
        $('#id-audio-player')[0].play()
        $('#id-div-img').removeClass('off')
    }else if (button == 'pause') {
        $('#id-div-pause').addClass('display-none')
        $('#id-div-play').removeClass('display-none')
        $('#id-audio-player')[0].pause()
        $('#id-div-img').addClass('off')
    }
}

// pause按钮点击事件, 点击后切换到play按钮， 并暂停音乐播放
var bindEventPause = function() {
    log('bind id-div-pause')
    $('#id-div-pause').on('click', function(){
        buttonPlayPause('pause')

    })
    nameDisplay()
}
// play按钮点击事件, 点击后切换到pause按钮， 并开始音乐播放
var bindEventPlay = function() {
    log('bind id-div-play')
    $('#id-div-play').on('click', function(){
        buttonPlayPause('play')

    })
    nameDisplay()
}

//根据传入的song进行播放
var songSwitch = function(song) {
    log('song已传入-->', song[0])
    log('开始切换音乐，nextSong-->', song.text())
    $('#id-audio-player').attr('src', `songs/${song.text()}`)
    log($('#id-audio-player').attr('src'))
    log(song.text())
    $('.current-song').removeClass('current-song')
    song.addClass('current-song')
    nameDisplay()
    log('音乐已切换！')
}
// d点击歌曲名切换歌曲
var bindEventSong = function() {
    $('.songs-list').on('click', function(event){
        log(event.target)
        var song = $(event.target)
        songSwitch(song)
        buttonPlayPause('play')
    })
}
// audio play prev song
var buttonPrev = function() {
    log('button 上一首')
    var currentSong = $('.current-song')
    var currentIndex = currentSong.index()
    var prevIndex = (currentIndex - 1 + 3) % 3
    var songList = $('.single-song')
    var prevSong = $(songList[prevIndex])
    songSwitch(prevSong)
}
// id-div-prev bind event
var bindEventPrev = function() {
    $('#id-div-prev').on('click', function(){
        log('song prev')
        log(event.target)
        buttonPrev()
        buttonPlayPause('play')
    })
}
// audio play next song
var buttonNext = function() {
    log('开始查找下一首歌曲！')
    var currentSong = $('.current-song')
    var currentIndex = currentSong.index()
    log('currentIndex-->', currentIndex)
    var nextIndex = (currentIndex + 1) % 3
    log('nextIndex-->', nextIndex)
    var songList = $('.single-song')
    var nextSong = $(songList[nextIndex])
    log('nextSong-->', nextSong.text())
    songSwitch(nextSong)
}
// id-button-next bind event
var bindEventNext = function() {
    $('#id-div-next').on('click', function(event){
        log('song next')
        log(event.target)
        log(event)
        buttonNext()
        buttonPlayPause('play')
    })
}

var nameDisplay = function() {
    var currentSong = $('.current-song').text()
    var len = currentSong.length
    var name = currentSong.slice(0, len-4)
    $('#id-h2-name').text(name)
}

// slider bar 随音乐滑动
var sliderSlide = function() {
    var player = $('#id-audio-player')[0]
    var time = player.currentTime
    var duration = player.duration
    var value = time * 100 / duration
    var slider = $('#id-input-slider')[0]
    slider.value = value
}

// var setVolume = function() {
//     var player = $('#id-audio-player')[0]
//     var volumePlay = player.volume
//     var volume = volumePlay * 100
//     var slider = $('#id-input-volume')[0]
//     slider.value = volume
// }
// 设置显示时间时间
var setTimeFormat = function($element, time) {
    var minute = Math.floor(time / 60)
    var second = Math.floor(time % 60)
    var end = `${minute}:${second}`
    $element.text(end)
}
// 点击进度条，实现在此进度上播放音乐
var bindEventSlider = function() {
    $('#id-input-slider').on('click', function(event){
        var player = $('#id-audio-player')[0]
        var duration = player.duration
        var slider = event.target
        var value = slider.value
        var time = value * duration / 100
        player.currentTime = time
    })
}
// 点击音量按钮， 调节音量
// var bindEventVolume = function(){
//     $('#id-input-volume').on('click', function(event){
//         var volumeSlider = event.target
//         var volumePlay = volumeSlider.value / 100
//         var player = $('#id-audio-player')[0]
//         player.volume = volumePlay
//     })
// }

// list 显示按钮
var bindEventList = function() {
    $('#id-div-list').on('click', function(){
        log('list was clicked')
        $('#id-div-songsContainer').removeClass('songs-none')
    })
}
var bindEventClose = function(){
    $('#id-input-close').on('click', function(){
        log('list close!')
        $('#id-div-songsContainer').addClass('songs-none')
    })
}


var bindEvents = function() {
    bindEventAudio()
    bindEventPlay()
    bindEventPause()
    bindEventPrev()
    bindEventNext()
    bindEventSong()
    // bindEventVolume()
    // bindEventSlider()
    bindEventList()
    bindEventClose()
}

var __main = function() {
    nameDisplay()
    // setVolume()
    bindEvents()
}
