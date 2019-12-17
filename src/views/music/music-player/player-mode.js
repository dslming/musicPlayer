import LMAudio from '@/3d/dist/PlayerAudio/PlayerAudio'
let that = null
class PlayerMode {
  constructor() {
    that = this
    this.type = "normal"
    this.currentTrack = null
    // 播放状态
    this.isTimerPlaying = false
    this.transitionName = ""
    this.currentTrackIndex = -1
    // this.audio = new Audio();
    this.audio = LMAudio//new LMAudio()
    let baseUrl = "https://dslming.com/resources/audio/"
    // let baseUrl = "./music/"
    let tempList = [
      {
        index: 0,
        name: "1, 2, 3! (Japanese Ver.)",
        artist: "胜利",
        cover: "0.jpg",
        source: "0.mp3",
        favorited: false
      },
      {
        index: 1,
        name: "Hi Hi Bye Bye",
        artist: "王心凌",
        cover: "1.jpg",
        source: "1.mp3",
        favorited: false
      },
      {
        index: 2,
        name: "热雪",
        artist: "魏晨",
        cover: "2.jpg",
        source: "2.mp3",
        favorited: false
      },
      {
        index: 3,
        name: "人生浪费指南",
        artist: "夏日入侵企画",
        cover: "3.jpg",
        source: "3.mp3",
        favorited: false
      },
      {
        index: 4,
        name: "bad guy",
        artist: "Billie Eilish",
        cover: "4.jpg",
        source: "4.mp3",
        favorited: false
      },
      {
        index: 5,
        name: "2002",
        artist: "J.Fla",
        cover: "5.jpg",
        source: "5.mp3",
        favorited: false
      },
      {
        index: 6,
        name: "Monsters",
        artist: "Katie Sky",
        cover: "6.jpg",
        source: "6.mp3",
        favorited: false
      },
      {
        index: 7,
        name: "Do It Again",
        artist: "Madeline Juno",
        cover: "7.jpg",
        source: "7.mp3",
        favorited: false
      }
    ]
    for (let i = 0; i < tempList.length; i++) {
      tempList[i].source = baseUrl + tempList[i].source
      tempList[i].cover = baseUrl + tempList[i].cover
    }
    this.tracks = tempList
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
    this.audio.loadAudio(this.currentTrack.source)
    // this.audio.src = this.currentTrack.source;
    // this.audio.ontimeupdate = () => {
    //   this.generateTime();
    // };
    // this.audio.onloadedmetadata = () => {
    //   this.generateTime();
    // };
    // this.audio.onended = () => {
    //   this.isTimerPlaying = true;
    // };
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
    that.audio.currentTime = 0;
    // that.audio.src = that.currentTrack.source;
    that.audio.pause()
    // console.error(that.currentTrack.source);
    that.audio.loadAudio(that.currentTrack.source).then(() => {
      if (that.isTimerPlaying) {
        that.audio.play();
      } else {
        that.audio.pause();
      }
    })
    // setTimeout(() => {

    // }, 1000);
  }
}

export default new PlayerMode()
