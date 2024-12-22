import axios from 'axios';

export function getArtworks(num = 1, searchQuery = "") {
    if (num === 1) { 
        num = 1
    } else if (num > 0) { 
        num++
    }

    const baseURL = "https://api.artic.edu/api/v1/artworks"
    const url = searchQuery 
        ? `${baseURL}/search?q=${searchQuery}&page=${num}&limit=30` 
        : `${baseURL}?page=${num}&limit=30`;

    return axios.get(url)
        .then((response) => {
            return response.data.data
        })
        .catch((error) => {
            console.error('Error fetching artworks:', error)
            throw error
        })
}

// export function getArtworksOther(num = 0, query) {
// if(num ===0 ){num =0 }
// else if(num!==0){num += 30}
//     return axios.get(`https://openaccess-api.clevelandart.org/api/artworks`,{
//         params :{
//             limit: 30,
//             skip : num,
//             q: query
//         }
//     }
    
//     )
//         .then((response) => {
//             return response.data.data
//         })
//         .catch((error) => {
//             console.error('Error fetching artworks:', error);
//             throw error
//         })
// }

export function getArtworksOther(num = 0, query) {
    if (num === 0) {
        num = 0;
    } else if (num !== 0) {
        num += 30;
    }

    const apiUrl = `https://openaccess-api.clevelandart.org/api/artworks?limit=30&skip=${num}&q=${query}`

    return axios
        .get(apiUrl)
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            console.error("Error fetching artworks:", error)
            throw error;
        })
}

export function getArtworksById(artwork_id){
return axios.get(`https://api.artic.edu/api/v1/artworks/${artwork_id}`)
.then((response)=>{
    return response.data.data
})
.catch((error) => {
    console.error('Error fetching specific artwork:', error)
    throw error
})

}

export function getArtworksById2(artwork_id){
    return axios.get(`https://openaccess-api.clevelandart.org/api/artworks/${artwork_id}`)
    .then((response)=>{
        return response.data.data
    })
    .catch((error) => {
        console.error('Error fetching specific artwork:', error)
        throw error
    })
    
    }
