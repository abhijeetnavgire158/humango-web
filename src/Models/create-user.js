import { appConstants } from '../Constants/app-constants';

export default class createUser {
    constructor(tokenId, email, displayName, providerId) {
        this.token_id = tokenId;
        this.email = email;
        this.display_name = displayName
        this.provider_id =providerId;
        this.expires_in = appConstants.EXPIRED_IN;
    }
}