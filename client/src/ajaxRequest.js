import axios from "axios"

async function axiosCall(method, url, obj){

    const promise = await axios(
      {
        method : method,
        url : url,
        data : JSON.stringify(obj),
        headers: {'Content-Type': 'application/json' },
        withCrdentials: true
      }
    )
    return promise;
}

export default axiosCall