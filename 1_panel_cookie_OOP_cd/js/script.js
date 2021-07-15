'use strict';
class Cookies {

    constructor() {
        this.checkCookieEnabled();
    }

    checkCookieEnabled() {
        // console.log(navigator.cookieEnabled);
        if(!navigator.cookieEnabled) {
            alert('Przeglądarka nie obsługuje ciasteczek...');
            return;
        }
    }

    setCookie(options) {
        const option = {
            name: encodeURIComponent(options.name || 'test'),
            value: encodeURIComponent(options.value || 'TEST'),
            days: options.days,
            path: options.path,
            domain: options.domain,
            secure: options.secure
        };

        // console.log(option);

        let cookieSetingsTab = [];

        cookieSetingsTab.push(`${option.name}=${option.value}`);

        if(typeof option.days === "number") {
            const date = new Date;
            date.setTime(date.getTime() + (option.days * 24 * 60 * 60 * 1000));
            cookieSetingsTab.push(`expires = ${date.toGMTString()}`);
        }

        if(option.path) {
            cookieSetingsTab.push(`path=${option.path}`);
        }
        
        if(option.domain) {
            cookieSetingsTab.push(`domain=${option.domain}`);
        }
        
        if(option.secure) {
            cookieSetingsTab.push(`secure=${option.secure}`);
        }

        console.log(cookieSetingsTab);
        console.log(cookieSetingsTab.join(';'));

        document.cookie = cookieSetingsTab.join(';');
    }


    getCookie(name) {

        if(document.cookie != '') {
            // console.log(document.cookie);

            const cookies = document.cookie.split(/; */);
            // console.log(cookies);

            for(let i = 0; i < cookies.length; i++) {

                const cookieName = cookies[i].split('=')[0];
                const cookieValue = cookies[i].split('=')[1];

                if(cookieName === decodeURIComponent(name)) {
                    return cookieValue;
                }
                return;

            }

        }

    }

    removeCookie(name) {
        const date = new Date;
        date.setTime(date.getMonth() - 1);
        document.cookie = `${name}=; expires=${date.toGMTString()}`;
    }

}

class PanelCookie extends Cookies {

    constructor() {

        super();

        this.infoCookie = 'W ramach naszej witryny stosujemy pliki cookies w celu świadczenia Państwu usług na najwyższym poziomie, w tym w sposób dostosowany do indywidualnych potrzeb. Korzystanie z witryny bez zmiany ustawień dotyczących cookies oznacza, że będą one zamieszczane w Państwa urządzeniu końcowym. Możecie Państwo dokonać w każdym czasie zmiany ustawień dotyczących cookies. Więcej szczegółów w naszej "Polityce Cookies".';

        this.textClose = '<a href="#">X</>';

        this.textColor = 'navy';

        if(this.getCookie('Accept')) {
            this.hidePanel();
        }

        this.setPanelProperties();
    }

    setPanelProperties() {
        const text = document.querySelector(".panel__text");
        const close = document.querySelector(".panel__close");
        text.innerHTML = this.infoCookie;
        close.innerHTML = this.textClose;
    }

    hidePanel() {
        const panel = document.querySelector(".panel");
        panel.style.display = "none";
    }

    setCookie() {
        super.setCookie({
            name: "Accept",
            value: "yes",
            days: 30
        });
        this.hidePanel();
    }
    
}

// const cookie = new Cookies;
// cookie.setCookie({
//     name: 'Accept',
//     value: 'yes',
//     days: 14
// });

// console.log(cookie.getCookie('Accept'));
// cookie.removeCookie('Accept');

// new PanelCookie;

const panel = new PanelCookie;
const closeLink = document.querySelector(".panel__close a");

closeLink.addEventListener('click', () => {
    panel.setCookie();
});