async function connectMG() {
  try {
    await connect(
      'mongodb+srv://carlaRicciardi:mongoatlas123@cluster0.tdnzcdj.mongodb.net/?retryWrites=true&w=majority',
      { useNewUrlParser: true }
    );
  } catch (e) {
    console.log(e);
    throw 'can not connect to the db';
  }
}

console.log('conectanto...');
await connectMG();
console.log('conectado!!!');

// class ContenedorMongoDB {
//   constructor() {

//   }
// }
