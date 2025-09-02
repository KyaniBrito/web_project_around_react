export default function Popup(props) {
  //children é o conteúdo de popup
  const { onClose, title, children } = props;

  return (
    <div className="popup">
      <div className={`popup__content ${!title ? "popup__image" : ""}`}>
        <button
          aria-label="Close modal"
          className="popup__close-button"
          type="button"
          onClick={onClose}
        />
        {title && <h3 className="popup__title">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
