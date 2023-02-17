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
import AddPlacePopup from "./AddPlacePopup";

function App(props) {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  // const [state, setCards] = useState(null);
  const [cards, setCards] = useState([]);



  useEffect(() => {
    // LOAD USER INFO
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
        console.log(`%c[App] User fetched inside useEffect: ${JSON.stringify(res)}`, 'color: cyan;')
      })
      .catch((err) => {
        console.log(`%c[App] error while fetching user in useEffect: ${JSON.stringify(err)}`, 'color: red;');
      });

    // LOAD CARDS
    api
      .getInitialCards()
      .then((cardsResponse) => {
        const collectedCards = cardsResponse.map((card) => { return card });
        setCards(collectedCards);
        console.log(`%c[Main] loading user cards, first one is: ${JSON.stringify(collectedCards[0])}`, 'color: cyan;')
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);


  function handleCardLike(card) {
      // Снова проверяем, есть ли уже лайк на этой карточке
      const isLiked = card.likes.some(i => i._id === currentUser._id);
      console.log(`%c[App] handleCardLike: card id: ${card._id} isLiked: ${isLiked}`, 'color: violet')
      // Отправляем запрос в API и получаем обновлённые данные карточки
      api.changeLikes(card._id, isLiked).then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
  }

  function handleCardDelete(card) {
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

  function handleAddPlace({ name, link }) {
    api
      .addCard(name, link)
      .then((createdPlace) => {
        console.log(`%c[App] Place was created!📍. \n Created place: ${JSON.stringify(createdPlace)}`, 'color: cyan;')
        setCards([createdPlace, ...cards])
        // setCards([...cards, createdPlace])
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

        {currentUser && (
          <Main
            onCardClick={setSelectedCard}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onConfirm={handleConfirmationClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
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

        {isAddPlacePopupOpen && (
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />
        )}

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
