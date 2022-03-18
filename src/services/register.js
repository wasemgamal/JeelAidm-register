import axios from 'axios'

export default class Register {
    // Register Form
    registerForm = (data) => {
      return axios.post('https://jeelaidm-748b.restdb.io/rest/invitations?apikey=622ceb3adced170e8c83a1fd', data)
    }
}
