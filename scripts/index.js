const initialCards = [
   {name: "Golden Gate Bridge",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg"
     },
  {name: "Val Thorens",
    link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg"
   },
     {name: "restaurant Terrace",
    link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg"
   },
     {name: "Val A outdoor cafe",
    link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg"
   },
     {name: "A very long bridge, over the forest and through the trees",
    link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg"
   },
     {name: "Tunnel with morning light",
    link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg"
   },
     {name: "Mountain House",
    link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg"
   }
  ];

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

const nameInput = newPostModal.querySelector(
  "#card-caption-input"
);
const linkInput = newPostModal.querySelector("#card-image-input");
const addCardFormElement = newPostModal.querySelector(".modal__form");
editProfileModal.querySelector(".modal__form").addEventListener("submit", handleEditSubmitButton);

const imagePreviewModal = document.querySelector("#preview-image-modal");
const previewImageCloseButton = imagePreviewModal.querySelector(
  ".modal__close-button-preview");
const imagePreviewElement = imagePreviewModal.querySelector(
  ".modal__image"
);
const imagePreviewCaption = imagePreviewModal.querySelector(
  ".modal__caption"
);

const deleteButton = document.querySelector(".card__delete-button");

const cardTemplate = document.querySelector("#card__template");
const cardList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;


  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("card__like-button_active");
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  cardImage.addEventListener("click", function () {
    imagePreviewElement.src = data.link;
    imagePreviewElement.alt = data.name;
    imagePreviewCaption.textContent = data.name;
    openModal(imagePreviewModal);
  });



  return cardElement;
}


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

  previewImageCloseButton.addEventListener("click", function () {
    closeModal(imagePreviewModal);
  });

function handleEditSubmitButton(evt) {
  evt.preventDefault();
  profileNameElement.textContent = editProfileNameInput.value;
  profileDescriptionElement.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
}


function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const cardData = {
    name: nameInput.value,
    link: linkInput.value,
  };

  const cardElement = getCardElement(cardData);
  cardList.prepend(cardElement);
  closeModal(newPostModal);
  addCardFormElement.reset();
}
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach(function(item)  {
 const cardElement = getCardElement(item);
 cardList.append(cardElement);
});



console.log("all clear");