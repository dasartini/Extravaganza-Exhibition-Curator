import axios from 'axios';

export function getArtworks() {
    return axios.get('https://api.artic.edu/api/v1/artworks?page=5&limit=8')
        .then((response) => {
            // Ensure we are returning only the 'data' field containing artwork array
            return response.data.data; 
        })
        .catch((error) => {
            console.error('Error fetching artworks:', error);
            throw error;
        });
}
export function getArtworksOther() {
    return axios.get('https://openaccess-api.clevelandart.org/api/artworks?limit=5'
    
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


getArtworksOther()

