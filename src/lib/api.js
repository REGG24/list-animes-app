const SERVER_DOMAIN = 'http://localhost:3001';

export async function getAllAnimes() {
    let response;
    let data;

    try {
        response = await fetch(`${SERVER_DOMAIN}/animes`);
        data = await response.json();
    } catch (error) {
        throw new Error(error);
    }
   
    if (!response.ok) {
        throw new Error(data.message || 'Could not get animes.');
    }

    return data;
};

export async function getSingleAnime(animeId) {
    let response;
    let data;

    try {
        response = await fetch(`${SERVER_DOMAIN}/animes/${animeId}`);
        data = await response.json();
    } catch (error) {
        throw new Error(error);
    }
   
    if (!response.ok) {
        throw new Error(data.message || 'Could not fetch anime.');
    }
    
    return data;
}

export async function addAnime(animeData) {
    const response = await fetch(`${SERVER_DOMAIN}/animes`, {
        method: 'POST',
        body: JSON.stringify(animeData),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not create anime.');
    }
    
    return null;
}

export async function editAnime(animeData) {
    const { _id, ...animeBody } = animeData;
    const response = await fetch(`${SERVER_DOMAIN}/animes/${_id}`, {
        method: 'PATCH',
        body: JSON.stringify(animeBody),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not edit anime.');
    }
    
    return null;
}

export async function deleteAnime(animeId){
    const response = await fetch(`${SERVER_DOMAIN}/animes/${animeId}`, {
        method: 'DELETE'
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not delete the anime.');
    }

    return data;
}