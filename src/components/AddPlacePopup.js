 import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm ";

export default function AddPlacePopup ({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("")
  const [link, setLink] = useState("")

function handleSubmit(e) {
  e.preventDefault();

  onAddPlace({ name, link });
  onClose()
}
  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      button="Создать"
      title="Новое место"
      name="add"
    >
      <input
        id="place-input"
        name="name"
        className="popup-form__field popup-form__field_type_name"
        placeholder="Название"
        value={name}
        onChange={(e) => { setName(e.target.value)}}
        type="text"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="place-input-error popup-form__error"></span>
      <input
        id="link-input"
        name="link"
        className="popup-form__field popup-form__field_type_link"
        placeholder="Ссылка на картинку"
        value={link}
        onChange={(e) => { setLink(e.target.value) }}
        type="url"
        required
      />
      <span className="link-input-error popup-form__error"></span>
    </PopupWithForm>
  )

}
