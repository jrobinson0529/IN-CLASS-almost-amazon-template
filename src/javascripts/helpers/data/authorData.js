// API CALLS FOR AUTHORS
import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import firebaseConfig from '../auth/apiKeys';

// GET AUTHORS
const dbUrl = firebaseConfig.databaseURL;

const getAuthors = (userId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors.json?orderBy="uid"&equalTo="${userId}"`)
    .then((response) => {
      if (response.data) {
        const authorArray = Object.values(response.data);
        resolve(authorArray);
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});
// DELETE AUTHOR
const deleteAuthor = (firebaseKey, userId) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/authors/${firebaseKey}.json`)
    .then(() => getAuthors(userId).then((authorsArray) => resolve(authorsArray)))
    .catch((error) => reject(error));
});
// CREATE AUTHOR
const createAuthor = (authorObject, userId) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/authors.json`, authorObject)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/authors/${response.data.name}.json`, body)
        .then(() => {
          getAuthors(userId).then((authorsArray) => resolve(authorsArray));
        });
    }).catch((error) => reject(error));
});

// GET FAVORITE AUTHORS
const getFavoriteAuthors = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors.json?orderBy="favorite"&equalTo=true`)
    .then((response) => {
      const favAuthorsArray = Object.values(response.data);
      resolve(favAuthorsArray);
    })
    .catch((error) => reject(error));
});
// GET A SINGLE AUTHOR
const getSingleAuthor = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});
// UPDATE AUTHOR
const updateAuthor = (firebaseKey, authorObject) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/author/${firebaseKey}.json`, authorObject)
    .then(() => getAuthors(firebase.auth().currentUser.uid).then((booksArray) => resolve(booksArray)))
    .catch((error) => reject(error));
});
// SEARCH AUTHORS
export {
  createAuthor, getAuthors, getFavoriteAuthors, deleteAuthor, getSingleAuthor, updateAuthor
};
