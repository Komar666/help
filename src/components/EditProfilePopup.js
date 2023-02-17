import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm ";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  function nameChange(e) { setName(e.target.value); }
  function discriptionChange(e) { setDescription(e.target.value); }


  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    console.log(`%c[EditProfilePopup] catch handleSubmit`, 'color: violet;')
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      button="Сохранить"
      title="Редактировать профиль"
      name="profile-edit"
    >
      <input
        id="name-input"
        name="name"
        className="popup-form__field"
        value={name}
        onChange={nameChange}
        type="text"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="name-input-error popup-form__error"></span>
      <input
        id="about-input"
        name="about"
        className="popup-form__field popup-form__field_type_sub"
        value={description}
        onChange={discriptionChange}
        type="text"
        placeholder="Профессия"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="about-input-error popup-form__error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
