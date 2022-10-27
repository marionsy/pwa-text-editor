import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// Exports function that will POST to database
export const putDb = async (content) => {

  // Creates a connection to the database and version we want to use
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges
  const tx = jateDb.transaction('jate', 'readwrite');

  // Open up the desired object store
  const store = tx.objectStore('jate');

  // Uses the .add() method on the store to pass in content
  const request = store.add({ jate: content });

  // Confirmation of request
  const result = await request;
  console.log('Data saved to database!', result);
};

// TODO: Add logic for a method that gets all the content from the database
// Exports function that will GET all from the database
export const getDb = async () => {
  // Creates a connection to the database and version we want to use
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges
  const tx = jateDb.transaction('jate', 'readonly');

  // Open up the desired object store
  const store = tx.objectStore('todos');

  // Uses the .getAll() method to get all data in database
  const request = store.getAll();

  // Confirmation of request
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
