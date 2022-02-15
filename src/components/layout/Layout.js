import { Fragment } from "react";
import MainNavigation from "./MainNavigation";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

import classes from './Layout.module.css';

const Layout = (props) => {
    let location = useLocation();
    let classMain;
    console.log(location.pathname);

    if(location.pathname.includes('edit-anime') || location.pathname.includes('new-anime') || location.pathname.includes('animes/')) {
        classMain = 'medium-screen';
        console.log('flag1');
    }else{
        console.log('flag2');
        classMain = 'full-screen';
    }

    return(
        <Fragment>
            <MainNavigation />
            <main className={classes[classMain]}>{props.children}</main>
        </Fragment>
    )
};

export default Layout;