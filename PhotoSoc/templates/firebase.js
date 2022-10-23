  const firebaseConfig = {
        apiKey: "AIzaSyDtqr58_Sfj_KBkUxlVtCiDHQATf73yzNw",
    authDomain: "test-c1ccd.firebaseapp.com",
    databaseURL: "https://test-c1ccd-default-rtdb.firebaseio.com",
    projectId: "test-c1ccd",
    storageBucket: "test-c1ccd.appspot.com",
    messagingSenderId: "638404195953",
    appId: "1:638404195953:web:ff87b33a0637940e9b0dd0"
    };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  console.log(1);
var input = document.querySelector("#userInput")
console.log(input);
var storage=firebase.storage();
var storageRef=storage.ref();
$('#List').find('tbody').html('');
var i=0;
storageRef.child('$input').listAll().then(function(result){
    result.items.forEach(function(imageRef){
        console.log("Image reference" + imageRef.toString());
        i++;
        displayImage(i,imageRef);
    });
});
function displayImage(row,images){
    images.getDownloadURL().then(function(url){
        console.log(url);
        let new_html='';
        new_html += '<tr>';
        new_html += '<td>';
        new_html += row;
        new_html += '</td>';
        new_html += '<td>';
        new_html += '<img src="'+url+'" width="1000px" height="700px" style="float:right">';
        new_html += '</td>';
        new_html += '</tr>';
        $('#List').find('tbody').append(new_html);
    });
}