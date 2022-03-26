var addTeams = document.getElementsByClassName("add-teams")[0];
var currentScore = document.getElementsByClassName("current-score")[0];

function newGame() {
  localStorage.setItem("showAddTeams", true);
  addTeams.style.display = "block";
}

function closeAddTeams() {
  if(confirm("The changes won't be saved, are you sure you want to proceed?")) {
  localStorage.setItem("showAddTeams", false);
  addTeams.style.display = "none";
  }
}

function openCurrentScore() {
  document.getElementById('score').value = "neki";
  localStorage.setItem("showAddTeams", false);
  addTeams.style.display = "none";

  const team1 = {
    name: document.getElementById('team1').value,
    goals: 0,
    shots: 0,
    corners: 0,
  }

  const team2 = {
    name: document.getElementById('team2').value,
    goals: 0,
    shots: 0,
    corners: 0,
  }

  localStorage.setItem("team1", JSON.stringify(team1));
  localStorage.setItem("team2", JSON.stringify(team2));

  localStorage.setItem("showCurrentScore", true);
  currentScore.style.display = "block";
}

function closeCurrentScore() {
  if(confirm("The changes won't be saved, are you sure you want to proceed?")) {
    localStorage.setItem("showCurrentScore", false);
    currentScore.style.display = "none";
  }
}

function finishGame() {
  const match = {
    id: null,
    homeTeam: team1,
    awayTeam: team2,
  }
  if(localStorage.getItem("matches")) {
    const matches = JSON.parse(localStorage.getItem("matches"));
    match.id = matches[matches.length-1].id + 1;
    matches.push(match);
    localStorage.setItem("matches", JSON.stringify(matches));
  } else {
    match.id = 1;
    const matches = [match];
    localStorage.setItem("matches", JSON.stringify(matches));
  }
  console.log(JSON.parse(localStorage.getItem('matches')));
  localStorage.setItem("showCurrentScore", false);
  currentScore.style.display = "none";

  // Add to matches history
  var matchContainer = document.createElement("div");
  matchContainer.className = "match-container";
  var match1 = document.createElement("div");
  match1.className = "match";

  var team = document.createElement("p");
  team.innerHTML = team1.name;
  var teamGoals = document.createElement("p");
  teamGoals.innerHTML = team1.goals;
  match1.appendChild(team);
  match1.appendChild(teamGoals);

  var match2 = document.createElement("div");
  match2.className = "match";

  var team = document.createElement("p");
  team.innerHTML = team2.name;
  var teamGoals = document.createElement("p");
  teamGoals.innerHTML = team2.goals;
  match2.appendChild(team);
  match2.appendChild(teamGoals);
  
  var input = document.createElement("input");
  input.setAttribute("type", "hidden");
  input.setAttribute("name", "matchData");
  input.setAttribute("value", JSON.stringify(match));

  matchContainer.setAttribute("id", "match-container-" + match.id);
  matchContainer.appendChild(match1);
  matchContainer.appendChild(match2);
  matchContainer.appendChild(input);
  document.getElementById('history').appendChild(matchContainer);
}

function goalModalSubmit() {
  if(document.getElementById('teamGoals').value == "1") {
    const tempTeam = JSON.parse(localStorage.getItem("team1"))
    tempTeam.goals = tempTeam.goals + 1;
    localStorage.setItem("team1", JSON.stringify(tempTeam));

  } else {
    const tempTeam = JSON.parse(localStorage.getItem("team2"))
    tempTeam.goals = tempTeam.goals + 1;
    localStorage.setItem("team2", JSON.stringify(tempTeam));
  }
}

function shotModalSubmit() {
  if(document.getElementById('teamShots').value == "1") {
    const tempTeam = JSON.parse(localStorage.getItem("team1"))
    tempTeam.shots = tempTeam.shots + 1;
    localStorage.setItem("team1", JSON.stringify(tempTeam));

  } else {
    const tempTeam = JSON.parse(localStorage.getItem("team2"))
    tempTeam.shots = tempTeam.shots + 1;
    localStorage.setItem("team2", JSON.stringify(tempTeam));
  }
}

function cornerModalSubmit() {
  if(document.getElementById('teamCorners').value == "1") {
    const tempTeam = JSON.parse(localStorage.getItem("team1"))
    tempTeam.corners = tempTeam.corners + 1;
    localStorage.setItem("team1", JSON.stringify(tempTeam));

  } else {
    const tempTeam = JSON.parse(localStorage.getItem("team2"))
    tempTeam.corners = tempTeam.corners + 1;
    localStorage.setItem("team2", JSON.stringify(tempTeam));
  }
}

function editModalSubmit() {
    const tempTeam1 = {
      name: document.getElementById('edit-team1').innerHTML,
      goals: document.getElementById('team1-goals').value,
      shots: document.getElementById('team1-shots').value,
      corners: document.getElementById('team1-corners').value,
    }
    localStorage.setItem("team1", JSON.stringify(tempTeam1));

    const tempTeam2 = {
      name: document.getElementById('edit-team2').innerHTML,
      goals: document.getElementById('team2-goals').value,
      shots: document.getElementById('team2-shots').value,
      corners: document.getElementById('team2-corners').value,
    }
    localStorage.setItem("team2", JSON.stringify(tempTeam2));
}

