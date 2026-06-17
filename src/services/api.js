const saveResult = async (topic, inputs, result) => {
  try {
    const response = await fetch('http://localhost:3001/api/results', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic, inputs, result }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error saving result:', error);
  }
};

export default saveResult;
