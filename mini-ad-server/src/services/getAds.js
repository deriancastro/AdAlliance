export default function getAds(currentHour) {
    return fetch('/api/ads' , {
        method: 'GET',
        headers: {
        hour: currentHour,
        'Content-Type': 'application/json',
      }})
      .then(res => res.json())
}