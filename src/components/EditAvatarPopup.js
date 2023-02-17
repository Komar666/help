import React from "react";
import PopupWithForm from "./PopupWithForm ";

function EditAvatarPopup({isEditAvatarPopupOpen,closeAllPopups}) {
  return (
   

    <PopupWithForm
    isOpen={isEditAvatarPopupOpen}
    onClose={closeAllPopups}
    button="Сохранить"
    title="Обновить аватар"
    name="profile-img"
  >
    <input
      id="profile-input"
      name="link"
      className="popup-form__field popup-form__field_type_link"
      placeholder="Ссылка на картинку"
      value=""
      onChange={() => {}}
      type="url"
      required
    />
    <span className="profile-input-error popup-form__error"></span>
  </PopupWithForm>


  );
}

export default EditAvatarPopup;
