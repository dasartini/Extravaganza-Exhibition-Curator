import axios from 'axios';

export function getArtworks(num =1) {
    if(num ===null){ num =1}
    else if(num >0){num++}
    return axios.get(`https://api.artic.edu/api/v1/artworks?page=${num}&limit=8`)
        .then((response) => {
            return response.data.data; 
        })
        .catch((error) => {
            console.error('Error fetching artworks:', error);
            throw error;
        });
}
export function getArtworksOther(num = 0) {
if(num ===0 ){num =0 }
else if(num!==0){num += 8}
    return axios.get(`https://openaccess-api.clevelandart.org/api/artworks?limit=8&skip=${num}`
    
    )
        .then((response) => {
           console.log(response.data.data)
            return response.data.data
        })
        .catch((error) => {
            console.error('Error fetching artworks:', error);
            throw error;
        });
}

export function getArtworksById(artwork_id){
return axios.get(`https://api.artic.edu/api/v1/artworks/${artwork_id}`)
.then((response)=>{
    return response.data.data
})
.catch((error) => {
    console.error('Error fetching specific artwork:', error);
    throw error;
});

}

export function getArtworksById2(artwork_id){
    return axios.get(`https://openaccess-api.clevelandart.org/api/artworks/${artwork_id}`)
    .then((response)=>{
        return response.data.data
    })
    .catch((error) => {
        console.error('Error fetching specific artwork:', error);
        throw error;
    });
    
    }
