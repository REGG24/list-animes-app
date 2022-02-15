import AnimeList from '../animes/AnimeList';
import useHttp from '../../hooks/use-http';
import { getAllAnimes } from '../../lib/api';
import { useEffect } from 'react';
import LoadingSpinner from '../UI/LoadingSpinner';

const AllAnimes = () => {
    const { sendRequest, status, data: loadedAnimes, error } = useHttp(
        getAllAnimes,
        true
    );
    
    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    if (status === 'pending') {
        return (
          <div className='centered'>
            <LoadingSpinner />
          </div>
        );
    }

    if (error) {
        return <p>{error}</p>;
    }

    return <AnimeList animes={loadedAnimes} />;
};

export default AllAnimes;