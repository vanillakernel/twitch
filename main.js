///////////////////
//  Global Vars  //
///////////////////
var userList = ["freecodecamp","medrybw", "adamkoebel","rollplay","djwheat" ];

///////////////////
// Doc Ready     //
///////////////////


function getStreamData(user){
// First we need to get the link list.
$.getJSON('https://api.twitch.tv/kraken/streams/'+user+'?callback=?').then(function(data) {
  // We need to go DEEPER
  console.log( data.stream, 'https://api.twitch.tv/kraken/streams/'+user+'?callback=?')
  // Cool channel data we could surface in a tooltip
  $.getJSON(data._links.channel, function(channelData) {
    //console.log(channelData);
  });
  updateHTML(user, data);
 });
}

function updateHTML(user,userData){
  

  if(document.getElementById('userContainer').innerHTML=="Getting twitchy."){
    document.getElementById('userContainer').innerHTML="";
  }

  if (!userData.stream){
//    var currentHTML = document.getElementById('userContainer').innerHTML;
    document.getElementById('userContainer').innerHTML += "<div class='row col-centered col-md-6 label-default'>" +user + " is offline. </div>"
  }
  if (userData.stream){  
    console.log(userData);
    currentHTML = document.getElementById('userContainer').innerHTML;
    document.getElementById('userContainer').innerHTML = "<div class='row col-sm-8 col-centered panel text-centered'>" +user + " IS ONLINE!" + "<div> <small>" + userData.stream.game+"  &nbsp<b>Viewers: </b>" + userData.stream.viewers + "&nbsp <img src='"+ userData.stream.preview.small+"'></img></small></div></div>"+currentHTML;
  }
return "fell through";
}


// When the page is rendered, grab location.
// Make sure you load jQuery in your html doc FIRST!!
jQuery(document).ready(function($) {
 for (index in userList){
//   console.log(getStreamData(userList[index]));
   getStreamData(userList[index])	   
 }
});
