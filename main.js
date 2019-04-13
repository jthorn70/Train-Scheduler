$(document).ready(function() {

  var config = {
    apiKey: "AIzaSyAwSgURCh2ydICtREbtMs7W6GXoEcqxsWU",
    authDomain: "train-scheduler-6ec12.firebaseapp.com",
    databaseURL: "https://train-scheduler-6ec12.firebaseio.com",
    projectId: "train-scheduler-6ec12",
    storageBucket: "train-scheduler-6ec12.appspot.com",
    messagingSenderId: "550053822616"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();

 

   
  $("#submit").on("click", function(event) {
  		event.preventDefault();

	  var name = $("#train-name-input").val().trim();
	  var destination = $("#dest-input").val().trim();
	  var firstTrain = $("#firstTrain-input").val().trim();
	  var frequency = $("#freq-input").val().trim();

	  var newTrain = {
	  	name: name,
	  	destination: destination,
	  	start: firstTrain,
	  	frequency: frequency
	  };

          database.ref().push(newTrain);

 



	  $("#train-name-input").val("");
	  $("#dest-input").val("");
	  $("#firstTrain-input").val("");
	  $("#freq-input").val("");
  	});

	database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	  console.log(childSnapshot.val());

	  var name = childSnapshot.val().name;
	  var destination = childSnapshot.val().destination;
	  var firstTrain = childSnapshot.val().start;
	  var frequency = childSnapshot.val().frequency;


  		var frequency;

   		 var firstTime = 0;

	   var firstTime = moment(firstTime, "HH:mm").subtract(1, "years");

	    var currentTime = moment();

		var diffTime = moment().diff(moment(firstTime), "minutes");

	    var tRemainder = diffTime % frequency;

	    var tMinutesTillTrain = frequency - tRemainder;

	    var nextTrain = moment().add(tMinutesTillTrain, "minutes");


	  $("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency  + " minutes" +
	   "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
	});

});