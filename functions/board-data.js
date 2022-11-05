const axios = require('axios');

exports.handler = async function (event) {
  const { difficulty } = event.queryStringParameters;

  const options = {
    method: 'GET',
    url: `https://sudoku-board.p.rapidapi.com/new-board`,
    params: { diff: difficulty, stype: 'string', solu: 'true' },
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': 'sudoku-board.p.rapidapi.com',
    },
  };

  try {
    const response = await axios(options);

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error.toString(),
    };
  }
};
