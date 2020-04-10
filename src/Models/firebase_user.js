import { appConstants } from '../Constants/app_constants';

export default class FirebaseUser {
    constructor(uid, email, displayName, providerId) {
        this.uid = uid;
        this.email = email;
        this.displayName = displayName
        this.providerId =providerId;
        this.expiresIn = appConstants.EXPIRED_IN;
    }
}