export const API_NOTIFICATION = {
    loading: {
        title : 'loading..',
        message : 'data is being loaded, please wait'
    },
    success : {
        title : 'success',
        message : "data successfully loaded"
    },
    responseFailure : {
        title : 'error',
        message : 'An error occured while fetching the data from the server, please try again later'
    },
    requestFailure : {
        title : 'error',
        message : 'An error occured while parsing the data'
    },
    networkError : {
        title : 'error',
        message : 'Unable to connect to the server, Please check internet connection and try again'
    }
}


export const SERVICE_URL = {
    userSignup : { url: '/signup', method: 'POST'},
    userLogin : { url: '/login', method: 'POST'},
    createCollection : { url: '/createCollection', method: 'POST'},
}