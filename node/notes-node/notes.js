const fs = require('fs');

var fetch = () => {
  try {
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (error) {
    return [];
  }
};

var save = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
  var notes = fetch();
  var note = {
    title,
    body
  };
  var duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    save(notes);
    return note;
  }
};

var getAll = () => {
  return fetch();
};

var getOne = (title) => {
  var notes = fetch();
  var filtered = notes.filter(note => note.title === title);
  return filtered[0];
};

var remove = (title) => {
  var notes = fetch();
  var filtered = notes.filter(note => note.title !== title);
  save(filtered);

  return notes.length !== filtered.length;
};

var printNote = (note) => {
  console.log('---');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
}

module.exports = {
  addNote,
  getAll,
  getOne,
  remove,
  print: printNote
};

