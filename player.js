// 定义自己的log
var log = function() {
    console.log.apply(console, arguments)
}
// 在audio标签上绑定相关事件
var bindEventAudio = function(){
    // $('#id-audio-player').on('ended', function(event){
    //     log('歌曲播放结束')
    //     buttonNext()
    //     log('音乐已切换，继续播放！')
    // })
    $('#id-audio-player').on('timeupdate', function(event){

        // 获取总时长和当前播放时间
        var duration = $('#id-audio-player')[0].duration
        var currentTime = $('#id-audio-player')[0].currentTime
        log(duration, currentTime)
        setTimeFormat($('#id-time-remain'), duration, currentTime)
        sliderSlide(duration, currentTime)
    })
    // $('#id-audio-player').on('volumechange', function(event){
    //     log('volume changed')
    //     setVolume()
    // })
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

var setTimeRemain = function() {
    // 将剩余时间设置为初始状态
    var init = '--:--'
    $('#id-time-remain').text(init)
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
        setTimeRemain()
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
        setTimeRemain()
        log('song next')
        log(event.target)
        log(event)
        buttonNext()
        buttonPlayPause('play')
    })
}

var nameDisplay = function() {
    var currentSong = $('.current-song').text().split('-')
    var name = currentSong[0]
    var author = currentSong[1].split('.')[0]
    $('#id-audio-name').text(name)
    $('#id-audio-author').text(author)
}

// slider bar 随音乐滑动
var sliderSlide = function(duration, currentTime) {
    log('slider slides along with the music')
    var value = (currentTime * 100 / duration).toString().split('.')[0] + '%'
    log(value)
    var slider = $('#id-slider-gone')[0]
    log(slider)
    slider.style.width = value
}

// 设置显示时间时间
var setTimeFormat = function($element, duration, currentTime) {
    log('setTimeFormat')
    var time = duration - currentTime
    var minute = Math.floor(time / 60).toString()
    var second = Math.floor(time % 60).toString()
    log(minute, second)
    if (minute.length < 2) {
        minute = '0' + minute
    }
    if (second.length < 2) {
        second = '0' + second
    }
    var remain = `${minute}:${second}`
    $element.text(remain)
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
