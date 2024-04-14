import axios from "axios";
import router from "@/router/index.js";
import socket from "@/socket.js";

export class Store {
    constructor() {
        this.store = null
    }

    getCookieValue() {
        var cookieName = "token"
        var cookieArray = document.cookie.split(';');
        for (var i = 0; i < cookieArray.length; i++) {
            var cookie = cookieArray[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }

            if (cookie.indexOf(cookieName + '=') == 0) {
                return cookie.substring(cookieName.length + 1, cookie.length);
            }
        }
    }

    getToken()
    {
        return this.getCookieValue()
    }

    handleLogin(form) {
        try {
            axios.post('https://apiplateform.karibsen.fr/api/login_check', {
                username: form.username,
                password: form.password
            }).then(async (res) => {
                if (res.status === 200) {
                    var dateExpiration = new Date();
                    dateExpiration.setTime(dateExpiration.getTime() + (1 * 60 * 60 * 1000));
                    console.log(dateExpiration)
                    var dateUTC = dateExpiration.toUTCString();
                    document.cookie = `token=${res.data.token};expires=${dateUTC};path=/`;

                    let token = this.getToken();
                    console.log(token);

                    const userResponse = await axios.get('https://apiplateform.karibsen.fr/api/me', {
                        headers: {Authorization: `Bearer ${token}`}
                    });

                    localStorage.setItem('user', JSON.stringify(userResponse.data.user))

                    router.push('/fr/account');
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

    handleRegister(user)
    {
        try {
            axios.post('https://apiplateform.karibsen.fr/api/users', user)
                .then(async (res) => {
                    if (res.status === 201) {
                        console.log(res.data)
                        const login = {
                            username: user.email,
                            password: user.password
                        }
                        await this.handleLogin(login)
                        router.push('/fr/account')
                    }
                })
        } catch (e) {
            console.log(e)
        }
    }

    getUser() {
        const cookie = this.getCookieValue()

        if (cookie) {
            const res = axios.get('https://apiplateform.karibsen.fr/api/me', {headers: {Authorization: `Bearer ${cookie}`}})
                .then(res => {
                    return res.data.user
                })
                .catch(() => {
                    console.log('erreur')
                })
            return res
        } else {
            if(user === undefined || user === null){
                socket.emit('first-connexion', (user) => {
                    localStorage.setItem('user', JSON.stringify(user))
                    location.reload()
                })
            }
        }

    }
}