const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const nameSong = $("header h4");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const dashboard = $("#dashboard");
const btnPlay = $(".btn-toggle-play");
const progress = $("#progess");
const btnNext = $(".btn-next");
const btnRepeat = $(".btn-repeat");
const btnRandom = $(".btn-random");
const btnPrev = $(".btn-prev");
var minute = $(".minute");
var second = $(".second");

app = {
  isPlaying: false,
  currentIndex: 0,
  isRandom: false,
  songs: [
    {
      id: 1,
      name: "Một ngày chẳng nắng",
      singer: "Pháo",
      color: "gray",
      image: "./assets/images/img1.jpeg",
      audio: "./assets/audio/audio1.mp3",
    },
    {
      id: 2,
      name: "Muộn rồi mà sao còn",
      singer: "Sơn Tùng MTP",
      color: "yellow",
      image: "./assets/images/img2.png",
      audio: "./assets/audio/audio2.mp3",
    },
    {
      id: 3,
      name: "Tại vì sao",
      singer: "RPT MCK",
      color: "red",

      image: "./assets/images/img3.webp",
      audio: "./assets/audio/audio3.mp3",
    },
    {
      id: 4,
      name: "Nghe như tình yêu",
      singer: "HIEUTHUHAI",
      color: "pink",
      image: "./assets/images/img4.webp",
      audio: "./assets/audio/audio4.mp3",
    },
    {
      id: 5,
      name: "Thích em hơi nhiều",
      singer: "Wren Evans",
      color: "blue",
      image: "./assets/images/img5.jpg",
      audio: "./assets/audio/audio5.mp3",
    },
  ],
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: () => {
        return this.songs[this.currentIndex];
      },
    });
  },
  loadCurrentSong() {
    nameSong.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.audio;
  },
  handleEvent: function () {
    var _this = this;
    const cd = $(".cd");
    var cdWidth = cd.offsetWidth;
    //Xử lý xoay cd
    var cdAnimation = cdThumb.animate(
      [
        {
          transform: "rotate(360deg)",
        },
      ],
      {
        duration: 10000,
        iteration: Infinity,
      }
    );
    cdAnimation.pause();
    document.onload = function(){
    var song = $$(".song");
    console.log(song);
    }
    //Xử lý làm nhỏ cd và làm mờ cd khi lăn chuột
    document.onscroll = function () {
      const scrollTop = document.documentElement.scrollTop || window.scrollY;
      var newCdWidth = cdWidth - scrollTop;
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };
    btnPlay.onclick = function () {
      _this.isPlaying ? audio.pause() : audio.play();
    };
    audio.onplay = function () {
      _this.isPlaying = true;
      dashboard.classList.add("playing");
      cdAnimation.play();
    };
    audio.onpause = function () {
      _this.isPlaying = false;
      dashboard.classList.remove("playing");
      cdAnimation.pause();
    };
    progress.oninput = function (e) {
      var seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
      var setMinute = "0" + Math.floor(seekTime / 60);
      var getSecond = Math.floor(seekTime - setMinute * 60);
      var setSecond = getSecond > 9 ? getSecond : "0" + getSecond;
      console.log(setMinute + ":" + setSecond);
    };
    audio.ontimeupdate = function () {
      if (isNaN(audio.duration)) {
        return;
      }
      var currentProgress = Math.floor(
        (audio.currentTime / audio.duration) * 100
      );
      progress.value = currentProgress;
      if(progress.value == 100) {
        next();
    }
    };
    document.onkeydown = function (e) {
      console.log(e.which);
      switch (e.which) {
        case 32:
          $(".playing") ? audio.pause() : audio.play();
          break;
      }
    };
    btnNext.onclick = function() {
      next();
    };
    function next(){
        _this.currentIndex == _this.songs.length - 1
        ? (_this.currentIndex = 0)
        : _this.currentIndex;
      _this.currentIndex++;
      _this.loadCurrentSong();
      audio.play();
    }
    btnPrev.onclick = function () {
      _this.currentIndex =
        _this.currentIndex < 1 ? (_this.currentIndex = 0) : _this.currentIndex;
      _this.currentIndex--;
      _this.loadCurrentSong();
      audio.play();
    };
    btnRepeat.onclick = function () {
      _this.loadCurrentSong();
      audio.play();
    };
    btnPrev.onclick = function () {
      _this.currentIndex--;
      _this.currentIndex < 1 ? (_this.currentIndex = 0) : _this.currentIndex;
      _this.loadCurrentSong();
      audio.play();
      console.log(_this.currentIndex);
    };
    btnRandom.onclick = function () {
      _this.random = !_this.random;
      btnRandom.classList.toggle("active", _this.random);
      var randomNumber;
      do {
        randomNumber = Math.floor(Math.random() * _this.songs.length);
        console.log(randomNumber + ":" + _this.currentIndex);
        _this.loadCurrentSong();
        audio.play();
      } while (randomNumber === _this.currentIndex);
      _this.currentIndex = randomNumber;
    };
  },

  render: function () {
    progress.value = -50;
    console.log("render " + progress.value);
    var html = this.songs.map((song, index) => {
      return `
        <div class="song">
                <div class="thumb" style="background-Image:url(${song.image})"></div>
                <div class="song-body">
                    <h3>${song.name}</h3>
                    <p>${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fa fa-play"></i>
                </div>
            </div>
        </div>
        `;
    });
    $("#play-list").innerHTML = html.join(" ");
    
  },
  start: function () {
    this.render();
    this.handleEvent();
    this.defineProperties();
    this.loadCurrentSong();
  },
};
app.start();
