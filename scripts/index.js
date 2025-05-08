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
const nameInput = newPostModal.querySelector(
  "#card-caption-input"
);
const linkInput = newPostModal.querySelector("#card-image-input");
const addCardFormElement = newPostModal.querySelector(".modal__form");
editProfileModal.querySelector(".modal__form").addEventListener("submit", handleeditSubmitButton);

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}
function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}
editProfileButton.addEventListener("click", function () {
  editProfileNameInput.value = profileNameElement.textContent;
  editProfileDescriptionInput.value = profileDescriptionElement.textContent;
  openModal(editProfileModal);
});

closeEditProfileButton.addEventListener("click", function () {
  closeModal(editProfileModal);
});

addPostButton.addEventListener("click", function () {
  openModal(newPostModal);
});

closeNewPostButton.addEventListener("click", function () {
  closeModal(newPostModal);
});

function handleeditSubmitButton(evt) {
  evt.preventDefault();
  profileNameElement.textContent = editProfileNameInput.value;
  profileDescriptionElement.textContent = editProfileDescriptionInput.value;
  editProfileModal.classList.remove("modal_is-opened");
}


function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  console.log(nameInput.value);
  console.log(linkInput.value);
  newPostModal.classList.remove("modal_is-opened");
}
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);