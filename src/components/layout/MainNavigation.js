import { NavLink } from "react-router-dom";
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>Anime list</div>
            <nav className={classes.nav}>
                <ul>
                    <li>
                        <NavLink to='/animes' activeClassName={classes.active}>
                            All animes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/new-anime' activeClassName={classes.active}>
                            Add an anime
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
};

export default MainNavigation;