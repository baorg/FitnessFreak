import { useState, createContext, useEffect } from 'react';
import { API_DOMAIN } from '../../config';
import ajaxRequest from '../../ajaxRequest';

const CategoriesContext = createContext([
    [], () => {}, () => {}
]);

const CategoriesProvider = (props) => {
    const [categories, setCategories] = useState([]);
    useEffect(() => { refreshCategories(); }, []);

    return (
        <CategoriesContext.Provider
            value={[categories, setCategories, refreshCategories]} >
            { props.children}
        </CategoriesContext.Provider>
    );

    async function refreshCategories() {
        console.log('fetching categories......');
        try {
            let res = await ajaxRequest('GET', `${API_DOMAIN}/question/getCategory`);
            if(res.data.success){
                setCategories(res.data.categories_data);
            }
        } catch (err) {
            console.error('ERROR:', err);
        }
    }
};

export { CategoriesContext, CategoriesProvider };