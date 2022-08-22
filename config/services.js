const axios = require('axios').default;

module.exports = async () => {
    let options = {
        headers:{
            "Content-Type": "application/json",
             Accept: "application/json",
            "app-id": "6ed63cd2-b596-4688-a45a-9583985e6e2b",
            "X-Paguetodo-ID":"ceb4db72-bfc0-418d-81c0-3b4f554b208f",
        }
    }
    try {
        const services = await axios.get('https://apid.paguetodo.com/demo/deegle_open/service_pay_public/products?app-id=6ed63cd2-b596-4688-a45a-9583985e6e2b', options);
        const { data } = services;
        return data;
    } catch (err) {
        console.log(err.message);
    }
   
 
}