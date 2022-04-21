const axios = require('./axios/axios');

class IP {
    id
    ip
    holderUrl

    constructor(holderUrl, myId) {
        this.id = this.id = myId;
        this.ip = this._getIP();
        this.holderUrl = holderUrl;
    }
    _getIP(){
        return require('underscore')
            .chain(require('os').networkInterfaces())
            .values()
            .flatten()
            .find({family: 'IPv4', internal: false})
            .value()
            .address;
    }

    updateIP(){
        this.ip = this._getIP();
    }

    sendIP = async () => {
        const myId = this.id;
        const myIp = this.ip;
        const data = {
            id: myId,
            ip: myIp

        }
        const axiosRes = await axios.POST(this.holderUrl, data);
        if(axiosRes.error) return axiosRes;
        return await axiosRes.response.data;
    }

    getIP(){
        return this.ip;
    }
}

module.exports = { IP }