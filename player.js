var log = function() {
    console.log.apply(console, arguments)
}

var bindEventAudio = function(){
    $('#id-audio-player').on('ended', function(event){
        log('歌曲播放结束')
        buttonNext()
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
            $('.player-img').toggleClass('off')
        }else if (action === 'play') {
            // audio play
            log('audio play')
            buttonPlay(target)
            $('.player-img').toggleClass('off')
        }
    })
    nameDisplay()
}

//根据传入的song进行播放
var songSwitch = function(song) {
    $('#id-audio-player').attr('src', `songs/${song.text()}`)
    log($('#id-audio-player')[0])
    log(song.text())
    $('.current-song').removeClass('current-song')
    song.addClass('current-song')
    nameDisplay()
}
// audio play prev song
var buttonPrev = function() {
    log('button 上一首')
    var currentSong = $('.current-song')
    var currentIndex = currentSong.index()
    var prevIndex = (currentIndex - 1 + 3) % 3
    var songList = $('.single-song')
    // currentSong.removeClass('current-song')
    var prevSong = $(songList[prevIndex])
    // prevSong.addClass('current-song')
    songSwitch(prevSong)
}
// audio play next song
var buttonNext = function() {
    log('button 下一首')
    var currentSong = $('.current-song')
    var currentIndex = currentSong.index()
    var nextIndex = (currentIndex + 1) % 3
    var songList = $('.single-song')
    // currentSong.removeClass('current-song')
    var nextSong = $(songList[nextIndex])
    // nextSong.addClass('current-song')
    songSwitch(nextSong)
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
        log(event)
        var button = event.target
        buttonNext(button)
    })
}
// d点击歌曲名切换歌曲
var bindEventSong = function() {
    $('.songs-list').on('click', function(event){
        log(event.target)
        var song = $(event.target)
        songSwitch(song)
        $('.current-song').removeClass('current-song')
        song.addClass('current-song')
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

var setVolume = function() {
    var player = $('#id-audio-player')[0]
    var volumePlay = player.volume
    var volume = volumePlay * 100
    var slider = $('#id-input-volume')[0]
    slider.value = volume
}
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
var bindEventVolume = function(){
    $('#id-input-volume').on('click', function(event){
        var volumeSlider = event.target
        var volumePlay = volumeSlider.value / 100
        var player = $('#id-audio-player')[0]
        player.volume = volumePlay
    })
}

var bindEvents = function() {
    bindEventAudio()
    bindEventPlay()
    bindEventPrev()
    bindEventNext()
    bindEventSong()
    bindEventVolume()
    bindEventSlider()
}

var __main = function() {
    nameDisplay()
    setVolume()
    bindEvents()
}
$(document).ready(function(){
    __main()
})
