export default function getAds(currentHour) {
    return fetch('/ads' , {
        method: 'GET',
        headers: {
        hour: currentHour,
        'Content-Type': 'application/json',
      }})
      .then(res => res.json())
}