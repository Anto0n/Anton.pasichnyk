"use strict";
var user_1 = require('../user');
var UserCreateService = (function () {
    function UserCreateService() {
        /*  data: User[] = [
            {
              login: "admin",
              email: "admin@gmail.com",
              password: "12345",
              firstName: "Pavel",
              lastName: "Khokhlov"
            },
            {
              login: "user",
              email: "user@gmail.com",
              password: "qwerty",
              firstName: "Boris",
              lastName: "TheAnimal"
            },
            {
              login: "master",
              email: "master@gmail.com",
              password: "1q2w3e",
              firstName: "Martin",
              lastName: "Freeman"
            }
          ]; */
        this.data = [];
    }
    UserCreateService.prototype.getUsers = function () {
        return this.data;
    };
    UserCreateService.prototype.addUser = function (firstName, lastName, login, email, password) {
        this.data.push(new user_1.User(firstName, lastName, login, email, password));
    };
    return UserCreateService;
}());
exports.UserCreateService = UserCreateService;
