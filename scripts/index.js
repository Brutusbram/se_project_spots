const editProfileButton = document.querySelector(".profile__edit");
const editProfileModal = document.querySelector("#edit-profile-modal");
const closeEditProfileButton = editProfileModal.querySelector(
  ".modal__close-button"
);
const editProfileNameInput =
  editProfileModal.querySelector("#modal__name-input");
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#modal__description-input"
);

const addPostButton = document.querySelector(".profile__add");
const newPostModal = document.querySelector("#new-post-modal");
const closeNewPostButton = newPostModal.querySelector(".modal__close-button");
const profileNameElement = document.querySelector(".profile__name");
const profileDescriptionElement = document.querySelector(
  ".profile__description"
);
const editSubmitButton = editProfileModal.querySelector(
  ".modal__submit-button"
);
const addCardFormElement = document.querySelector("#new-post-modal");
const nameInput = newPostModal.querySelector(
  "#card-caption-input"
);
const linkInput = newPostModal.querySelector("#card-image-input");

editProfileButton.addEventListener("click", function () {
  editProfileNameInput.value = profileNameElement.textContent;
  editProfileDescriptionInput.value = profileDescriptionElement.textContent;
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

function handleeditSubmitButton(evt) {
  evt.preventDefault();
  profileNameElement.textContent = editProfileNameInput.value;
  profileDescriptionElement.textContent = editProfileDescriptionInput.value;
  editProfileModal.classList.remove("modal_is-opened");
}
editProfileModal.querySelector(".modal__form").addEventListener("submit", handleeditSubmitButton);

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  console.log(nameInput.value);
  console.log(linkInput.value);
  newPostModal.classList.remove("modal_is-opened");
}
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);