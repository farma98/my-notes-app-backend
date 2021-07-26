// Mengimport file bernama handler.js
const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
} = require("./handler");
// Membuat sebuah route
const routes = [
  {
    method: "POST",
    path: "/notes",
    // Menambahkan function addNoteHandler dari handler.js
    handler: addNoteHandler,
  },
  {
    method: "GET",
    path: "/notes",
    // Menambahkan function getAllNotesHandler dari handler.js
    handler: getAllNotesHandler,
  },
  {
    method: "GET",
    path: "/notes/{id}",
    // Menambahkan function getNotebyIdHandler dari handler.js
    handler: getNoteByIdHandler,
  },
  {
    method: "PUT",
    path: "/notes/{id}",
    handler: editNoteByIdHandler,
  },
  {
    method: "DELETE",
    path: "/notes/{id}",
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes;
