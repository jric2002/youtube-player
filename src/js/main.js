/* GENERAL */
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


function genRanNum(min, max) {
  min = (typeof(min) == "undefined") ? null : min;
  max = (typeof(min) == "undefined") ? null : max;
  return Math.round((Math.random() * (max - min)) + min);
}

/* START */
const start = document.getElementById("start");
var number_image = 1;
start.classList.add("image-" + number_image.toString());
setTimeout(() => {
  start.classList.add("transition-image");
}, 3000);
setInterval(() => {
  start.classList.remove("image-" + number_image.toString());
  number_image += 1;
  if (number_image == 5) {
    number_image = 1;
  }
  start.classList.add("image-" + number_image.toString());
}, 3600000);

/* YouTube Player */
/*
var tomorrow = 0;
var afternoon = 0;
var night = 0;

for (song of asdf) {
  if(song["status"]["tomorrow"] == 1) {
    tomorrow += 1;
  }
  if(song["status"]["afternoon"] == 1) {
    afternoon += 1;
  }
  if(song["status"]["night"] == 1) {
    night += 1;
  }
}
console.log("tomorrow:", tomorrow);
console.log("afternoon:", afternoon);
console.log("night:", night);
*/

// Mezcla las canciones
function shuffleMusic(music) {
  var amount_music = music.length;
  for (var i = 0; i < amount_music; i++) {
    var random_number = genRanNum(0, (amount_music - 1));
    var temp = music[i];
    music[i] = music[random_number];
    music[random_number] = temp;
  }
  return music;
}

/* Status: ["tomorrow", "afternoon", "nigth"] */
function getMusicUrl(music, id) {
  var link = null;
  var url = ["video", "audio", "others"];
  // if (music[id]["status"]["tomorrow"] == status) {
    var state = true;
    while (state) {
      var random_number = genRanNum(0, 2);
      if (typeof(music[id]["url"][url[random_number]]) == "string") {
        if (music[id]["url"][url[random_number]] != "") {
          link = music[id]["url"][url[random_number]];
          state = false;
        }
      }
      if (typeof(music[id]["url"][url[random_number]]) == "object") {
        var others = music[id]["url"][url[random_number]].length;
        if (others != 0) {
          var random_number_others = genRanNum(0, (others - 1));
          link = music[id]["url"][url[random_number]][random_number_others];
          state = false;
        }
      }
      if (!state) {
        return link;
      }
    }
  // }
}

var id_music = 0; // ID de la música
music = shuffleMusic(music); // Mezcla la música

var player;
var video_id = getMusicUrl(music, id_music); // Obtener el primer elemento del array de objetos "music"
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    width: "640",
    height: "360",
    videoId: video_id,
    playerVars: {
      "autoplay": 1,
      "controls": 1,
      "rel": 0
    },
    events: {
      "onReady": onPlayerReady,
      "onStateChange": onPlayerStateChange,
      "onError": onError
    }
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}

function onPlayerStateChange(event) {
  if (event.data == 0) {
    id_music += 1;
    video_id = getMusicUrl(music, id_music);
    player.loadVideoById({
      "videoId": video_id,
    });
  }
}

function onError(event) {
  console.log(event.data);
  id_music += 1;
  video_id = getMusicUrl(music, id_music);
  player.loadVideoById({
    "videoId": video_id,
  });
}

function stopVideo() {
  player.stopVideo();
}