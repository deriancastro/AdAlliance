export default function updateViewsAds(idAd1, tableAd1, idAd2, tableAd2) {
    return fetch('/api/ads', {
        method: 'PATCH',
        headers: {
          idad1: idAd1,
          tablead1: tableAd1,
          idad2: idAd2,
          tablead2: tableAd2,
          'Content-Type': 'application/json', 
        }})
        .then(res => console.log(res.ok))      
}