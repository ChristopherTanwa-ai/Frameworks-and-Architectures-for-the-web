function store(){
    let inputFname = document.getElementById("fname");
    let inputLname = document.getElementById("lname");
    localStorage.setItem("fname",inputFname.value);
    localStorage.setItem("lname",inputLname.value);

}

function Lcounter(){
    var n = localStorage.getItem('loseCount');
    if (n === null){
         n = 1;
        } 
    else  { n++; }

localStorage.setItem("loseCount", n);
}

function Wcounter(){
        var n = localStorage.getItem('winCount');
        if (n === null){
             n = 1;
            } 
        else  { n++; }
    
    localStorage.setItem("winCount", n);
}

function display(){
    document.getElementById("attempts").innerHTML = "You had: " + localStorage.getItem("counter") + " attempts"
    document.getElementById("wins").innerHTML = "You had: " + localStorage.getItem("loseCount") + " losses"
    document.getElementById("losses").innerHTML = "You had: " + localStorage.getItem("winCount") + " wins"
}

function reset(){
    localStorage.setItem("counter",0);
    localStorage.setItem("loseCount",0);
    localStorage.setItem("winCount",0);


}