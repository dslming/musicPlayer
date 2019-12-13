class PlayerMode {
  constructor() {
    this.type = "normal"
    this.currentTrack = null
    this.isTimerPlaying = null
    this.transitionName = ""
    this.currentTrackIndex = -1
    this.audio = new Audio();
    this.tracks = [
      {
        index: 0,
        name: "MekanÃ„Â±n Sahibi",
        artist: "Norm Ender",
        cover: "./music/1.jpg",
        source: "./music/1.mp3",
        url: "https://www.youtube.com/watch?v=z3wAjJXbYzA",
        favorited: false
      },
      {
        index: 1,
        name: "2",
        artist: "2",
        cover: "./music/2.jpg",
        source: "./music/2.mp3",
        url: "https://www.youtube.com/watch?v=z3wAjJXbYzA",
        favorited: false
      }
      // {
      //   name: "Everybody Knows",
      //   artist: "Leonard Cohen",
      //   cover:
      //     "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/2.jpg",
      //   source:
      //     "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/2.mp3",
      //   url: "https://www.youtube.com/watch?v=Lin-a2lTelg",
      //   favorited: true
      // },
      // {
      //   name: "Extreme Ways",
      //   artist: "Moby",
      //   cover:
      //     "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/3.jpg",
      //   source:
      //     "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/3.mp3",
      //   url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
      //   favorited: false
      // },
      // {
      //   name: "Butterflies",
      //   artist: "Sia",
      //   cover:
      //     "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/4.jpg",
      //   source:
      //     "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/4.mp3",
      //   url: "https://www.youtube.com/watch?v=kYgGwWYOd9Y",
      //   favorited: false
      // },
      // {
      //   name: "The Final Victory",
      //   artist: "Haggard",
      //   cover:
      //     "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/5.jpg",
      //   source:
      //     "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/5.mp3",
      //   url: "https://www.youtube.com/watch?v=0WlpALnQdN8",
      //   favorited: true
      // },
      // {
      //   name: "Genius ft. Sia, Diplo, Labrinth",
      //   artist: "LSD",
      //   cover:
      //     "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/6.jpg",
      //   source:
      //     "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/6.mp3",
      //   url: "https://www.youtube.com/watch?v=HhoATZ1Imtw",
      //   favorited: false
      // },
      // {
      //   name: "The Comeback Kid",
      //   artist: "Lindi Ortega",
      //   cover:
      //     "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/7.jpg",
      //   source:
      //     "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/7.mp3",
      //   url: "https://www.youtube.com/watch?v=me6aoX0wCV8",
      //   favorited: true
      // },
      // {
      //   name: "Overdose",
      //   artist: "Grandson",
      //   cover:
      //     "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/8.jpg",
      //   source:
      //     "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/8.mp3",
      //   url: "https://www.youtube.com/watch?v=00-Rl3Jlx-o",
      //   favorited: false
      // },
      // {
      //   name: "Rag'n'Bone Man",
      //   artist: "Human",
      //   cover:
      //     "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/9.jpg",
      //   source:
      //     "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/9.mp3",
      //   url: "https://www.youtube.com/watch?v=L3wKzyIN1yk",
      //   favorited: false
      // }
    ]
  }

  setData(obj) {
    let keys = Object.keys(obj)
    keys.forEach(item => {
      if (this[item] !== undefined) {
        if (obj[item] instanceof Object) {
          this[item] = { ...this[item], ...obj[item] }
        } else {
          this[item] = obj[item]
        }
      } else {
        console.error(keys, this[item]);
        console.error(`${item, this[item]}, setData 参数设置非法`);
      }
    });
  }

  setCurrentTrack({ currentTrack }) {
    this.currentTrack = currentTrack
    this.tracks[currentTrack.index] = currentTrack
  }

  getData() {
    return this
  }

  initAudio() {
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = () => {
      this.generateTime();
    };
    this.audio.onloadedmetadata = () => {
      this.generateTime();
    };
    this.audio.onended = () => {
      this.isTimerPlaying = true;
    };
  }

  generateTime() {
    let width = (100 / this.audio.duration) * this.audio.currentTime;
    this.barWidth = width + "%";
    this.circleLeft = width + "%";
    let durmin = Math.floor(this.audio.duration / 60);
    let dursec = Math.floor(this.audio.duration - durmin * 60);
    let curmin = Math.floor(this.audio.currentTime / 60);
    let cursec = Math.floor(this.audio.currentTime - curmin * 60);
    if (durmin < 10) {
      durmin = "0" + durmin;
    }
    if (dursec < 10) {
      dursec = "0" + dursec;
    }
    if (curmin < 10) {
      curmin = "0" + curmin;
    }
    if (cursec < 10) {
      cursec = "0" + cursec;
    }
    this.duration = durmin + ":" + dursec;
    this.currentTime = curmin + ":" + cursec;
  }

  resetPlayer() {
    // this.barWidth = 0;
    // this.circleLeft = 0;
    this.audio.currentTime = 0;
    this.audio.src = this.currentTrack.source;
    setTimeout(() => {
      if (this.isTimerPlaying) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
    }, 300);
  }
}

export default new PlayerMode()
