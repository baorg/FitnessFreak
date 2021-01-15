import ajaxRequest from '../../ajaxRequest';
import { API_DOMAIN } from '../../config';


export async function fetchUserData(setUser) {
    let res = (await ajaxRequest('GET', `${API_DOMAIN}/users/get-userdata`)).data;
    if (res.success) {
        setUser(res.user);
    }
}