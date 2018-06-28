const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleCommand = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
}

const bodyCommand = {
  describe: 'The body of note',
  demand: true,
  alias: 'b'
}

const argv = yargs
  .command('add', 'Add a new note', {
    title: titleCommand,
    body: bodyCommand
  })
  .command('list', 'List notes')
  .command('read', 'Read a note', {
    title: titleCommand
  })
  .command('remove', 'Remove a note', {
    title: titleCommand
  })
  .help()
  .argv;
var command = argv._[0];

switch(command) {
  case 'add':
    var note = notes.addNote(argv.title, argv.body);

    if (note === undefined) {
      console.log('Note not added');
    } else {
      console.log('Note added');
      notes.print(note);
    }
    break;
  case 'list':
    var notesList = notes.getAll();

    if (notesList.length === 0) {
      console.log('No notes found');
    } else {
      console.log(`${notesList.length} note(s) found`);
      notesList.map(note => notes.print(note));
    }
    break;
  case 'read':
    var note = notes.getOne(argv.title);

    if (note === undefined) {
      console.log('Note not found');
    } else {
      console.log('Note found');
      notes.print(note);
    }
    break;
  case 'remove':
    var removed = notes.remove(argv.title);
    var message = removed ? 'Note removed' : 'Note removed';
    console.log(message);
    break;
  default:
    console.log('Unknown command');
}
