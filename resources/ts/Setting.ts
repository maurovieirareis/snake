import Service from './utils/Service';
import Util from './utils/Util';
import Storage from './utils/Storage';
import User from './player/User';

class Settings {
    private util: any;
    private service: any;
    private storage: any;
    private form: any;

    constructor () {
        this.util = new Util();
        this.service = new Service();
        this.storage = new Storage();

        if (!this.service.checkAuth()) {
            this.util.redirect('index');
        }

        this.form = document.querySelector('form');

        this.view();
        this.addEventListeners();
    }

    view(): void {
        const name = document.querySelector('#inputName');
        const email = document.querySelector('#inputEmail');
        const photo = document.querySelector('#photoProfile');
        const colors = document.querySelectorAll('[name="color"]');

        name.value = this.storage.getItem('name');
        email.value = this.storage.getItem('email');
        photo.src = this.storage.getItem('photo');
        const currentColor = this.storage.getItem('color');

        for(let i = 0; i < colors.length; i++) {
            colors[i].checked = false;
            if (colors[i].value === currentColor)
                colors[i].checked = true;
        }

        const colorChecked = document.querySelector('[name="color"]:checked');
        if (!colorChecked) {
            colors[0].checked = true;
        }
    }

    /**
     * Updated info user.
     * @param {any} evt
     * @return {void}
     */
     updateUser(evt: any): void {

         let name = evt.srcElement[0].value;
         let email = evt.srcElement[1].value;
         let color = document.querySelector('[name="color"]:checked').value;

         if (email.length > 0) {
             new User(name, email, color);
         }
     }

    addEventListeners (): void {
        this.form.addEventListener('submit', evt => {
            evt.preventDefault();
            this.updateUser(evt);
        });

        // Logout
        let logout = document.querySelector('#logout');
        logout.addEventListener('click', evt => {
            evt.preventDefault();
            this.service.logout();
            this.util.redirect('index');
        });
    }
 }

 new Settings();
