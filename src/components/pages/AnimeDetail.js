import { useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import useHttp from "../../hooks/use-http";

import { deleteAnime, getSingleAnime } from "../../lib/api";

import Card from "../UI/Card";
import classes from './AnimeDetail.module.css';

import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import LoadingSpinner from "../UI/LoadingSpinner";


const AnimeDetails = () => {
   const history = useHistory();
   const params = useParams();
   const { animeId } = params;


   const { sendRequest, status, data: loadedAnime, error } = useHttp(
        getSingleAnime,
        true
   );

   useEffect(() => {
     sendRequest(animeId);
   },[sendRequest, animeId]);



   const { sendRequest: deleteRequest, status: statusDeleteRequest, error: errorDeletingAnime } = useHttp(
        deleteAnime,
        true
   );

   useEffect(() => {
    if (statusDeleteRequest === 'completed') {
        confirmAlert({
            title: `Anime Deleted!`,
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
  }, [statusDeleteRequest, history]);



  if (status === 'pending') {
    return (
      <LoadingSpinner />
    );
  } 

  if (error) {
    return <p className='centered'>{error}</p>;
  }

  if(errorDeletingAnime){
    confirmAlert({
        title: `Error deleting Anime!`,
        message: errorDeletingAnime,
        buttons: [
          {
            label: 'Yes'
          }
        ]
      }); 
  }

  const deleteHandler = () => {
    confirmAlert({
        title: `Delete ${loadedAnime.name}`,
        message: 'Are you sure to delete this anime?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
                deleteRequest(animeId);
            }
          },
          {
            label: 'No',
          }
        ]
      });    
  }

    return (
    <Card>
          <div className={classes.container}>
            <div>
                <img src={loadedAnime.imagePath} alt={loadedAnime.name} />
            </div>
            <div className={classes['container-details']}>
                <div className={classes['container-details-header']}>
                    <p className={classes.title}><strong>{loadedAnime.name}</strong></p>
                    <div className={classes.buttons}>
                        <Link className={classes.link} to={`/edit-anime/${loadedAnime._id}`}>
                          <FaEdit 
                              className={classes.button}
                          />
                        </Link>
                        <FaTrashAlt
                            className={classes.button}
                            onClick={deleteHandler}
                        />
                    </div>
                </div>
                <p className={classes.description}>{loadedAnime.description}</p>
                <p><b>Author: </b>{loadedAnime.author}</p>
                <p><b>Finalized: </b>{loadedAnime.finalized ? 'Yes' : 'No'}</p>
                <p><b>Las chapter seen: </b>{loadedAnime.actualChapter}</p>
             </div>
          </div> 
    </Card>
   )
};

export default AnimeDetails;