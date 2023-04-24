
    
    function handleDropDown() {
      var dropdown = document.getElementsByClassName("dropdown-btn");
      var i;
  
      for (i = 0; i < dropdown.length; i++) {
        dropdown[i].addEventListener("click", function () {
          this.classList.toggle("active");
          var dropdownContent = this.nextElementSibling;
          if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
          } else {
            dropdownContent.style.display = "block";
          }
        });
      }
    }
    
    function openTab(evt, tabName) {
      var i, tabcontent, tablinks;
      // find all elements with class tabcontent
      // to each tabcontent set style display to none
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }

      // find all elements with class tablinks
      // set each tablink that it has no "active" class
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      // set each tablink that it has no "active" class
      document.getElementById(tabName).style.display = "block";
      evt.currentTarget.className += " active";
    }

    function addUserName() {
      const userName = localStorage.fname;
      if (userName !== undefined) {
        document.getElementById("message").innerHTML =
          userName + ", test your knowledge skills on birds";
      }
    }

    async function showStatistics() {
      const userName = localStorage.fname + ' ' + localStorage.lname;
      let results = await Promise.all([getAttempts(), getWins(), getLosses()])

      document.getElementById('statistics-title').innerHTML = 'Bird Quiz statistics for ' + userName
      document.getElementById('atempts').innerHTML = 'Number of attempts: ' + results[0]
      document.getElementById('wins').innerHTML = 'Number of wins: ' + results[1]
      document.getElementById('losses').innerHTML = 'Number of losses: ' + results[2]
      let data = await generateSessionTable()
    //  document.getElementById('table-data-rows').innerHTML = data
      document.getElementById('sessions').innerHTML =data
    }

    function makeRow(curr, index) {
      return `<tr> <td>${index+1}</td> <td>${curr.isWin?'Win':'Loss'}</td> </tr>`
    }
    function con(acc, curr) {
      let res = acc + curr;
      return res
    }
    // return html text table of quiz sessions
    async function generateSessionTable() {
      let sessionsArray = await getSessions();
       let rows = sessionsArray.map(makeRow).reduce(con,'')
      return `
      <table>
        <tr>
        <th>Session</th>
        <th>Result</th>
      </tr>
      ${rows}
      </table>
      `
    }

    // another version of the generateSessionTable function that was developed during the online excercise session
    // illustrate various ways how map reduce  can be used
    function generateSessionTable2() {
      
      let sessionsArray = getSessions();
  
    // normal function
      let f = (session) => {
          if(session.isWin)
            return "Win"
           else 
           return "Loss" 
      }
      // arrow function with ternary conditional operator
      let f2 = (session) => session.isWin ? "Win":"Loss"

      // let rows1 = sessionsArray.map(f)
      // let rows1 = sessionsArray.map(f2)
      let rows1 = sessionsArray.map((session) => session.isWin ? "Win":"Loss")
      // ["Win", "Loss", "Loss", "Win"]

      let f3 = (elem, index) => `<tr><td>${index}.</td><td>${elem}</td></tr>`
      let rows2 = rows1.map(f3)

      f4 = (total, currentValue) => total + currentValue
      // let rows = rows2.reduce(f4,"")

      // let rows = sessionsArray.map(f2).map(f3).reduce(f4, "")
      let rows = sessionsArray
                .map((session) => session.isWin ? "Win":"Loss")
                .map((elem, index) => `<tr><td>${index}.</td><td>${elem}</td></tr>`)
                .reduce((total, currentValue) => total + currentValue,"")
      // ["<tr><td>1.</td><td>Win</td></tr>", 
      //   "<tr><td>2.</td><td>Loss</td></tr>", 
      //   "<tr><td>3.</td><td>Loss</td></tr>", 
      //   "<tr><td>4.</td><td>Win</td></tr>"
     //    ]

      return `<table>
        <tr>
        <th>Session</th>
        <th>Result</th>
      </tr>
      ${rows}
      </table>
      `
    }


