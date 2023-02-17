import React from "react";
import buttonTrash from "../images/trash.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onConfirm, onCardLike }) {
  const handleCardClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.allId === currentUser._id;
  // Далее в разметке используем переменную для условного рендеринга

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element-like-group__icon ${
    isLiked && "element-like-group__icon-active"
  }`;

  return (
    <li className="element">
      {isOwn && (
        <img
          alt="Удаление"
          className="element__delete"
          src={buttonTrash}
          onClick={onConfirm}
        />
      )}

      <div className="element__configuration">
        <img
          src={card.link}
          onClick={handleCardClick}
          alt={card.name}
          className="element__images"
        />
      </div>
      <div className="element-group">
        <h2 className="element-group__text">{card.name}</h2>

        <div className="element-like-group">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="element-like-group__number">{card.likesNumber}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
