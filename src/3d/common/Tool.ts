class Tool {
  static findMesh(father: any, name: string) {
    let ret = null
    if (father && father.children && father.children.find) {
      ret = father.children.find((item: any) => { return item.name === name })
    } else {
      console.error(father, "findMesh");
    }
    return ret
  }
}
export default Tool
