import { Switch, Route, useHistory} from 'react-router-dom';
import { useEffect, useState} from 'react';
import useLocalStorage from './lib/useLocalStorage';
import Wellcome from './pages/Wellcome';
import Home from './pages/Home';
import DetailsPage from './pages/DetailsPage';
import defaultAd from './utils/defaultAd.json';
import styled from 'styled-components';

export default function App() {
  const defPosition1a = defaultAd[0];
  const defPosition1b = defaultAd[1];
  const defPosition2a = defaultAd[2];
  const defPosition2b = defaultAd[3];

  const [dataPosition1, setDataPosition1] = useLocalStorage('data1', defPosition1a);
  const [dataPosition2, setDataPosition2] = useLocalStorage('data2', defPosition2a);
  const [currentAdLink, setCurrentAdLink] = useLocalStorage('currentLink',{});
  //const [hour, setHour] = useState(null);
  const { push } = useHistory()
 
  const currentHour = new Date().getHours();
  console.log(currentHour);
  //setHour(currentHour);

  const header = {headers: {
    hour:currentHour,
    position1: 1,
    position2: 2,
  }}
  
  useEffect(() => {
    fetch('/ads' , header)
    .then(res => res.json())
    .then(dataPositionOne => {
      if(!dataPositionOne.length){
          setDataPosition1(defPosition1a) 
      }else if(dataPositionOne.length === 1){
        setDataPosition1(dataPositionOne[0])
      }else {
         console.log('more than one result');
      }
     })
    //.then(() => {window.location.reload()})
    .catch(error => console.log(error))
  },[]);
 
 console.log(dataPosition1);
 console.log(dataPosition2);
 //console.log(hour);

  return (
    <WrapperApp>
        <Switch>
          <Route exact path="/">
            <Wellcome toAds={toHomePage}/>
          </Route>
          <Route path="/home">
            <Home data1={dataPosition1} data2={dataPosition2} onDetail={toDetailsPage} toWellcome={toWellcome} />
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


