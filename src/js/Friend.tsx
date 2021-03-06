import Http from './services/Http';
import Util from './services/Util';
import Firebase from './services/Firebase';
import Storage from './services/Storage';

import * as React from "react";
import * as ReactDOM from "react-dom";

import FriendComponent from './components/FriendComponent';

class Friend {
    private util: any;
    private http: any;
    private firebase: any;
    private storage: any;
    private friends: any = [];

    constructor() {
        this.util = new Util();
        this.firebase = new Firebase();
        this.storage = new Storage();
        this.http = new Http();

        // Check if user is Auth
        if (!this.http.checkAuth()) {
            this.util.redirect('index');
        }
        this.http.logout();

        let myID = this.storage.getItem('id');
        this.firebase.all('friends/' + myID).then((response : any)=> {
            if (response) {
                this.firebase.all('players').then((res : any)=> {
                    let players = Object.entries(res);
                    players.map((player: any) => {
                        // Check if exists any player that's my friend.
                        if (player[0] in response) {
                            this.friends.push(player);
                        }
                    });

                    // Save in Storage
                    this.storage.addItem('friends', JSON.stringify(this.friends));
                    const data = {
                        friends: this.friends
                    };
                    ReactDOM.render(
                        <FriendComponent friends={data.friends} />,
                        document.getElementById('list-friends')
                    );
                });
            } else {
                const data = {
                    friends: false
                };
                ReactDOM.render(
                    <FriendComponent friends={data.friends} />,
                    document.getElementById('list-friends')
                );
            }
        })
    }
}

new Friend();
