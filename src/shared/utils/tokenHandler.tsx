export default {
    /**
     * returns token if it exists
     *
     * @return {string | boolean} returns token or false if the token doesn't exist
     */
    get: () => {
        try {
            return localStorage.getItem('token')
        } catch (err) {
            return false
        }
    },
    /**
     * set token if it exists
     *
     */
    set: (token: string) => {
        if (token) localStorage.setItem('token', token)
        return token
    },
    /**
     * removes token
     *
     */
    remove: () => {
        localStorage.removeItem('token')
    },
    /**
     * clear entire lovalStorage
     *
     */
    removeAll: () => {
        localStorage.clear()
    },
}
