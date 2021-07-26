// Mengimport library pihak ketiga
const { nanoid } = require("nanoid");
// Mengimport file bernama notes.js
const notes = require("./notes");

// Menambahkan sebuah fungsi addNoteHandler menambahkan catatan
const addNoteHandler = (request, h) => {
  // Untuk mendapatkan respon body dari Hapi
  const { title, tags, body } = request.payload;
  // Menangani Properti Lain
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  // Membuat sebuah array untuk menampung properti
  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };
  // Menambahkan array ke file notes
  notes.push(newNote);
  // Pengecekan notes true atau false isinya
  const isSuccess = notes.filter((note) => note.id === id).length > 0;
  // Logika Pengecekan Dengan if else memanfaatkan server hapi
  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Catatan berhasil ditambahkan",
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Catatan gagal ditambahkan",
  });
  response.code(500);
  return response;
};

// Menambahkan sebuah fungsi getAllNotesHandler menampilkan semua catatan
const getAllNotesHandler = () => ({
  status: "success",
  data: {
    notes,
  },
});

// Menambahkan sebuah fungsi getNoteByIdHandler menampilkan catatan sesuai id
const getNoteByIdHandler = (request, h) => {
  // Untuk mendapatkan id dari request params
  const { id } = request.params;
  // Untuk mendapatkan objek berdasarkan id dengan fungsi filter
  const note = notes.filter((n) => n.id === id)[0];
  // Logikan pengecekan catatan tersedia atau tidak
  if (note !== undefined) {
    return {
      status: "success",
      data: {
        note,
      },
    };
  }
  const response = h.response({
    status: "fail",
    message: "Catatan tidak ditemukan",
  });
  response.code(404);
  return response;
};

// Menambahkan sebuah fungsi editNoteByIdHandler mengubah catatan sesuai id
const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  // Mengecek id catatan yang ingin diedit
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = h.response({
      status: "success",
      message: "Catatan berhasil diperbarui",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui catatan. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

// Menambahkan sebuah fungsi editNoteByIdHandler menghapus catatan sesuai id
const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Catatan berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Catatan gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
