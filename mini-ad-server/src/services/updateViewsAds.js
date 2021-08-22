export default function updateViewsAds(idAd1, tableAd1, idAd2, tableAd2) {
    return    fetch('/views/' + idAd1 + '/' + tableAd1 + '/' + idAd2 + '/' + tableAd2 , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        }})
        .then(res => console.log(res.ok))
}