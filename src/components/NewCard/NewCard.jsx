export default function NewCard() {
  return (
    <form noValidate id="card__form" name="form" className="popup__form">
      <fieldset className="popup__form-fieldset">
        <label className="addpopup__form-first-label" htmlFor="title">
          <input
            className="popup__form-input"
            placeholder="Título"
            type="text"
            name="name"
            id="title"
            required
          />
          <p className="error-message"></p>
        </label>
        <label className="addpopup__form-second-label" htmlFor="link">
          <input
            className="popup__form-input"
            placeholder="Link de imagem"
            type="url"
            name="link"
            id="link"
            required
          />
          <p className="error-message"></p>
        </label>
      </fieldset>
      <button className="popup__form-save" type="submit">
        Crie
      </button>
    </form>
  );
}
