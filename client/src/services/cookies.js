import axios from "axios";

const createCookies = () => {
   axios.get('http://localhost:8080', {
      withCredentials: true
   }).then((res) => {
      console.log(res.data);
   })
}

export {
   createCookies
}