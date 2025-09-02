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
import ImagePopup from "../ImagePopup/ImagePopup";

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

console.log(cards);

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
          <button className="profile__avatar-edit">
            <img
              className="profile__avatar-edit-icon"
              src={iconEditImage}
              alt="sinal de edição do avatar"
              onClick={() => handleOpenPopup(editAvatarPopup)}
            />
          </button>
        </div>

        <div className="profile__info">
          <div className="profile__info-line">
            <h4 className="profile__info-name">Jacques Cousteau</h4>
            <button className="profile__info-edit">
              <img
                src={iconEditProfile}
                alt="sinal de edição"
                onClick={() => handleOpenPopup(editProfilePopup)}
              />
            </button>
          </div>
          <h6 className="profile__info-occupation">Explorador</h6>
        </div>

        <button className="profile__add-button">
          <img
            className="profile__add-button-icon"
            src={iconAddButton}
            alt="sinal de soma"
            onClick={() => handleOpenPopup(newCardPopup)}
          />
        </button>
      </section>

      <section className="elements">
        <ul className="elements__list"></ul>
        {cards.map((card) => (
          <Card key={card._id} card={card} handleOpenPopup={handleOpenPopup} />
        ))}
      </section>
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
