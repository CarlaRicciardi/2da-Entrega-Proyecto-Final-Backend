const admin = require('firebase-admin');

const serviceAccount = require('../../priviFirebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();

class ContenedorFirebase {
  constructor(collectionName) {
    this.collection = db.collection(collectionName);
  }

  async saveObject() {
    let res;
    res = await this.collection.doc().set({ name: 'PRUEBaaaaA' });
    return res;
  }

  async getAll() {
    const res = await this.collection.get();
    let arrayRes = res.docs.map((item) => {
      return { id: item.id, ...item.data() };
    });

    return arrayRes;
  }

  async updateObject() {
    const refDoc = this.collection.doc('H0CI2nLTCwOffSImpO3d');
    const res = await refDoc.update({ age: 50 });
    return res;
  }

  async deleteObject() {
    const res = await this.collection.doc('H0CI2nLTCwOffSImpO3d').delete();
    return res;
  }
}

export default ContenedorFirebase;
