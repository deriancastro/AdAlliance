export default function updateViewsAds(idAd1, tableAd1, idAd2, tableAd2) {
    return fetch('/api/ads', {
        method: 'PATCH',
        headers: {
          idAd1: idAd1,
          tableAd1: tableAd1,
          idAd2: idAd2,
          tableAd2: tableAd2,
          'Content-Type': 'application/json', 
        }})
        .then(res => console.log(res.ok))      
}