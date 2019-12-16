// https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html#OfflineAudioContext-section
class PlayerAudio {
    constructor() {
        // 对外提供订阅的主题
        this.subject = {
            isReadyPlay: false,
            process: 0,
            playing: false
        };
        this.url = ''; // 下载音乐文件的URL
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!window.AudioContext) {
            alert('Your browser does not support Web Audio API');
        }
        else {
            this.context = new AudioContext();
            this.source = null;
            this.analyser = this.context.createAnalyser();
            this.offset = 0;
            this.startTime = 0;
            this.playbackRate = 1;
            this.buffer = null; // 音乐文件
            this.loop = true;
        }
    }
    loadAudio(url) {
        // 重置状态
        let that = this;
        this.offset = 0;
        this.startTime = 0;
        this.source = null;
        this.buffer = null;
        // 获取新的音乐
        let axios = window.axios;
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: url,
                responseType: 'arraybuffer',
                timeout: 5000,
            }).then((v) => {
                that.context.decodeAudioData(v.data, buffer => {
                    that.buffer = buffer;
                    that.subject.isReadyPlay = true;
                    console.error("over");
                    resolve();
                });
            });
        });
    }
    // 网络加载音乐
    loadAudio_old(filePath) {
        let that = this;
        this.url = filePath;
        this.offset = 0;
        this.startTime = 0;
        this.source = null;
        this.buffer = null;
        var request = new XMLHttpRequest();
        request.open('GET', filePath, true);
        request.responseType = 'arraybuffer';
        request.send();
        return new Promise((resolve, reject) => {
            request.onload = () => {
                // console.log(request.response);
                that.context.decodeAudioData(request.response, buffer => {
                    that.buffer = buffer;
                });
                resolve();
            };
            // 进度
            request.addEventListener('progress', (event) => {
                let p = event.loaded / event.total * 100;
                that.subject.process = Number.parseInt(p);
                if (that.subject.process === 100) {
                    that.subject.isReadyPlay = true;
                    console.error(100);
                }
            });
        });
    }
    // 本地加载音乐
    loadAudioLocal(file) {
        let that = this;
        const audioEle = new Audio();
        audioEle.autoplay = true;
        audioEle.preload = 'auto';
        audioEle.src = URL.createObjectURL(file);
        audioEle.loop = true;
        document.body.appendChild(audioEle);
        that.source = that.context.createMediaElementSource(audioEle);
        that.subject.playing = true;
        that.subject.process = 100;
        that.subject.isReadyPlay = true;
        that._setupAudioNodes();
    }
    play() {
        if (this.subject.isReadyPlay) {
            this.source = this.context.createBufferSource();
            this.source.buffer = this.buffer;
            this.source.loop = this.loop;
            this.source.playbackRate.setValueAtTime(this.playbackRate, this.startTime);
            this.startTime = this.context.currentTime;
            this.source.start(this.startTime, this.offset);
            this.subject.playing = true;
            this._setupAudioNodes();
        }
        else {
            this.subject.playing = false;
            alert('Audio is not ready');
        }
    }
    pause() {
        if (this.subject.playing === true) {
            this.source.stop();
            this.source.onended = null;
            this.offset += (this.context.currentTime - this.startTime) * this.playbackRate;
            this.subject.playing = false;
        }
        return this;
    }
    onended() {
        this.subject.playing = false;
    }
    _setupAudioNodes() {
        this.analyser.smoothingTimeConstant = 0.3;
        this.analyser.fftSize = 2048;
        this.source.connect(this.analyser);
        this.source.connect(this.context.destination);
    }
    getFrequencyData() {
        let freqData = new Uint8Array(this.analyser.frequencyBinCount);
        this.analyser.getByteFrequencyData(freqData);
        return freqData;
    }
    getAverageFrequency() {
        let value = 0;
        let data = this.getFrequencyData();
        for (var i = 0; i < data.length; i++) {
            value += data[i];
        }
        return value / data.length;
    }
    /**
     * 增加主题订阅者
     * @param {*} observer 监听者
     * @param {*} event 监听的事件
     *
     */
    addSubjectListener(event, callback) {
        let that = this;
        switch (event) {
            case 'isReadyPlay':
                that.subject = new Proxy(that.subject, {
                    set: (target, key, value) => {
                        target[key] = value;
                        if (value === true && key === 'isReadyPlay') {
                            callback();
                        }
                        return true;
                    }
                });
                break;
            case 'process':
                that.subject = new Proxy(that.subject, {
                    set: (target, key, value) => {
                        target[key] = value;
                        if (key === 'process') {
                            callback(value);
                        }
                        return true;
                    }
                });
                break;
        }
    }
}
export default new PlayerAudio();
