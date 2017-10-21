'use strict';

var Util = function Util () {};

var staticAccessors = { SPEED: {},BOARD_COLS: {},BOARD_LINES: {},KEY_PAUSE: {},KEY_UP: {},KEY_LEFT: {},KEY_RIGHT: {},KEY_DOWN: {},COLOR_SNAKE: {},COLOR_BOARD: {},COLOR_WALL: {} };

Util.prototype.rand = function rand (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

Util.prototype.redirect = function redirect (url) {
    window.location.href = './' + url + '.html';
};

staticAccessors.SPEED.get = function () {
    return 200;
};

staticAccessors.BOARD_COLS.get = function () {
    return 30;
};

staticAccessors.BOARD_LINES.get = function () {
    return 30;
};

staticAccessors.KEY_PAUSE.get = function () {
    return 32;
};

staticAccessors.KEY_UP.get = function () {
    return 38;
};

staticAccessors.KEY_LEFT.get = function () {
    return 37;
};

staticAccessors.KEY_RIGHT.get = function () {
    return 39;
};

staticAccessors.KEY_DOWN.get = function () {
    return 40;
};

staticAccessors.COLOR_SNAKE.get = function () {
    return '#607d8b';
};

staticAccessors.COLOR_BOARD.get = function () {
    return '#fff';
};

staticAccessors.COLOR_WALL.get = function () {
    return '#35f7cf';
};

Object.defineProperties( Util, staticAccessors );

var Service = function Service () {};

Service.prototype.gravatar = function gravatar (hash, size) {
        if ( size === void 0 ) size = 200;

    return 'http://www.gravatar.com/avatar/' + hash + '.jpg?s=' + size;
};

Service.prototype.addItem = function addItem (name, value) {
    localStorage.setItem(name, value);
};

Service.prototype.getItem = function getItem (item) {
    return localStorage.getItem(item);
};

Service.prototype.removeItem = function removeItem (item) {
    localStorage.removeItem(item);
};

Service.prototype.checkAuth = function checkAuth () {
    var exists = true;
    if (localStorage.getItem('email') === null) {
        exists = false;
    }
    return exists;
};

Service.prototype.logout = function logout () {
    this.removeItem('email');
};

var Rating = function Rating() {

    this.util = new Util();
    this.service = new Service();

    if (!this.service.checkAuth()) {
        this.util.redirect('index');
    }

    this.players = [];
    this.view();
};

Rating.prototype.view = function view () {
    var table = document.querySelector('.table');
    this.players = JSON.parse(this.service.getItem('players'));
    table.innerHTML = this.players.map(function (player, key) {
        return ("<tr>\n                    <td class=\"table__image\">\n                        <img src=\"" + (player.photo) + "\" alt=\"" + (player.name) + "\" title=\"" + (player.name) + "\">\n                    </td>\n                    <td class=\"table_name\">" + (player.name) + "</td>\n                    <td class=\"table__scrore\">" + (player.points) + " /pts</td>\n                    <td class=\"table__stars\">★★★★</td>\n                </tr>");
    }).join('');
};

new Rating();
//# sourceMappingURL=rating.js.map
