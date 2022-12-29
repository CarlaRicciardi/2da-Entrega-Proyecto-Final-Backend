import fs from 'fs';

class ContenedorArchivo {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async getAll() {
    try {
      const objs = await fs.promises.readFile(this.ruta, 'utf-8');
      if (objs) {
        const allObjects = await JSON.parse(objs);
        return allObjects;
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  async getById(id) {
    const objects = await this.getAll();
    const findObject = objects.find((object) => object.id == id);
    if (findObject) {
      return findObject;
    } else {
      return { error: 'object not find' };
    }
  }

  async saveObject(newObject) {
    try {
      const objects = await this.getAll();
      let id;

      if (!objects || !objects.length) {
        id = 1;
      } else {
        objects.forEach((obj) => {
          id = obj.id;
        });
        id = id + 1;
      }

      const save =
        objects && objects.length
          ? [...objects, { ...newObject, id }]
          : [{ ...newObject, id }];
      await fs.promises.writeFile(this.ruta, JSON.stringify(save), {
        encoding: 'utf-8',
      });
      return 'Saved succesfully!';
    } catch (error) {
      return { error };
    }
  }

  async updateObject(object) {
    try {
      const objects = await this.getAll();
      const object = await this.getById(object.id);

      if (object) {
        const objectUpdated = [...objects, object];
        await fs.promises.writeFile(this.ruta, JSON.stringify(objectUpdated), {
          encoding: 'utf-8',
        });
        return 'Object Updated succesfully';
      } else {
        throw new Error('object not find');
      }
    } catch (error) {
      return { error };
    }
  }

  async deleteObject(id) {
    try {
      const objects = await this.getAll();
      const object = await this.getById(id);

      if (!objects || !objects.length || !object) {
        return { error: 'object not find!' };
      } else {
        const newObjects = objects.filter((obj) => obj.id != object.id);
        console.log(newObjects);
        await fs.promises.writeFile(this.ruta, JSON.stringify(newObjects), {
          encoding: 'utf-8',
        });
        return 'object deleted succesfully';
      }
    } catch (error) {
      return { error };
    }
  }

  async deleteAll() {
    await fs.writeFileSync(this.file, '[]');
    return 'Se han eliminado todos los productos';
  }
}

export default ContenedorArchivo;
