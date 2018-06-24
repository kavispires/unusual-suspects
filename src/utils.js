export const generateGameId = () =>
  Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, 4)
    .toUpperCase();

const suspectsDB = [];
for (let i = 0; i < 70; i++) {
  suspectsDB.push(`sus${i + 1}`);
}

const shuffle = array => {
  const result = [...array];

  let currentIndex = result.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = result[currentIndex];
    result[currentIndex] = result[randomIndex];
    result[randomIndex] = temporaryValue;
  }

  return result;
};

export const gameSetup = () => {
  const suspects = shuffle(suspectsDB).slice(0, 12);
  const solution = suspects[Math.floor(Math.random() * suspects.length)];
  return {
    suspects,
    solution
  };
};
