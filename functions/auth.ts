const axios = require('axios');

module.exports = {
    validate: async function () {
        return new Promise((resolve, reject) => {

            let current = JSON.parse(localStorage.getItem("current"))
            if(!current) throw new Error("test");

            axios.post('https://authserver.mojang.com/validate', {
                accessToken: current.accessToken,
            }).then(function (response) {
                console.log(response)
                resolve(true);
            }).catch(e => {
                reject(false);
            })
        })
    },

    refresh: async function () {
        return new Promise((resolve, reject) => {
            let current = JSON.parse(localStorage.getItem("current"))

            axios.post('https://authserver.mojang.com/refresh', {
                accessToken: current.accessToken,
                clientToken: current.clientToken,
                selectedProfile: current.selected_profile,
            }).then(function (response) {
                resolve(true);
            }).catch(e => {
                reject(false);
            })
        })
    },

    invalidate: async function() {
        return new Promise((resolve, reject) => {
            let current = JSON.parse(localStorage.getItem("current"))

            axios.post('https://authserver.mojang.com/invalidate', {
                accessToken: current.accessToken,
                clientToken: current.clientToken
            }).then(function (response) {
                if(response.status === 204) {
                    resolve(true);
                }
            }).catch(e => {
            })
        })
    },

    authenticate: async function(email, password) {
        return new Promise((resolve, reject) => {

            axios.post('https://authserver.mojang.com/authenticate', {
                username: email,
                password: password,
                agent: {
                    name: 'Minecraft',
                    version: 1
                },
                requestUser: true
            }).then(function (response) {
                resolve(response.data);
            }).catch(e => {
                reject(e.response);
            })
        })
    }
}