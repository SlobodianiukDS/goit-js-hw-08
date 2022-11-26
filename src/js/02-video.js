import vimeoPlayer from '@vimeo/player';
var throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new vimeoPlayer(iframe);

onVideoInSaveTime();

player.on('timeupdate', throttle(saveCurentTimeVideo, 1000));

function saveCurentTimeVideo(event) {
  console.log(event.seconds);
  localStorage.setItem('videoplayer-current-time', event.seconds);
}

function onVideoInSaveTime() {
  const time = localStorage.getItem('videoplayer-current-time');
  if (time) {
    player.setCurrentTime(time);
  }
}
