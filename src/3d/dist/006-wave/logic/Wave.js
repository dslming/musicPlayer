// import LMThree from '@/3d/THREEJS/LMThree'
const THREE = window.THREE;
class Wave {
    constructor() {
        this.boxColor = 0x1a63ed;
        this.box = {
            size: 1,
            height: 5,
        };
        this.gridSize = 20; // box数量= this.gridSize * this.gridSize
        this.col = this.gridSize;
        this.row = this.gridSize;
        this.boxes = [];
        this.angle = 0;
        this.amplitude = -0.8; // 振幅
        this.waveLength = 200;
    }
    addBoxes(scene) {
        const size = this.box.size;
        const height = this.box.height;
        const geometry = new THREE.BoxGeometry(size, height, size);
        const material = new THREE.MeshPhysicalMaterial({
            color: this.boxColor,
            emissive: 0x0,
            roughness: 1,
            metalness: .1,
            reflectivity: .5 // 反射度
        });
        // col = row = 50
        for (let i = 0; i < this.col; i += size) {
            this.boxes[i] = [];
            for (let j = 0; j < this.row; j += size) {
                const box = new THREE.Mesh(geometry, material);
                box.castShadow = false;
                box.receiveShadow = false;
                box.position.y = height / 2;
                let boxGroup = new THREE.Group();
                boxGroup.add(box);
                boxGroup.scale.set(1, 0.001, 1);
                this.boxes[i][j] = boxGroup;
                boxGroup.position.set(i - this.gridSize * .5, 0, j - this.gridSize * .5);
                scene.add(boxGroup);
            }
        }
        console.log(this.boxes);
    }
    distance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
    }
    // 将(start1~stop1)区域映射到(start2~stop2)
    map(value, start1, stop1, start2, stop2) {
        return (value - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    }
    addStageObjects(scene) {
        this.addBoxes(scene);
        // var axesHelper = new THREE.AxesHelper(20);
        // scene.add(axesHelper);
    }
    drawWave(degree) {
        let size = this.box.size;
        for (let i = 0; i < this.col; i += size) {
            for (let j = 0; j < this.row; j += size) {
                let tempPosX = this.boxes[i][j].position.x;
                let tempPosZ = this.boxes[i][j].position.z;
                const distance = this.distance(tempPosX, tempPosZ, 0, 0);
                const offset = this.map(distance, 0, this.waveLength, 0, 50);
                const angle = this.angle + offset;
                this.boxes[i][j].scale.y = this.map(Math.sin(angle), -1, 1, 0.1, 1);
            }
        }
        this.angle += degree / 400;
    }
}
export default Wave;
