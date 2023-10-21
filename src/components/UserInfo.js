export default class UserInfo {
    constructor({ userNameElement, userInfoElement, avatarImg }) {
        this._userNameElement = userNameElement;
        this._userInfoElement = userInfoElement;
        this.avatarImg = avatarImg;
    }

    getUserInfo() {
        return {
            name: this._userNameElement.textContent,
            about: this._userInfoElement.textContent
        };
    }

    setUserInfo({name, about, avatar}) {
        this._userNameElement.textContent = name;
        this._userInfoElement.textContent = about;
        this.avatarImg.style.backgroundImage = `url(${avatar})`;
    }
}