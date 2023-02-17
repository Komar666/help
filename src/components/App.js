import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm ";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";

function App(props) {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  // const [state, setCards] = useState(null);



  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
        console.log(`%c[App] User fetched inside useEffect: ${JSON.stringify(res)}`, 'color: cyan;')
      })
      .catch((err) => {
        console.log(`%c[App] error while fetching user in useEffect: ${JSON.stringify(err)}`, 'color: red;');
      });

  }, []);


  function handleCardLike(setCards, card) {
      // Снова проверяем, есть ли уже лайк на этой карточке
      const isLiked = card.likes.some(i => i._id === currentUser._id);
      console.log(`%c[App] handleCardLike: card id: ${card._id} isLiked: ${isLiked}`, 'color: violet')
      // Отправляем запрос в API и получаем обновлённые данные карточки
      api.changeLikes(card._id, isLiked).then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
  }

  function handleCardDelete(setCards, card) {
    const isOwn = card.owner._id === currentUser._id;
    // Отправляем запрос в API и получаем обновлённые данные карточки
    isOwn && api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((v) => (v._id !== card._id )));
    });
  }

  function handleUpdateUser({ name, about }) {
    api
      .updateUserInfo(name, about)
      .then((updatedUser) => {
        console.log(`%c[App] handleUpdateUser: User updated!🚀. \n Fresh user: ${JSON.stringify(updatedUser)}`, 'color: cyan;')
        setCurrentUser(updatedUser);
      })
      .catch((err) => { console.log(err); });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .changeAvatar(avatar)
      .then((updatedUser) => {
        console.log(`%c[App] handleUpdateAvatar: User updated!🚀. \n Fresh user: ${JSON.stringify(updatedUser)}`, 'color: cyan;')
        setCurrentUser(updatedUser);
      })
      .catch((err) => { console.log(err); });
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleConfirmationClick() {
    setConfirmationPopupOpen(true);
  }

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setConfirmationPopupOpen(false);
    setSelectedCard(null);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />

        <div style={{ color: "red" }}>avatar popup open: {JSON.stringify(isEditAvatarPopupOpen)}</div>

        {currentUser && (
          <Main
            onCardClick={setSelectedCard}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onConfirm={handleConfirmationClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        )}

        <Footer />
        {selectedCard && (
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        )}

        {isEditProfilePopupOpen && (
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
        )}

        {isEditAvatarPopupOpen && (
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
        )}

        <PopupWithForm
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          button="Создать"
          title="Новое место"
          name="add"
        >
          <input
            id="place-input"
            name="name"
            className="popup-form__field popup-form__field_type_name"
            placeholder="Название"
            value=""
            onChange={() => {}}
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
            value=""
            onChange={() => {}}
            type="url"
            required
          />
          <span className="link-input-error popup-form__error"></span>
        </PopupWithForm>

        <PopupWithForm
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          button="Да"
          title="Вы уверены?"
          name="close"
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
