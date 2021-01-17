import axios from "axios";
import networkProblem from './networkproblem';

async function axiosCall(method, url, obj) {
    try {
        const res = await axios({
            method: method,
            url: url,
            data: JSON.stringify(obj),
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
        return res;
    } catch (err) {
        networkProblem();
        return ({ data: { success: false } });
    }
}

export default axiosCall;