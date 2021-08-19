import { Switch, Route, useHistory} from 'react-router-dom';
import { useEffect, useState } from 'react';
import useLocalStorage from './lib/useLocalStorage';
import Wellcome from './pages/Wellcome';
import Home from './pages/Home';
import DetailsPage from './pages/DetailsPage';
import defaultAd from './utils/defaultAd.json';
import styled from 'styled-components';



export default function App() {
  const def = defaultAd;
  const [dataPosition1, setDataPosition1] = useLocalStorage('data1', def);
  const [dataPosition2, setDataPosition2] = useLocalStorage('data2', def);
  const [currentAdLink, setCurrentAdLink] = useState({});
  const { push } = useHistory()
  


  //man muss manuell ändern und die Seite reload
  const hour = 5;
  
  useEffect(() => {
    fetch('/ads1/' + hour)
    .then(res => res.json())
    .then(dataPositionOne => {
      if(!dataPositionOne.length){
          setDataPosition1(def)
      }else{
        setDataPosition1(dataPositionOne)
      }
     })
    .catch(error => console.log(error))
  },[hour]);

  useEffect(() => {
    fetch('/ads2/' + hour)
    .then(res => res.json())
    .then(dataPositionTwo => {
      if(!dataPositionTwo.length){
        setDataPosition2(def)
      }else{
        setDataPosition2(dataPositionTwo)
      }   
    })
    .catch(error => console.log(error)) 
  },[hour]);
 
  return (
    <WrapperApp>
        <Switch>
          <Route exact path="/">
            <Wellcome toAds={showHomePage}/>
          </Route>
          <Route path="/home">
            <Home data1={dataPosition1} data2={dataPosition2} onDetail={showDetailPage} toWellcome={backToWellcome} />
          </Route>
          <Route path="/details">
            <DetailsPage currentAd={currentAdLink} toHome={backToHome}/>
          </Route>
        </Switch> 
    </WrapperApp>
  );

  function showHomePage() {
    push('/home');
  }

  function backToWellcome() {
    push('/');
  }

  function showDetailPage({currentLink}) {
    setCurrentAdLink({currentLink});
    push('/details');
  }

  function backToHome() {
    push('/home');
  }
   
}

const WrapperApp = styled.div`
  height: 100vh;
`


