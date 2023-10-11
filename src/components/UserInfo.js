export default class UserInfo {
    constructor({ userNameElement, userInfoElement }) {
        this._userNameElement = userNameElement;
        this._userInfoElement = userInfoElement;
    }

    getUserInfo() {
        return {
            name: this._userNameElement.textContent,
            about: this._userInfoElement.textContent
        };
    }

    setUserInfo({name, about}) {
        this._userNameElement.textContent = name;
        this._userInfoElement.textContent = about;
    }
}