export const USER_CREDENTIALS = 'USER_CREDENTIALS';

export function setCredentials(userLogin){
    return {
        type: USER_CREDENTIALS,
        userLogin: userLogin
    }
}