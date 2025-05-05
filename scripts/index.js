const editProfileButton = document.querySelector(".profile__edit");
const editProfileModal = document.querySelector("#edit-profile-modal");
const closeEditProfileButton = editProfileModal.querySelector(
  ".modal__close-button"
);
const addPostButton = document.querySelector(".profile__add");
const newPostModal = document.querySelector("#new-post-modal");
const closeNewPostButton = newPostModal.querySelector(".modal__close-button");

editProfileButton.addEventListener("click", function () {
  editProfileModal.classList.add("modal_is-opened");
});

closeEditProfileButton.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

addPostButton.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});

closeNewPostButton.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});
