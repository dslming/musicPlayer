import Tool from '../../common/Tool';
const TweenMax = window.TweenMax;
class CatAction {
    static blink(catMesh) {
        let head = Tool.findMesh(catMesh, 'head');
        let rightEye = Tool.findMesh(head, 'rightEye');
        let leftEye = Tool.findMesh(head, 'leftEye');
        switch (CatAction.randomNum(1, 3)) {
            case 1:
                TweenMax.to(rightEye.scale, 0.07, { y: 0, 'yoyo': true, 'repeat': 1 });
                break;
            case 2:
                TweenMax.to(leftEye.scale, 0.07, { y: 0, 'yoyo': true, 'repeat': 1 });
                break;
            case 3:
                TweenMax.to(rightEye.scale, 0.07, { y: 0, 'yoyo': true, 'repeat': 1 });
                TweenMax.to(leftEye.scale, 0.07, { y: 0, 'yoyo': true, 'repeat': 1 });
                break;
        }
    }
    static updateTail(catMesh, data) {
        // 0.05
        CatAction.t += data;
        let tails = [];
        let p = Tool.findMesh(catMesh, 'tail');
        // 已经事先知道是7节尾巴
        for (let i = 0; i < 7; i++) {
            let c = Tool.findMesh(p, `t${i}`);
            tails.push(c);
            p = c;
        }
        for (var i = 0; i < tails.length; i++) {
            var angleAmp = Math.pow(0.8, i); // 幂函数
            var rotZ = Math.sin(this.t) * (angleAmp / 2);
            tails[i].rotation.z = rotZ;
        }
    }
    static updataHead(catMesh) {
        let head = Tool.findMesh(catMesh, 'head');
        TweenMax.to(head.rotation, 1, { z: -0.5 });
        setTimeout(() => {
            TweenMax.to(head.rotation, 1, { z: 0.5 });
        }, 1000);
    }
    static randomNum(minNum, maxNum) {
        switch (arguments.length) {
            case 1:
                let t = Math.random() * minNum + 1;
                return parseInt(t, 10);
                break;
            case 2:
                return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                break;
            default:
                return 0;
                break;
        }
    }
}
CatAction.t = 0;
export default CatAction;
