import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm ";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [avatarUrl, setAvatarUrl] = useState("")

function handleSubmit(e) {
  e.preventDefault();

  onUpdateAvatar({
    // avatar: /* Значение инпута, полученное с помощью рефа */,
    avatar: avatarUrl
  });
    onClose()
}
  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      button="Сохранить"
      title="Обновить аватар"
      name="profile-img"
    >
      <input
        id="profile-input"
        name="link"
        className="popup-form__field popup-form__field_type_link"
        placeholder="Ссылка на картинку"
        value={avatarUrl}
        onChange={(e) => setAvatarUrl(e.target.value)}
        type="url"
        required
      />
    <span className="profile-input-error popup-form__error"></span>
  </PopupWithForm>
  );
}

export default EditAvatarPopup;