if(localStorage.getItem("team1") && localStorage.getItem("team2")) {
  var team1 = JSON.parse(localStorage.getItem("team1"));
  var team2 = JSON.parse(localStorage.getItem("team2"));
  
  document.getElementById('score').innerHTML = team1.name + " " + team1.goals + " : " + team2.goals + " " + team2.name;

  document.getElementById('goalTeam1').innerHTML = team1.name;
  document.getElementById('goalTeam2').innerHTML = team2.name;
  document.getElementById('shotTeam1').innerHTML = team1.name;
  document.getElementById('shotTeam2').innerHTML = team2.name;
  document.getElementById('cornerTeam1').innerHTML = team1.name;
  document.getElementById('cornerTeam2').innerHTML = team2.name;

  // Edit modal
  document.getElementById('edit-team1').innerHTML = team1.name;
  document.getElementById('team1-goals').value = team1.goals;
  document.getElementById('team1-shots').value = team1.shots;
  document.getElementById('team1-corners').value = team1.corners;
  document.getElementById('edit-team2').innerHTML = team2.name;
  document.getElementById('team2-goals').value = team2.goals;
  document.getElementById('team2-shots').value = team2.shots;
  document.getElementById('team2-corners').value = team2.corners;
}

// Modals
var goalModal = document.getElementById("goalModal");
var shotModal = document.getElementById("shotModal");
var cornerModal = document.getElementById("cornerModal");
var editModal = document.getElementById("editModal");
var editMatchModal = document.getElementById("editMatchModal");

var spanGoal = document.getElementsByClassName("close-goal")[0];
var spanShot = document.getElementsByClassName("close-shot")[0];
var spanCorner = document.getElementsByClassName("close-corner")[0];
var spanEdit = document.getElementsByClassName("close-edit")[0];
var spanEditMatch = document.getElementsByClassName("close-edit-match")[0];

function showGoalModal() {
    goalModal.style.display = "block";
}

function showShotModal() {
    shotModal.style.display = "block";
}

function showCornerModal() {
    cornerModal.style.display = "block";
}

function showEditModal() {
  editModal.style.display = "block";
}

spanGoal.onclick = function() {
    goalModal.style.display = "none";
}

spanShot.onclick = function() {
    shotModal.style.display = "none";
}

spanCorner.onclick = function() {
    cornerModal.style.display = "none";
}

spanEdit.onclick = function() {
  editModal.style.display = "none";
}

spanEditMatch.onclick = function() {
  editMatchModal.style.display = "none";
}

window.onclick = function(event) {
  if(event.target == goalModal) {
    goalModal.style.display = "none";
  } 
  else if(event.target == shotModal) {
    shotModal.style.display = "none";
  }
  else if(event.target == cornerModal) {
    cornerModal.style.display = "none";
  }
  else if(event.target == editModal) {
    editModal.style.display = "none";
  }
  else if(event.target == editMatchModal) {
    editMatchModal.style.display = "none";
  }
}

// Matches
function loadMatches() {
  if(localStorage.getItem("matches")) {
    JSON.parse(localStorage.getItem("matches")).forEach(element => {
      var matchContainer = document.createElement("div");
      matchContainer.className = "match-container tooltip";
      var match1 = document.createElement("div");
      match1.className = "match";
  
      var team1 = document.createElement("p");
      team1.innerHTML = element.homeTeam.name;
      var team1Goals = document.createElement("p");
      team1Goals.innerHTML = element.homeTeam.goals;
      match1.appendChild(team1);
      match1.appendChild(team1Goals);
  
      var match2 = document.createElement("div");
      match2.className = "match";
  
      var team2 = document.createElement("p");
      team2.innerHTML = element.awayTeam.name;
      var team2Goals = document.createElement("p");
      team2Goals.innerHTML = element.awayTeam.goals;
      match2.appendChild(team2);
      match2.appendChild(team2Goals);

      var input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", "matchData");
      input.setAttribute("value", JSON.stringify(element));

      // Tooltip
      var tooltip = document.createElement('span');
      tooltip.className = "tooltiptext";
      tooltip.innerHTML = "Click for statistics, double click to edit, drag & drop to delete";

      matchContainer.setAttribute("id", "match-container-" + element.id);
      matchContainer.appendChild(match1);
      matchContainer.appendChild(match2);
      matchContainer.appendChild(input);
      matchContainer.appendChild(tooltip);
      document.getElementById('history').appendChild(matchContainer);
  
  });
  }
}

