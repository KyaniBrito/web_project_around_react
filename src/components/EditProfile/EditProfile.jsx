export default function EditProfile() {
  return (
    <form noValidate id="user__form" name="form" className="popup__form">
      <fieldset className="popup__form-fieldset">
        <label htmlFor="username" className="popup__form-first-label">
          <input
            className="popup__form-input"
            placeholder="Nome de usuário"
            type="text"
            id="username"
            name="name"
            minLength="2"
            maxLength="40"
            required
          />
          <p className="error-message"></p>
        </label>
        <label htmlFor="bio" className="popup__form-second-label">
          <input
            className="popup__form-input"
            placeholder="Sobre mim"
            type="text"
            id="bio"
            name="about"
            minLength="2"
            maxLength="200"
            required
          />
          <p className="error-message"></p>
        </label>
      </fieldset>
      <button disabled className="popup__form-save" type="submit">
        Salvar
      </button>
    </form>
  );
}
