require('colors');
const { app } = require('./app');
const { db } = require('./utils/databae');

db.authenticate()
  .then(() => {
    console.log('datos autenticados'.magenta);
  })
  .catch(err => console.log(err));

db.sync()
  .then(() => {
    console.log('datos sincronizados'.magenta);
  })
  .catch(err => console.log(err));

PORT = 4250;

app.listen(PORT, () => {
  console.log(
    `El servidor esta montado en el puerto ${PORT}, esta funcionando`.cyan
  );
});
