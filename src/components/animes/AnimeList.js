import classes from './AnimeList.module.css';
import AnimeItem from './AnimeItem';

const AnimeList = (props) => {
    return(      
        <div className={classes.grid}>
            {props.animes.map((anime) => (
                 <AnimeItem
                    key={anime._id} 
                    id={anime._id}
                    src={anime.imagePath}
                    alt={anime.name}
                    title={anime.name}
                    description={anime.description}
                 />
             ))}
        </div>   
    );
};

export default AnimeList;