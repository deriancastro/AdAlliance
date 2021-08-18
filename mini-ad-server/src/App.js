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
  console.log(def);
  const [dataPosition1, setDataPosition1] = useLocalStorage('data1', def);
  const [dataPosition2, setDataPosition2] = useLocalStorage('data2', def);
  const [currentAdLink, setCurrentAdLink] = useState({});
  const { push } = useHistory()
  const hour = 4;

  useEffect(() => {
    fetch('/ads1/' + hour)
    .then(res => res.json())
    .then(dataPosition1 => {
      if(!dataPosition1.length){
          setDataPosition1(def)
      }else{
        setDataPosition1(dataPosition1)
      }
     })
    .catch(error => console.log(error))
  },[]);

  useEffect(() => {
    fetch('/ads2/' + hour)
    .then(res => res.json())
    .then(dataPosition2 => {
      if(!dataPosition2.length){
        setDataPosition2(def)
      }else{
        setDataPosition2(dataPosition2)
      }   
    })
    .catch(error => console.log(error)) 
  },[]);

  console.log(dataPosition1);
  console.log(dataPosition2);

  
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


