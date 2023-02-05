const axios = require('axios');

exports.handler = async function (event) {
  const { difficulty } = event.queryStringParameters;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': 'sudoku-generator1.p.rapidapi.com',
    },
  };

  try {
    const createResponse = await axios({
      ...options,
      url: `https://sudoku-generator1.p.rapidapi.com/sudoku/generate`,
      params: { difficulty },
    });

    const solveResponse = await axios({
      ...options,
      url: `https://sudoku-generator1.p.rapidapi.com/sudoku/solve`,
      params: { puzzle: createResponse.data.puzzle },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        puzzle: createResponse.data.puzzle,
        solution: solveResponse.data.solution,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error.toString(),
    };
  }
};
