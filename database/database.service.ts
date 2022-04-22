import db from './db.json';
import { constants } from 'src/environments/constants';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class DatabaseService {
    

    constructor() { }

    getCollection(collection) {
        switch(collection) {
            case("users"):
            return db['users'];

            case("dealership"):
            return db['dealership'];
        }
    }

    tryLogin(name, pass) {
        let user = db['users'].find(x => x.name === name && x.pass === pass);
        if(user) {
            localStorage.setItem(constants.user, user.name);

            return true;
        }

        return false;
    }
}