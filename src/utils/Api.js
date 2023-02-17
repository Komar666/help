class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _checkStatus(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    async getInitialCards() {
        return fetch(this._baseUrl + '/cards', {
                headers: {
                    authorization: this._headers.authorization
                }
            })
            .then(res => {
                return this._checkStatus(res);
            })

    }

    async getUserInfo() {

        return fetch(this._baseUrl + '/users/me', {
                headers: {
                    authorization: this._headers.authorization
                }
            })
            .then(res => {
                return this._checkStatus(res);
            })

    }

    async updateUserInfo(name, about) {
        return fetch(this._baseUrl + '/users/me', {
                method: 'PATCH',
                headers: {
                    authorization: this._headers.authorization,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    about: about
                })
            })
            .then(res => {
                return this._checkStatus(res);
            })
    }

    async addCard(name, link) {
        return fetch(this._baseUrl + '/cards', {
                method: 'POST',
                headers: {
                    authorization: this._headers.authorization,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    link: link
                })
            })
            .then(res => {
                return this._checkStatus(res);
            })
    }

    async deleteCard(cardId) {
        return fetch(this._baseUrl + '/cards/' + cardId, {
                method: 'DELETE',
                headers: {
                    authorization: this._headers.authorization,
                },
            })
            .then(res => {
                return this._checkStatus(res);
            })

    }

    async changeLikes(cardId, needDelete = false) {
        if (needDelete) {
            return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
                    method: 'DELETE',
                    headers: {
                        authorization: this._headers.authorization,
                    },
                })
                .then(res => {
                    return this._checkStatus(res);
                })

        } else {
            return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
                    method: 'PUT',
                    headers: {
                        authorization: this._headers.authorization,
                    },
                })
                .then(res => {
                    return this._checkStatus(res);
                })

        }
    }

    async changeAvatar(avatar) {
        return fetch(this._baseUrl + '/users/me/avatar', {
                method: 'PATCH',
                headers: {
                    authorization: this._headers.authorization,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    avatar
                })
            })
            .then(res => {
                return this._checkStatus(res);
            })

    }


}



const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54',
    headers: {
        authorization: '0feb15b1-cc22-4a2b-9258-62b065b59818',
        'Content-Type': 'application/json'
    }
});

export default api;
