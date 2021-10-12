const { ipcRenderer } = require('electron')
const axios = require('axios')

module.exports = {
  validate: async function () {
    return new Promise((resolve, reject) => {
      const current = JSON.parse(localStorage.getItem('current'))
      if (!current) throw new Error('test')

      axios.post('https://authserver.mojang.com/validate', {
        accessToken: current.accessToken
      }).then(response => {
        console.log(response)
        resolve(true)
      }).catch(() => {
        reject(new Error('Faild to validate access token.'))
      })
    })
  },

  refresh: async function () {
    return new Promise((resolve, reject) => {
      const current = JSON.parse(localStorage.getItem('current'))

      axios.post('https://authserver.mojang.com/refresh', {
        accessToken: current.accessToken,
        clientToken: current.clientToken,
        selectedProfile: current.selected_profile
      }).then(() => {
        resolve(true)
      }).catch(() => {
        reject(new Error('Could not refresh access token.'))
      })
    })
  },

  invalidate: async function () {
    return new Promise((resolve, reject) => {
      const current = JSON.parse(localStorage.getItem('current'))

      axios.post('https://authserver.mojang.com/invalidate', {
        accessToken: current.accessToken,
        clientToken: current.clientToken
      }).then(response => {
        if (response.status === 204) {
          resolve(true)
        }
      }).catch(() => {
        reject(new Error('Could not invalidate access token.'))
      })
    })
  },

  authenticate: async function (email, password) {
    return new Promise((resolve, reject) => {
      axios.post('https://authserver.mojang.com/authenticate', {
        username: email,
        password: password,
        agent: {
          name: 'Minecraft',
          version: 1
        },
        requestUser: true
      }).then(response => {
        console.log(response)
        resolve(response.data)
      }).catch(e => {
        reject(e.response)
      })
    })
  },

  msPopup: async function() {
    ipcRenderer.send("microsoft-login")
  }
}
