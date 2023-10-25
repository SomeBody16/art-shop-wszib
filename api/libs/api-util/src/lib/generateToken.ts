const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export const generateToken = (length = 6) => {
    let result = ''
    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * characters.length)
        result += characters.charAt(index)
    }
    return result
}
