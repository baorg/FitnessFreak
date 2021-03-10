import ajaxRequest from '../../ajaxRequest';
import {API_DOMAIN} from '../../config';

async function fetchFromServer(){
    let res = await ajaxRequest('GET', `${API_DOMAIN}/question/getCategory`);
    // console.log('Res Data: ', res.data);
    if(res.data.success){
        return res.data.categories;
    }

    return null;
}

export default async function fetchCategories(){
    try {
        let sessionStorage=window.sessionStorage;

        let categories = sessionStorage.getItem('categories');

        if(categories===null){
            categories = await fetchFromServer();
            if(categories!==null)
                sessionStorage.setItem('categories',categories);
        }else{
            categories = categories.split(',');
            console.log('Session Storage: ',categories);
        }

        return categories;
        
    } catch (err) {
        console.error(err);
    }
}