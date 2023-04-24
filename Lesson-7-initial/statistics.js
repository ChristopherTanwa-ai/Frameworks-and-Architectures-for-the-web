async function getSessions() {
  return new Promise((resolve, reject) => {
    setTimeout(
      // execute a function with the specified delay
      async () => {
        let sessionsArray = [];
        let sessionsString = localStorage.sessions;
        if (sessionsString !== undefined)
          sessionsArray = JSON.parse(sessionsString);
        resolve(sessionsArray);
      },
      100 // wait 0.1 second
    );
  });
}

function saveSessions(sessionsArray) {
  if (!Array.isArray(sessionsArray))
    throw new Error("saveSessions: argument is not array!");
  let sessionsString = JSON.stringify(sessionsArray);
  localStorage.sessions = sessionsString;
}

function incAttempts() {
  getSessions().then((sessionsArray) => {
    let newSession = { isWin: false, startTime: new Date() };
    sessionsArray.push(newSession);
    saveSessions(sessionsArray);
  });
}

// return number of sessions
async function getAttempts() {
  // to implement using reduce method
  let sessionsArray = await getSessions();
  return sessionsArray.reduce((acc, curr) => ++acc, 0);
}

// set win in the last session
function incWins() {
  getSessions().then((sessionsArray) => {
    if (sessionsArray.length > 0) {
      let lastSession = sessionsArray[sessionsArray.length - 1];
      lastSession.isWin = true;
    }
    saveSessions(sessionsArray);
  });
}

// return number of wins
async function getWins() {
  // to implement using filter and reduce methoda
  let sessionsArray = await getSessions();
  let wins = sessionsArray
    .filter((val) => val.isWin)
    .reduce((acc, curr) => ++acc, 0);
  return wins;
}

// set loss in the last session
function incLosses() {
  getSessions().then((sessionsArray) => {
    if (sessionsArray.length > 0) {
      let lastSession = sessionsArray[sessionsArray.length - 1];
      lastSession.isWin = false;
    }
    saveSessions(sessionsArray);
  })
}

// return number of losses
async function getLosses() {
  // to implement using reduce method
  let sessionsArray = await getSessions();
  let losses = sessionsArray
    .filter((val) => !val.isWin)
    .reduce((acc, curr) => ++acc, 0);
  return losses;
}

function resetStatistics() {
  localStorage.sessions = undefined;
}
