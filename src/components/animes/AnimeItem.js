import classes from './AnimeItem.module.css';
import { Link } from 'react-router-dom';

const AnimeItem = (props) => {
    return (
        <Link className={classes.link} to={`/animes/${props.id}`}>
            <div className={classes.card}>
                <img src={props.src} alt={props.alt} />
                <div className={classes.container}>
                    <h4><b>{props.title}</b></h4> 
                    <p className={classes.description}>{props.description}</p> 
                </div>
            </div>
        </Link>
    )
}

export default AnimeItem;