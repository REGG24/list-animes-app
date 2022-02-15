import './App.css';
import { Suspense } from 'react/cjs/react.production.min';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';
import { Redirect, Switch, Route } from 'react-router-dom';
import AllAnimes from './components/pages/AllAnimes';
import NewAnime from './components/pages/NewAnime';
import EditAnime from './components/pages/EditAnime';
import AnimeDetails from './components/pages/AnimeDetail';

function App() {
  return (
      <Layout >
        <Suspense
         fallback={
          <div className='centered'>
            <LoadingSpinner />
          </div>
         }
        >
          <Switch>
            <Route exact path='/'>
              <Redirect to='/animes'/>
            </Route>
            <Route exact path='/animes'>
              <AllAnimes />
            </Route>
            <Route exact path='/animes/:animeId'>
              <AnimeDetails />
            </Route>
            <Route exact path='/new-anime'>
              <NewAnime style='estilos'/>
            </Route>
            <Route exact path='/edit-anime/:animeId'>
              <EditAnime />
            </Route>
          </Switch>
        </Suspense>
      </Layout>
  );
}

export default App;
