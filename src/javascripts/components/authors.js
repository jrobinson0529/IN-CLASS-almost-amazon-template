// FIXME: STUDENTS show your authors

const showAuthors = (array) => {
  document.querySelector('#store').innerHTML = '';
  // CREATE A BUTTON TO ADD BOOKS

  array.forEach((author) => {
    // FIXME: STUDENTS create cards for your authors
    document.querySelector('#store').innerHTML += `<div class="card" style="width: 18rem;">
    <ul class="list-group list-group-flush">
      <li class="list-group-item">${author.first_name}</li>
      <li class="list-group-item">${author.last_name}</li>
      <li class="list-group-item">${author.email}</li>
      <button class="btn btn-danger" id="delete-author--${author.firebaseKey}">Delete author</button>
    </ul>
  </div>`;
  });
};

const emptyAuthors = () => {
  document.querySelector('#store').innerHTML = '<h1>No Authors</h1>';
};

export { showAuthors, emptyAuthors };
