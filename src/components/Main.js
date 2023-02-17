import React, { useState, useEffect, useContext } from "react";
import buttonProfilePath from "../images/Profile.svg";
import buttonEditPath from "../images/Edit-Button.svg";
import buttonAddPath from "../images/Vector.svg";
import api from "../utils/Api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const { cards } = props

  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile-avatar" onClick={props.onEditAvatar}>
          <img
            src={`${currentUser.avatar}`}
            className="profile-avatar__img"
            alt="Аватар"
          />
          <img
            className="profile-avatar__pencil"
            src={buttonProfilePath}
            alt="Логотип"
          />
        </div>

        <div className="profile-info">
          <h1 className="profile-info__title">{currentUser.name}</h1>
          <p className="profile-info__subtitle">{currentUser.about}</p>
          <button type="button" className="profile-info__button">
            <img
              alt="Кнопка редактирования"
              src={buttonEditPath}
              onClick={props.onEditProfile}
            />
          </button>
        </div>
        <button type="button" className="profile__button">
          <img
            alt="Кнопка добавления новых элементов"
            src={buttonAddPath}
            onClick={props.onAddPlace}
          />
        </button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.length > 0 && currentUser && cards.map((card) => (
              <Card
                key={card._id}
                onConfirm={props.onConfirm}
                card={card}
                onCardClick={props.onCardClick}
                onCardDelete={props.onCardDelete}
                onCardLike={props.onCardLike}
            />
        ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
