// Memanggil library hapi
const Hapi = require("@hapi/hapi");
// Mengimport file bernama router.js
const routes = require("./routes");
// Configurasi htpp hapi
const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });
  // Memanggil route server hapi dari router.js
  server.route(routes);
  // Perintah jalankan server
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
