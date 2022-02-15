import AnimeForm from "../animes/AnimeForm";
import { useEffect } from "react";
import { addAnime } from "../../lib/api";
import useHttp from "../../hooks/use-http";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 


const NewAnime = () => {
    const { sendRequest, status } = useHttp(addAnime);
    const history = useHistory();

    useEffect(() => {
        if(status === 'completed'){
            confirmAlert({
                title: `Anime added!`,
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
    }, [status]);

    const addAnimeHandler = (animeData) => {
        sendRequest(animeData);
    }

    return <AnimeForm onAddAnime={addAnimeHandler}/>
};

export default NewAnime;