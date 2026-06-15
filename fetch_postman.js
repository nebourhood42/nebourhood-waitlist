const fs = require('fs');
const https = require('https');

const url = 'https://documenter.gw.postman.com/api/collections/38877355/2sBXwnsC4U?environment=38877355-3c9813e5-99bb-4675-b3b8-ab96f64fd536&segregateAuth=true&versionTag=latest';

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    fs.writeFileSync('postman.json', data);
    console.log('Saved to postman.json');
  });
}).on('error', (err) => {
  console.error(err);
});
