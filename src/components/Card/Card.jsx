import ImagePopup from "../ImagePopup/ImagePopup";

export default function Card(props) {
  const { name, link, isLiked } = props.card;
  const { handleOpenPopup } = props;
  const imageComponent = {
    children: <ImagePopup card={props.card} />,
  };

  return (
    <li className="card">
      <div className="card__elements">
        <button className="card__delete-button"></button>
        <img
          className="card__image"
          src={link}
          alt=""
          onClick={() => handleOpenPopup(imageComponent)}
        />
        <div className="card__description">
          <p className="card__title">{name}</p>
          <button className="card__like-button">{isLiked}</button>
        </div>
      </div>
    </li>
  );
}
