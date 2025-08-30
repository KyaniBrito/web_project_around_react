import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Api from "../components/Api.js";
import { formAddPopUp, initialCards } from "../components/utils.js";

//--------------------Api----------------------

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "693375ea-17cb-4298-a670-e056ce6fc442",
    "Content-Type": "application/json",
  },
});

// -------------------UserInfo-------------------

const userInfo = new UserInfo({
  name: ".profile__info-name",
  about: ".profile__info-occupation",
  avatar: ".profile__avatar-image",
});

//--------------------PopUp EditProfile----------------------

const popupEditProfileForm = new PopupWithForm(
  "#profile__overlay",
  (formData) => {
    popupEditProfileForm.renderLoading(true);

    api
      .editProfile(formData.name, formData.about)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupEditProfileForm.close();
      })
      .catch((err) => console.log("Erro ao atualizar perfil:", err))
      .finally(() => {
        popupEditProfileForm.renderLoading(false);
      });
  }
);

popupEditProfileForm.setEventListeners();

document.querySelector(".profile__info-edit").addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  document.querySelector("#username").value = currentUser.name;
  document.querySelector("#bio").value = currentUser.about;

  popupEditProfileForm.open();
});

// ------------------- PopUp Image---------------------

function handleCardClick({ name, link }) {
  imagePopup.open({ name, link });
}

const imagePopup = new PopupWithImage(".popup_type_image");
imagePopup.setEventListeners();

// ----------------- Seção de Cards -----------------
const handleDeleteClick = (cardId, cardElement) => {
  popupConfirmDelete.open(cardId, cardElement);
};

const handleLikeClick = (cardInstance) => {
  if (cardInstance.isLiked()) {
    api
      .unlikeCard(cardInstance._card._id)
      .then((updatedCard) => {
        cardInstance.updateLikes(updatedCard);
      })
      .catch((err) => console.log("Erro ao remover like:", err));
  } else {
    api
      .likeCard(cardInstance._card._id)
      .then((updatedCard) => {
        cardInstance.updateLikes(updatedCard);
      })
      .catch((err) => console.log("Erro ao adicionar like:", err));
  }
};

let section;
let userId;

api
  .getAppInfo()
  .then(([userData, cardsData]) => {
    console.log(cardsData);
    userId = userData._id;
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
      _id: userData._id,
    });

    section = new Section(
      {
        items: cardsData,
        renderer: (card) => {
          const cardElement = new Card(
            { card, cardSelector: "#card-template" },
            handleCardClick,
            handleDeleteClick,
            handleLikeClick,
            userId
          ).generateCard();
          return cardElement;
        },
      },
      ".elements__list"
    );

    section.renderItens();
  })
  .catch((err) => console.log("Erro ao carregar dados iniciais:", err));

// ----------------- Popup Adicionar Card -----------------
const popupAddCard = new PopupWithForm("#card__overlay", (formData) => {
  popupAddCard.renderLoading(true);
  api
    .addCard(formData.name, formData.link)
    .then((newCard) => {
      const cardElement = new Card(
        { card: newCard, cardSelector: "#card-template" },
        handleCardClick,
        handleDeleteClick,
        handleLikeClick,
        userId
      ).generateCard();

      section.addItem(cardElement);
      popupAddCard.close();
      console.log("Card adicionado ao DOM");
    })

    .catch((err) => console.log("Erro ao adicionar card:", err))
    .finally(() => {
      popupAddCard.renderLoading(false);
    });
});

popupAddCard.setEventListeners();

// ----------------- Botões de Abrir/Fechar -----------------
document.querySelector(".profile__add-button").addEventListener("click", () => {
  popupAddCard.open();
});

document
  .querySelector(".addpopup__close-button")
  .addEventListener("click", () => {
    popupAddCard.close();
  });

// ---------------EditAvatar-----------------

const editAvatarPopup = new PopupWithForm(".popup_edit-avatar", (formData) => {
  editAvatarPopup.renderLoading(true);
  api
    .updateAvatar(formData.avatar)
    .then((res) => {
      console.log("Resposta da API ao atualizar avatar:", res);
      userInfo.setUserInfo(res);
      editAvatarPopup.close();
    })
    .catch((err) => console.log("Erro ao atualizar o avatar:", err))
    .finally(() => {
      editAvatarPopup.renderLoading(false);
    });
});

editAvatarPopup.setEventListeners();

document
  .querySelector(".profile__avatar-edit")
  .addEventListener("click", () => {
    editAvatarPopup.open();
  });

//-------------------Validação de formulário-------------------

new FormValidator({
  config: {
    inputSelector: ".popup__form-input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "error-message_show_error",
    errorClass: "error-message",
  },
  formSelector: "#user__form",
}).enableValidation();

new FormValidator({
  config: {
    inputSelector: ".addpopup__form-input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "error-message_show_error",
    errorClass: "error-message",
  },
  formSelector: "#card__form",
}).enableValidation();

new FormValidator({
  config: {
    inputSelector: ".popup__form-input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "error-message_show_error",
    errorClass: "error-message",
  },
  formSelector: "#avatar__form",
}).enableValidation();

//-------------------PopUp Deletar Card-------------------

const popupConfirmDelete = new PopupWithConfirmation(".popup_type_confirm");

popupConfirmDelete.setSubmitSave((cardId, cardElement) => {
  console.log("Tentando deletar card com ID:", cardId);
  api
    .deleteCard(cardId)
    .then(() => {
      cardElement.remove();
      cardElement = null;
      popupConfirmDelete.close();
      console.log("Card removido do DOM", cardId);
    })
    .catch((err) => console.log("Erro ao excluir card:", err));
});

popupConfirmDelete.setEventListeners();
