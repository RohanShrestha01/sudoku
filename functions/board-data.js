exports.handler = async function (event) {
  const { difficulty } = event.queryStringParameters;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': 'sudoku-board.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(
      `https://sudoku-board.p.rapidapi.com/new-board?diff=${difficulty}&stype=string&solu=true`,
      options
    );
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error.toString(),
    };
  }
};
