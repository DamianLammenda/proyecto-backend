

 process.on('message', ({ cant }) => {
    const randomNumbers = {};
  
    for (let i = 0; i < cant; i++) {
      const randomNumber = Math.floor(Math.random() * 1000) + 1;
  
      if (randomNumbers[randomNumber]) {
        randomNumbers[randomNumber]++;
      } else {
        randomNumbers[randomNumber] = 1;
      }
    }
  
    process.send(randomNumbers);
  });