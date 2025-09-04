import imgProfile from "../../images/profile.jpg";
import iconEditImage from "../../images/Vector.png";
import iconEditProfile from "../../images/Edit Button.png";
import iconAddButton from "../../images/add button.png";
import { useState } from "react";
import Popup from "../Popup/Popup";
import NewCard from "../NewCard/NewCard";
import EditAvatar from "../EditAvatar/EditAvatar";
import EditProfile from "../EditProfile/EditProfile";
import Card from "../Card/Card";

const cards = [
  {
    isLiked: false,
    _id: "5d1f0611d321eb4bdcd707dd",
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
    owner: "5d1f0611d321eb4bdcd707dd",
    createdAt: "2019-07-05T08:10:57.741Z",
  },
  {
    isLiked: false,
    _id: "5d1f064ed321eb4bdcd707de",
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
    owner: "5d1f0611d321eb4bdcd707dd",
    createdAt: "2019-07-05T08:11:58.324Z",
  },
];

export default function Main() {
  const [popup, setPopup] = useState(null);
  const newCardPopup = { title: "Adicionar card", children: <NewCard /> };
  const editAvatarPopup = { title: "Editar avatar", children: <EditAvatar /> };
  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar">
          <img
            className="profile__avatar-image"
            src={imgProfile}
            alt="homem de aparentemente 80 anos sorrindo com uma toca vermelha em um fundo azul"
          />
          <button
            className="profile__avatar-edit"
            onClick={() => handleOpenPopup(editAvatarPopup)}
          >
            <img
              className="profile__avatar-edit-icon"
              src={iconEditImage}
              alt="sinal de edição do avatar"
            />
          </button>
        </div>

        <div className="profile__info">
          <div className="profile__info-line">
            <h4 className="profile__info-name">Jacques Cousteau</h4>
            <button
              className="profile__info-edit"
              onClick={() => handleOpenPopup(editProfilePopup)}
            >
              <img src={iconEditProfile} alt="sinal de edição" />
            </button>
          </div>
          <h6 className="profile__info-occupation">Explorador</h6>
        </div>
        <button
          className="profile__add-button"
          onClick={() => handleOpenPopup(newCardPopup)}
        >
          <img
            className="profile__add-button-icon"
            src={iconAddButton}
            alt="sinal de soma"
          />
        </button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleOpenPopup={handleOpenPopup}
            />
          ))}
        </ul>
      </section>
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
