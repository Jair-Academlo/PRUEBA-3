require('colors');

const { Users } = require('./models/users.model');
const { Games } = require('./models/games.model');
const { Reviews } = require('./models/reviews.model');
const { Consoles } = require('./models/consoles.model');

const { app } = require('./app');
const { db } = require('./utils/databae');

db.authenticate()
  .then(() => {
    console.log('datos autenticados'.magenta);
  })
  .catch(err => console.log(err));

//reciones de tablas
//relacion muchos a uno
//usuarios muchas reseñas, reseña pertece a usuario.
Users.hasMany(Reviews);
Reviews.belongsTo(Users);

Games.hasMany(Reviews);
Reviews.belongsTo(Games);

//relacion de muchos a muchos
//En esta tabla toca especificar el modelo de relacion por medio del through
Games.belongsToMany(Consoles, { through: 'gamesInConsoles' });
Consoles.belongsToMany(Games, { through: 'gamesInConsoles' });

db.sync({ force: false })
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
