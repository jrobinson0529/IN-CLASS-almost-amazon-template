const editAuthorForm = (authorObject) => {
  document.querySelector('#modal-body').innerHTML = `
    <form id="edit-book-form" class="mb-4">
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input type="text" class="form-control" id="firstName" aria-describedby="firstName" placeholder="Enter First Name" value="${authorObject.first_name}" required>
      </div>
      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input type="text" class="form-control" id="lastName" placeholder="Last Name" required value="${authorObject.last_name}">
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" placeholder="Author's email" value="${authorObject.email}" required>
      </div>
      <div class="form-check mb-2">
        <input type="checkbox" class="form-check-input" id="favorite" ${authorObject.favorite && 'checked'}>
        <label class="form-check-label" for="favorite">Favorited</label>
      </div>
      <button type="submit" id="update-author--${authorObject.firebaseKey}" class="btn btn-success">Update Author</button>
    </form>`;
};

export default editAuthorForm;
