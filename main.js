///////////////////
//  Global Vars  // Keep to a minimum!!
///////////////////
var userList = ["freecodecamp","medrybw", "adamkoebel","rollplay","djwheat","dexteritybonus", "test_channel", "comster404" ]; //TODO make a form to add users.

// Async function that gets the data...eventually
function getStreamData(user){
$.getJSON('https://api.twitch.tv/kraken/streams/'+user+'?callback=?').then(function(data) {
  // We need to go DEEPER
  console.log( data.stream, 'https://api.twitch.tv/kraken/streams/'+user+'?callback=?')
  // Cool channel data we could surface in a tooltip
  //$.getJSON(data._links.channel, function(channelData) {
  //});
  updateHTML(user, data); // give it function to call rather than a return cause ASYNC.
 });
}


// Callback function that updates html when the async getJSON is complete.
function updateHTML(user,userData){
  
  if(document.getElementById('userContainer').innerHTML=="Getting twitchy."){
    document.getElementById('userContainer').innerHTML="";
  }

  if (userData.stream === null){
    document.getElementById('userContainer').innerHTML += "<div class='row col-sm-8 col-centered  offline'><a class='offline' href='http://www.twitch.tv/" +user+ "'>"+ user + "</a>"  + " is offline. </div>";
  }
  if (userData.stream){  // This will float online users to the top. Cool, right?!
    console.log(userData);
    currentHTML = document.getElementById('userContainer').innerHTML;
    document.getElementById('userContainer').innerHTML = "<div class='row col-sm-8 col-centered panel text-centered online'>"+"<a class='online' href='http://www.twitch.tv/" +user+ "'>"+ user + "</a>"+ " IS ONLINE!" + "<div> <small>" + userData.stream.game+"  &nbsp<b>Viewers: </b>" + userData.stream.viewers + "&nbsp <img src='"+ userData.stream.preview.small+"'></img></small></div></div>"+currentHTML;
  }
  if (userData.stream===undefined){
    document.getElementById('userContainer').innerHTML += "<div class='row col-sm-8 col-centered  offline'><a class='offline' href='http://www.twitch.tv/" +user+ "'>"+ user + "</a>"  + " cannot even anymore. </div>";
  }
return "fell through";
}

///////////////////
// Doc Ready     //
///////////////////
// This is the main call.
// Make sure you load jQuery in your html doc FIRST!!
jQuery(document).ready(function($) {
 for (index in userList){
   getStreamData(userList[index])	   
 }
});
