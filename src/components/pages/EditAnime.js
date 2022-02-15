import useHttp from "../../hooks/use-http";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import AnimeEdit from "../animes/AnimeEdit";

import { editAnime, getSingleAnime } from "../../lib/api";

import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import LoadingSpinner from "../UI/LoadingSpinner";

const EditAnime = () => {
    const history = useHistory();
    const params = useParams();
    const animeId = params.animeId;

   const { sendRequest: getSingleAnimeRequest, status: statusGetSingleAnime, data: loadedAnime, error } = useHttp(
        getSingleAnime
   );
   const { sendRequest: editAnimeRequest, status: statusEditAnime } = useHttp(editAnime);

   useEffect(() => {
    getSingleAnimeRequest(animeId);
   },[getSingleAnimeRequest, animeId]);

    useEffect(() => {
        if(statusEditAnime === 'completed'){
            confirmAlert({
                title: `Anime edited!`,
                message: '',
                buttons: [
                  {
                    label: 'Ok',
                    onClick: () => {
                        history.push('/animes');
                    }
                  }
                ]
              });
        }
    }, [statusEditAnime, history]);

    const editAnimeHandler = (animeData) => {
        editAnimeRequest(animeData);
    }

    if(statusGetSingleAnime === 'pending'){
        return <LoadingSpinner />
    }

    if(error){
        return <p>Error getting anime: {error}</p>
    }

    return <AnimeEdit onEditAnime={editAnimeHandler} anime={loadedAnime}/>
};

export default EditAnime;