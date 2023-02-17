import React from "react";

function ImagePopup({card,onClose}) {

  return (
    
      <div className={`popup popup-img ${card ? "popup_opened" : ""}`}>
        <div className="popup-img-block">
          <div className="popup-img-object">
            <img
              src={card.link}
              alt={card.name}
              className="popup-img-object__item"
              type="text"
            />
            <p className="popup-img-object__text"> </p>
          </div>

          <button
            className="popup-container-close"
            type="button"
            onClick={onClose}
          ></button>
        </div>
      </div>
    
  );
}

export default ImagePopup;
