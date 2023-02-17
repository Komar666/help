import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup-${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup-container">
        <form
          onSubmit={props.onSubmit}
          name={`popup-${props.name}`}
          method="post"
          className="popup-form form-profile-edit"
          noValidate
        >
          <h2 className="popup-form__title ">{props.title}</h2>
          {props.children}
          <button
            type="submit"
            className="popup-form__button  popup-form__button_inactive"
          >
            {props.button}
          </button>
        </form>
        <button
          className="popup-container-close "
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
