export default class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  _getResponse(res) {
    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  async getInitialCards() {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    });

    return this._getResponse(res);
  }

  async createCard(data) {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
    return this._getResponse(res);
  }

  async deleteCard(id) {
    const res = await fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._getResponse(res);
  }

  async getUserData() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    });

    return this._getResponse(res);
  }

  async setUserData(data) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
    return this._getResponse(res);
  }

  async editAvatar(avatarLink) {
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    });
    return this._getResponse(res);
  }

  async likeCard(id) {
    const res = await fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
    return this._getResponse(res);
  }

  async dislikeCard(id) {
    const res = await fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
    return this._getResponse(res);
  }
}
