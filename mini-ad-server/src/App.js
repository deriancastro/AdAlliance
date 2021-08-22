import { Switch, Route, useHistory} from 'react-router-dom';
import { useEffect} from 'react';
import useLocalStorage from './lib/useLocalStorage';
import Wellcome from './pages/Wellcome';
import Home from './pages/Home';
import DetailsPage from './pages/DetailsPage';
import defaultAd from './lib/defaultAdsFrontend.json';//Falls es keine Verbindung zur Datenbank gibt 
import styled from 'styled-components';
import getAds from './services/getAds';
import updateViewsAds from './services/updateViewsAds';

export default function App() {
  const defaultAds = defaultAd;
  const currentHour = 4;
  //new Date().getHours();
  const [ads, setAds] = useLocalStorage('ads', defaultAds);
  const [currentAdLink, setCurrentAdLink] = useLocalStorage('currentLink',{});
  const idAd1 = ads[0].advert_id;
  const tableAd1 = ads[0].flag;
  const idAd2 = ads[1].advert_id;
  const tableAd2 = ads[1].flag;
  const { push } = useHistory()

  useEffect(() => {
    getAds(currentHour)
    .then(ads => {setAds(ads)})
    .catch(error => console.log(error))

    updateViewsAds(idAd1, tableAd1, idAd2, tableAd2)
    .catch(error => console.log(error))

  },[currentHour]);

  //um die Ergebnisse nach Zeiten, Positionen und Prioritäten zu überprüfen 
  //wenn nur eine Anzeige vorhanden ist, wurde eine weitere Anzeige zufällig aus utils/defaultAd.json hinzugefügt
  console.log(ads);
 
  return (
    <WrapperApp>
        <Switch>
          <Route exact path="/">
            <Wellcome toAds={toHomePage}/>
          </Route>
          <Route path="/home">
            <Home data={ads} onDetail={toDetailsPage} toWellcome={toWellcome} />
          </Route>
          <Route path="/details">
            <DetailsPage currentAd={currentAdLink} toHome={toHomePage}/>
          </Route>
        </Switch> 
    </WrapperApp>
  );

  function toHomePage() {
    push('/home');
  }

  function toWellcome() {
    push('/');
  }

  function toDetailsPage({currentLink}) {
    setCurrentAdLink({currentLink});
    push('/details');
  }
   
}

const WrapperApp = styled.div`
  height: 100vh;
`


