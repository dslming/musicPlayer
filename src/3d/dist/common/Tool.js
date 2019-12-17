class Tool {
    static findMesh(father, name) {
        let ret = null;
        if (father && father.children && father.children.find) {
            ret = father.children.find((item) => { return item.name === name; });
        }
        else {
            console.error(father, "findMesh");
        }
        return ret;
    }
}
export default Tool;
