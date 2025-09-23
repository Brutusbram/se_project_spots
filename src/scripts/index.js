import {
  enableValidation,
  config,
  resetValidation,
  disableButton,
} from "./validation.js";
import "../pages/index.css";
import Api from "./Utils/Api.js";
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "441c91a0-0ec5-41c5-8e89-56878c465a29",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    profileNameElement.textContent = userInfo.name;
    profileDescriptionElement.textContent = userInfo.about;
    profileAvatar.src = userInfo.avatar;
    profileAvatar.alt = `${userInfo.name} Avatar`;
    cards.forEach(function (item) {
      const cardElement = getCardElement(item);
      cardList.append(cardElement);
    });
  })
  .catch((error) => {
    console.error("Error fetching initial cards:", error);
  });

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
const editAvatarButton = document.querySelector(".profile__avatar-edit-btn");
const editAvatarModal = document.querySelector("#edit-avatar-modal");
const closeEditAvatarButton = editAvatarModal.querySelector(
  "#close-edit-avatar-button"
);
const editAvatarForm = editAvatarModal.querySelector(".modal__form");
const newAvatarSubmitButton = editAvatarModal.querySelector("#submitAvatar");
const editAvatarUrlInput = editAvatarModal.querySelector("#avatar-image-input");

const nameInput = newPostModal.querySelector("#card-caption-input");
const linkInput = newPostModal.querySelector("#card-image-input");
const addCardFormElement = newPostModal.querySelector(".modal__form");
editProfileModal.querySelector(".modal__form").addEventListener("submit", handleEditSubmitButton);
const imagePreviewModal = document.querySelector("#preview-image-modal");
const previewImageCloseButton = imagePreviewModal.querySelector(
  ".modal__close-button-preview"
);
const imagePreviewElement = imagePreviewModal.querySelector(".modal__image");
const imagePreviewCaption = imagePreviewModal.querySelector(".modal__caption");
const cardSubmitButton = newPostModal.querySelector(".modal__submit-button");
const cardTemplate = document.querySelector("#card__template");
const cardList = document.querySelector(".cards__list");
const saveDeleteButton = document.querySelector(".modal__save_delete-button");
const cancelDeleteButton = document.querySelector(
  ".modal__cancel_delete-button"
);
const profileEditSubmitButton = editProfileModal.querySelector(
  ".modal__submit-button"
);
const deleteImageModal = document.querySelector("#modal__delete-image");
const profileAvatar = document.querySelector(".profile__avatar");
const modalDeleteForm = deleteImageModal.querySelector(".modal__delete-form");
let selectedCard;
let selectedCardId;

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  if (data.isLiked === true) {
    const likeButton = cardElement.querySelector(".card__like-button");
    likeButton.classList.add("card__like-button_active");
  }
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  const likeButton = cardElement.querySelector(".card__like-button");

  function handleLikeButton(evt, id) {
    const isLiked = evt.target.classList.contains("card__like-button_active");
    api
      .changeLike({ id: id, isLiked: isLiked })
      .then((data) => {
        likeButton.classList.toggle("card__like-button_active");
      })
      .catch((error) => {
        console.error("Error updating like status:", error);
      });
  }

  likeButton.addEventListener("click", (evt) =>
    handleLikeButton(evt, data._id)
  );

  const deleteButton = cardElement.querySelector(".card__delete-button");

  function handleDeleteCard(cardElement, cardId) {
    selectedCard = cardElement;
    selectedCardId = cardId;
    openModal(deleteImageModal);
  }

  deleteButton.addEventListener("click", (evt) =>
    handleDeleteCard(cardElement, data._id)
  );


  cardImage.addEventListener("click", function () {
    imagePreviewElement.src = data.link;
    imagePreviewElement.alt = data.name;
    imagePreviewCaption.textContent = data.name;
    openModal(imagePreviewModal);
  });

  return cardElement;
}

function keyDownHandler(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", keyDownHandler);
  document.addEventListener("click", clickOutsideHandler);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", keyDownHandler);
  document.removeEventListener("click", clickOutsideHandler);
}

editProfileButton.addEventListener("click", function () {
  openModal(editProfileModal);
  editProfileNameInput.value = profileNameElement.textContent;
  editProfileDescriptionInput.value = profileDescriptionElement.textContent;
  profileEditSubmitButton.disabled = false;
  resetValidation(editProfileModal, config);
});

function clickOutsideHandler(event) {
  if (event.target.classList.contains("modal_is-opened")) {
    closeModal(event.target);
  }
}

function handleAvatarEditSubmitButton(evt) {
  console.log("Edit avatar form submitted");
  evt.preventDefault();
  newAvatarSubmitButton.textContent = "Saving..."
  api
    .editUserAvatar({ avatar: editAvatarUrlInput.value })
    .then((data) => {
      profileAvatar.src = data.avatar;
       closeModal(editAvatarModal);
      editAvatarForm.reset();
      newAvatarSubmitButton.disabled = true;
    })
    .catch((error) => {
      console.error("Error updating user avatar:", error);
    })
    .finally(() => {
      newAvatarSubmitButton.textContent = "Save";

    });
}

function handleNewCardFormSubmit(evt) {
  console.log("Add Card form submitted");
  evt.preventDefault();
  const submitButton = evt.submitter;
  submitButton.textContent = "Saving...";
  api
    .addCard({ name: nameInput.value, link: linkInput.value })
    .then((data) => {
      const cardElement = getCardElement(data);
      cardList.prepend(cardElement);
      closeModal(newPostModal);
      submitButton.disabled = true;
      addCardFormElement.reset();
    })
    .catch((error) => {
      console.error("Error adding new image:", error);
    })
    .finally(() => {
      submitButton.textContent = "Save";

    });
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  submitButton.textContent = "Deleting...";
  api
    .deleteCard({ id: selectedCardId })
    .then((data) => {
      selectedCard.remove();
      closeModal(deleteImageModal);
    })
    .catch((error) => {
      console.error("Error deleting card:", error);
    })
    .finally(() => {
      submitButton.textContent = "Yes, delete";
    });
}

modalDeleteForm.addEventListener("submit", handleDeleteSubmit);

addCardFormElement.addEventListener("submit", handleNewCardFormSubmit);
cancelDeleteButton.addEventListener("click", function () {
  closeModal(deleteImageModal);
});
editAvatarButton.addEventListener("click", function () {
  openModal(editAvatarModal);
});

closeEditAvatarButton.addEventListener("click", function () {
  closeModal(editAvatarModal);
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

previewImageCloseButton.addEventListener("click", function () {
  closeModal(imagePreviewModal);
});

editAvatarForm.addEventListener("submit", handleAvatarEditSubmitButton);

function handleEditSubmitButton(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  submitButton.textContent = "Saving...";
  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((data) => {
      profileNameElement.textContent = data.name;
      profileDescriptionElement.textContent = data.about;
       closeModal(editProfileModal);
       profileEditSubmitButton.disabled = true;
      resetValidation(editProfileModal, editProfileFormElement, config);
    })
    .catch((error) => {
      console.error("Error updating user info:", error);
    })
    .finally(() => {
      submitButton.textContent = "Save";

    });
}
enableValidation(config);

console.log("Index script good to go");
