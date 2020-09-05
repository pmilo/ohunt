const createServer = require('http').createServer;
const url = require('url');
const axios = require('axios');
const chalk = require('chalk');
const config = require('./config');

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://occuhunt.com',
    'Access-Control-Methods': 'GET, POST, OPTIONS',
};

// ?search=php&location=london

const decodeParams = searchParams => Array
    .from(searchParams.keys())
    .reduce((acc, key) => ({
        ...acc,
        [key]: searchParams.get(key)
    }), {});


const server = createServer((req, res) => {
    // console.log('req.url');
    // console.log(req.url);

    // get search query url and covert to url object with url.parse
    const requestURL = url.parse(req.url);
    // console.log('requestURL:');
    // console.log(requestURL);

    const decodedParams = decodeParams(new URLSearchParams(requestURL.search));
    // decodedParams = { search: 'php', location: 'london' }

    // deconstruct decodedParams object properties into separate variables
    const {
        search,
        location,
        country = 'gb'
    } = decodedParams;

    // build url string to target/query/fetch data from API
    const targetURL = `${config.BASE_URL}/${country.toLowerCase()}/${config.BASE_PARAMS}&app_id=${config.APP_ID}&app_key=${config.API_KEY}&what=${search}&where=${location}`;

    if (req.method === 'GET') {

        console.log(chalk.green(`Proxy GET request to: ${targetURL}`));
        axios.get(targetURL)
            .then(response => {
                // define header status & content type
                res.writeHead(200, headers);
                // convert response data to JSON string & send to DOM
                /// FOR EACH RESPONSE.DATA / company.company_name
                res.end(JSON.stringify(response.data))
            })
            .catch(error => {
                console.log(chalk.red(error));
                res.writeHead(500, headers);
                res.end(JSON.stringify(error));
            });
    }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(chalk.blue(`Server listening on PORT ${PORT}...`));
})