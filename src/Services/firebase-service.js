import { appConstants } from '../Constants/app-constants';
import * as firebase from 'firebase';
import FirebaseUser from '../Models/firebase-user';
import createUser from '../Models/create-user';
import { userService } from './user-service';

export const firebaseService = {
    createAccount
};

function createAccount({ email, password, name }) {
    return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
            res.user.updateProfile({ displayName: name });
            console.log('User registered successfully!');
            let firebaseuser = setCreateUser(res.user);
            firebaseuser.display_name = name;
            console.log(firebaseuser);
            let registeredUser = userService.register(firebaseuser);

            console.log(registeredUser);
            return registeredUser;
        })
        .catch(error => {
            console.log(error.message);
            return Promise.reject(error);
        });
}

const setFirebaseUser = (data) => {
    return new FirebaseUser(
        data.uid,
        data.email,
        data.displayName,
        data.providerId ? data.providerId : appConstants.DEFAULT_PROVIDER_ID,
    );
}

const setCreateUser = (data) => {
    return new createUser(
        data.uid,
        data.email,
        data.displayName,
        appConstants.DEFAULT_PROVIDER_ID,
    );
}