$(document).on("click", "#history .match-container", function() {
      const match = JSON.parse($(this).find("input").val());
      console.log(match);

      // Changes the background of the active match
      JSON.parse(localStorage.getItem("matches")).forEach(element => {
          if(element.id == match.id) {
            document.getElementById('match-container-' + match.id).style.backgroundColor = "#E8E8E8";
          } else {
            document.getElementById('match-container-' + element.id).style.backgroundColor = "white";
          }
    });

      document.getElementById('stats').style.display = "block";
      document.getElementById('home-text').innerHTML = match.homeTeam.name + " - " + match.homeTeam.shots; 
      document.getElementById('away-text').innerHTML = match.awayTeam.name + " - " + match.awayTeam.shots; 

      // Displays correct ratio on horizontal bar chart
      if(parseInt(match.homeTeam.shots) == 0 && parseInt(match.awayTeam.shots) == 0) {
        document.getElementById('home').style.width = "50%";
        document.getElementById('away').style.width = "50%";
      } else {
        homeShotsPercentage = (parseInt(match.homeTeam.shots) / (parseInt(match.homeTeam.shots) + parseInt(match.awayTeam.shots))) * 100;
        awayShotsPercentage = 100 - homeShotsPercentage;
        homeShotsPercentage = homeShotsPercentage + '%';
        awayShotsPercentage = awayShotsPercentage + '%';
        document.getElementById('home').style.width = homeShotsPercentage;
        document.getElementById('away').style.width = awayShotsPercentage;
      }

      // Displays correct ratio on pie chart
      document.getElementById('home-corners').innerHTML = match.homeTeam.name + " " + match.homeTeam.corners;
      document.getElementById('away-corners').innerHTML = match.awayTeam.corners + " " + match.awayTeam.name;

      document.getElementById('home-legend').innerHTML = match.homeTeam.name;
      document.getElementById('away-legend').innerHTML = match.awayTeam.name;
      if(parseInt(match.homeTeam.corners) == 0 && parseInt(match.awayTeam.corners) == 0) {
        document.getElementById('pie-chart').style.background = "conic-gradient(#000080 0% 50%, #45a049 50%)";
      } else {
        homeCornerPercentage = (parseInt(match.homeTeam.corners) / (parseInt(match.homeTeam.corners) + parseInt(match.awayTeam.corners))) * 100;
        awayCornerPercentage = 100 - homeCornerPercentage;
        if(homeCornerPercentage == 0) {
          document.getElementById('pie-chart').style.background = "conic-gradient(#000080 0% 100%)";
        }
        else if(awayCornerPercentage == 0) {
          document.getElementById('pie-chart').style.background = "conic-gradient(#45a049 0% 100%)";
        } else {
          document.getElementById('pie-chart').style.background = "conic-gradient(#000080 0% " + awayCornerPercentage + "%, #45a049 " + awayCornerPercentage + "%)";

        }
      }
})

$(document).on("dblclick", "#history .match-container", function() {
  editMatchModal.style.display = "block";
  const match = JSON.parse($(this).find("input").val());

  document.getElementById('match-edit-team1').innerHTML = match.homeTeam.name;
  document.getElementById('match-team1-goals').value = match.homeTeam.goals;
  document.getElementById('match-team1-shots').value = match.homeTeam.shots;
  document.getElementById('match-team1-corners').value = match.homeTeam.corners;
  document.getElementById('match-edit-team2').innerHTML = match.awayTeam.name;
  document.getElementById('match-team2-goals').value = match.awayTeam.goals;
  document.getElementById('match-team2-shots').value = match.awayTeam.shots;
  document.getElementById('match-team2-corners').value = match.awayTeam.corners;
  document.getElementById('match-id').value = match.id;
})

$(document).on("submit", "#editMatch", function(e) {
  e.preventDefault();
  matchId = $(this).find('input:hidden').val();

  const matches = [];
  const match = {
    id: matchId,
    homeTeam: null,
    awayTeam: null,
  }

  JSON.parse(localStorage.getItem("matches")).forEach(element => {
    if(element.id == matchId) {
      match.homeTeam = {
        name: document.getElementById('match-edit-team1').innerHTML,
        goals: document.getElementById('match-team1-goals').value,
        shots: document.getElementById('match-team1-shots').value,
        corners: document.getElementById('match-team1-corners').value,
      }
      match.awayTeam = {
        name: document.getElementById('match-edit-team2').innerHTML,
        goals: document.getElementById('match-team2-goals').value,
        shots: document.getElementById('match-team2-shots').value,
        corners: document.getElementById('match-team2-corners').value,
      }
      matches.push(match);
    } else {
      matches.push(element);
    }
    console.log(matches);
    localStorage.setItem("matches", JSON.stringify(matches));
    location.reload();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // This function is run after the page contents have been loaded
  // Put your initialization code here 
  if(JSON.parse(localStorage.getItem("showAddTeams")) === true){
    addTeams.style.display = "block";
  } else {
    addTeams.style.display = "none";
  }
  
  if(JSON.parse(localStorage.getItem("showCurrentScore")) === true){
    currentScore.style.display = "block";
  } else {
    currentScore.style.display = "none";
  }

  loadMatches();
})

