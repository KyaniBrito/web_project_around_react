export default function ImagePopup(props) {
  const { card } = props;

  console.log(card);
  return (
    <div className="popup__image-container">
      <img className="popup__image" src={card.link} alt={card.name} />
      <p className="popup__caption ">{card.name}</p>
      <button
        className="popup__close-button"
        aria-label="Fechar imagem"
        type="button"
      ></button>
    </div>
  );
}
