import ajaxRequest from '../../ajaxRequest';
import { API_DOMAIN } from '../../config';


export async function fetchUserData(setUser) {
    const myStorage = window.localStorage;
    const sessStorage = window.sessionStorage;

    const user = sessStorage.getItem('user');

    if(user && false){
        setUser(user);

    }else{
        let res = (await ajaxRequest('GET', `${API_DOMAIN}/users/get-userdata`)).data;
        if (res.success) {
            sessStorage.setItem('user_username', res.user.username);
            sessStorage.setItem('user_profileimage', res.user.profile_image);
            
            setUser(res.user);
        }else{
            setUser(null);
            sessStorage.setItem('user', null);
            console.log('Failed.');
        }
    }
    
}