///////////////////
//  Global Vars  //
///////////////////
var userList = ["freecodecamp","medrybw", "adamkoebel","rollplay","djwheat" ];
var userHTML = "<p>DERP</p>"



///////////////////
// Doc Ready     //
///////////////////


function getStreamData(user){
// First we need to get the link list.
var userData={};
var channelData={};
$.getJSON('https://api.twitch.tv/kraken/streams/'+user+'?callback=?', function(data) {
  // We need to go DEEPER
  userData=data;
  console.log('https://api.twitch.tv/kraken/streams/'+user+'?callback=?')
  // Cool channel data we could surface in a tooltip
  $.getJSON(data._links.channel, function(channelData) {
    console.log(channelData);
    channelData=data;
  });
 });

  if (userData.stream === null){
    userHTML=  (user + " is offline."); 
  }
  if (userData.stream !== null){  
    return (user + " IS ONLINE!" + {"game":userData.stream.game, "viewers":userData.stream.viewers, "preview": userData.stream.preview.small});
  }
  console.log({"game":userData.stream.game, "viewers":userData.stream.viewers, "preview": userData.stream.preview.small}); 
return "fell through";
}

window.onload = function(){
 for (index in userList){
   console.log(getStreamData(userList[index]));
   userHTML= userHTML + "</br>" + userList[index] + getStreamData(userList[index]);
   console.log(userHTML);
 }
 document.getElementById('userContainer').innerHTML = (userHTML);
}



// When the page is rendered, grab location.
// Make sure you load jQuery in your html doc FIRST!!
jQuery(document).ready(function($) {
});
