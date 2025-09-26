const axios = require('axios');
const pLimit = require('p-limit').default;

const TIMEOUT = process.env.TIMEOUT ? parseInt(process.env.TIMEOUT) : 5000;
const CONCURRENCY = process.env.CONCURRENCY ? parseInt(process.env.CONCURRENCY) : 5;

exports.checkSites = async (sites) => {
  const limit = pLimit(CONCURRENCY);

  const checkSite = async (site) => {
    const start = Date.now();
    try {
      const response = await axios.get(site.url, { timeout: TIMEOUT });
      return {
        ...site,
        status: 'UP',
        statusCode: response.status,
        responseTime: Date.now() - start,
        checkedAt: new Date().toISOString()
      };
    } catch (error) {
      return {
        ...site,
        status: 'DOWN',
        statusCode: error.response ? error.response.status : null,
        responseTime: Date.now() - start,
        checkedAt: new Date().toISOString()
      };
    }
  };

  const promises = sites.map(site => limit(() => checkSite(site)));
  const results = await Promise.all(promises);
  return results;
};
