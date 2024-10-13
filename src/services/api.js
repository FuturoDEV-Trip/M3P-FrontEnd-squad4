
export function api(endpoint, init) {
    // const url = `http://localhost:3000` + endpoint
    const url =  'https://m3p-backend-squad4-34p5.onrender.com' + endpoint
    return fetch (url, init)
}