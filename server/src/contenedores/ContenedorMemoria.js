class ContenedorMemoria {
    constructor() {
      this.items = [];
    }
    saveObject(newObject) {
      this.items.push(newObject);
      return this.items[this.items.length - 1];
    }
  
    getAll() {
      return this.items;
    }
    getById(id) {
      const found = this.items.find((item) => item.id == id);
      if (!found) {
        throw new Error('Error: object not find');
      } else {
        return found;
      }
    }
  }
  
  export default ContenedorMemoria;
  