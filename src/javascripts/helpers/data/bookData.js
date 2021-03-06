import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import firebaseConfig from '../auth/apiKeys';

// API CALLS FOR BOOKS

const dbUrl = firebaseConfig.databaseURL;
// const currentUserId = firebase.auth().currentUser.uid;
// GET BOOKS
const getBooks = (userId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books.json?orderBy="uid"&equalTo="${userId}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});
// DELETE BOOK
const deleteBook = (firebaseKey, userId) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/books/${firebaseKey}.json`)
    .then(() => getBooks(userId).then((booksArray) => resolve(booksArray)))
    .catch((error) => reject(error));
});
// CREATE BOOK
const createBook = (bookObject, userId) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/books.json`, bookObject)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/books/${response.data.name}.json`, body)
        .then(() => {
          getBooks(userId).then((booksArray) => resolve(booksArray));
        });
    }).catch((error) => reject(error));
});

// GET BOOKS ON SALE
const getSaleBooks = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books.json?orderBy="sale"&equalTo=true`)
    .then((response) => {
      console.warn(Object.values(response.data));
      let saleBooksArray = Object.values(response.data);
      console.warn(saleBooksArray);
      saleBooksArray = saleBooksArray.filter((element) => Object.values(element).includes(element.uid));
      resolve(saleBooksArray);
    })
    .catch((error) => reject(error));
});
// UPDATE BOOK
const updateBook = (firebaseKey, bookObject) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/books/${firebaseKey}.json`, bookObject)
    .then(() => getBooks(firebase.auth().currentUser.uid).then((booksArray) => resolve(booksArray)))
    .catch((error) => reject(error));
});

// GET SINGLE BOOK
const getSingleBook = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});
// SEARCH BOOKS

export {
  createBook, getBooks, getSaleBooks, deleteBook, getSingleBook, updateBook
};
