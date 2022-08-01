const cron = require('node-cron');
const axios = require('axios');
const cheerio = require('cheerio');

console.log('BITCOIN SCRAPER');

const runBot = async (currency = 'bitcoin') => {
    let url = `https://coinmarketcap.com/currencies/${currency}/`;

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    let priceSelector = '#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.kjciSH.priceSection > div.sc-16r8icm-0.kjciSH.priceTitle > div > span';

    let price = $(priceSelector).text();

    console.log(`${currency.toUpperCase()}:${price}`);
};

runBot();

cron.schedule('*/10 * * * * *', () => {
    runBot();
});