import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 3001; // Port for the proxy server

// Enable CORS middleware
app.use(cors());

app.get('/api/data', (req, res) => {
  const apiUrl = 'https://www.bnr.ro/nbrfxrates.xml';
  const originHeader = req.get('Origin');

  axios
    .get(apiUrl, {
      headers: {
        'Origin': originHeader
      },
    })
    .then(response => {
      res.set('Access-Control-Allow-Origin', originHeader);
      res.send(response.data);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error occurred while fetching data');
    });
});

app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
