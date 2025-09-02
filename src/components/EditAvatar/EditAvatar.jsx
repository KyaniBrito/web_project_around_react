export default function EditAvatar() {
  return (
    <form
      className="popup__form"
      id="avatar__form"
      name="form-avatar"
      noValidate
    >
      <fieldset className="popup__form-fieldset">
        <input
          id="avatar-link"
          type="url"
          name="avatar"
          className="popup__form-input"
          placeholder="Link da imagem"
          required
        />
        <span className="error-message" id="avatar-link-error"></span>
      </fieldset>
      <button className="popup__form-save" type="submit">
        Salvar
      </button>
    </form>
  );
}
