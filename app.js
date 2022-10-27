// Click on the Library button

var library = document.getElementById("library");
library.addEventListener("click" , showLibraryBox);
function showLibraryBox(){
    document.querySelector(".library_cont").classList.toggle("visibility");
}

// Click on the connect button
var clone_box = document.querySelector(".clone_box")
var connect = document.getElementById("connect");
connect.addEventListener("click" , showSignUpBox);
function showSignUpBox(){
        document.querySelector(".signupBox").style.visibility = "visible"
        document.getElementById("connect").classList.add("blur_clone");
        document.getElementById("library").classList.add("blur_clone");
        clone_box.classList.add("blur")
}
// Create All songs Api
let AllSongs = [
    { songFilePath : "./songs/1.mp3", coverPath : "./covers/1.jpg",songName: "Salam-e-Ishq",ArtisitName : "1" },
    {songFilePath : "./songs/2.mp3",coverPath : "./covers/2.jpg",songName: "Salame-Ishq",ArtisitName : "2" },
    {songFilePath : "./songs/3.mp3", coverPath : "./covers/3.jpg",songName: "Salame-Ishq",ArtisitName : "3"},
    { songFilePath : "./songs/4.mp3",coverPath : "./covers/4.jpg",songName: "Salame-Ishq",ArtisitName : "4"},
    {songFilePath : "./songs/5.mp3",coverPath : "./covers/5.jpg",songName: "Salame-Ishq",ArtisitName : "5" },
    {songFilePath : "./songs/6.mp3",coverPath : "./covers/6.jpg",songName: "Salame-Ishq",ArtisitName : "6"}
];

var sont_items = document.querySelectorAll(".sont_items");
var basic_info = document.querySelector(".basic_info");
function allSongItemSetOnLocation(){
    sont_items.forEach((element , i) => {
        element.getElementsByTagName("p")[0].innerHTML = AllSongs[i].songName;
        element.getElementsByTagName("span")[0].innerHTML = AllSongs[i].ArtisitName;
        element.getElementsByTagName("img")[0].src = AllSongs[i].coverPath;
    });
}
allSongItemSetOnLocation();

// Logic of Pause/Play Main Button 
var masterPlay = document.getElementById("masterPlay");
masterPlay.addEventListener("click" , Play);
var audio = 1;
var audioElement = new Audio(`songs/${audio}.mp3`);
function Play(){
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.add("fa-pause");
         masterPlay.classList.remove("fa-play");
         document.querySelector(".myGif").style.opacity = "1";
         document.querySelector(".defaultImg").classList.add("rotate");
    }else{
        audioElement.pause();
        masterPlay.classList.add("fa-play");
        masterPlay.classList.remove("fa-pause");
        document.querySelector(".myGif").style.opacity = "0";
        document.querySelector(".defaultImg").classList.remove("rotate");
    }
}
var seekBar = document.getElementById("seekbar");

audioElement.addEventListener("timeupdate" , () => {
    var myProgress = parseInt(((audioElement.currentTime / audioElement.duration) * 100));
    seekBar.value = myProgress
})
seekBar.addEventListener("change" , ()=> {
    audioElement.currentTime = ((seekBar.value * audioElement.duration)/100);
});
   
// logic imp_click
var basic_info_songname = document.querySelector(".basic_info_songname");
var basic_info_artistname = document.querySelector(".basic_info_artistname");
var imp_click = document.querySelectorAll(".imp_click");
var defaultImg = document.querySelector(".defaultImg");
Array.from(imp_click).forEach((element) => {
   element.addEventListener("click" , () => {
     defaultImg.src = element.childNodes[1].src;
     basic_info_songname.childNodes[1].innerHTML = element.childNodes[3].innerHTML
     basic_info_artistname.childNodes[1].innerHTML = element.childNodes[5].innerHTML
     masterPlay.classList.add("fa-play");
     masterPlay.classList.remove("fa-pause");
     audioElement.pause();
     document.querySelector("#seekbar").value = "0";
     var txt = document.getElementById("song_artis_name").innerHTML;
     audioElement.src = `songs/${txt}.mp3`
     audioElement.play();
     masterPlay.classList.remove("fa-play");
     masterPlay.classList.add("fa-pause");
     document.querySelector(".myGif").style.opacity = "1";
     document.querySelector(".defaultImg").classList.add("rotate");
   });
})

// Page Load Show Instructions
function pageLoad(){
    document.querySelector(".first_of_all_div").style.marginTop = "0vh"
}

// Click On The Agree Button
document.querySelector("#agree").addEventListener("click" , () => {
  document.querySelector(".first_of_all_div").style.opacity = "0"
  document.querySelector(".first_of_all_div").style.display = "none"
  document.querySelector(".clone_box").style.opacity = "1";
  document.querySelector("#library").disabled = true
  document.querySelector("#seekbar").disabled = true
  document.querySelector(".clone_box").classList.add("blur_clone");
  document.querySelector(".icons_cont").style.display = "none"
  document.querySelector("#connect").style.display = "block";
});

// Sign UP 
var signemail = document.getElementById("signemail");
var signpass = document.getElementById("signpass");
var sign = document.getElementById("sign");
sign.addEventListener("click",()=> {
   
     if(signemail.value===""){
     document.getElementById("signmailerror").innerHTML = "Email required";
      setTimeout(() => {
        document.getElementById("signmailerror").innerHTML = "";
      }, 1500);
     }
  
   
     if(signemail.value!=="" && signpass.value === ""){
        document.getElementById("signpasserror").innerHTML = "Password required";
        setTimeout(() => {
            document.getElementById("signpasserror").innerHTML = "";
        }, 1500);
     }

     if((signemail.value && signpass.value !== "")){
        alert("Sign Up Successfully , Go to Login");
         document.querySelector(".signupBox").style.display = "none";
         document.querySelector(".loginupBox").style.visibility = "visible"
     }


     localStorage.setItem("email",signemail.value);
     localStorage.setItem("password",signpass.value);
});



// LOGIN
var logemail = document.getElementById("logemail");
var logpass = document.getElementById("logpass");
var login = document.getElementById("login");
login.addEventListener("click",()=>{
    if(logemail.value && logpass.value !== ""){
        document.querySelector(".loginupBox").style.visibility = "hidden"
        document.querySelector("#library").disabled = false
        document.querySelector("#seekbar").disabled = false
        document.querySelector(".clone_box").style.filter = "blur(0px)"
        document.querySelector(".icons_cont").style.display = "block"
        document.querySelector("#connect").style.display = "none";
        document.getElementById("logout").style.visibility = "none";
        document.getElementById("connect").style.filter = "blur(0px)"
        document.getElementById("library").style.filter = "blur(0px)"
     }
     var sinml = localStorage.getItem("email");
     var sinpas = localStorage.getItem("password");
     if(sinml===logemail.value && sinpas===logpass.value){
        alert("Login successfully , Use this App");
        document.getElementById("logout").style.visibility = "visible";
        
     }else{
        alert("Email Not same, Enter the same email you entered when you signed up")
        document.querySelector(".loginupBox").style.visibility = "visible"
        document.querySelector("#library").disabled = true
        document.querySelector("#seekbar").disabled = true
        document.querySelector(".clone_box").classList.add("blur_clone");
        document.querySelector(".icons_cont").style.display = "none"
        document.querySelector("#connect").style.display = "block";
        document.querySelector("#connect").innerHTML = "Connect"
        document.getElementById("connect").style.filter = "blur(5px)"
        document.getElementById("library").style.filter = "blur(5px)"
        document.querySelector(".clone_box").style.filter = "blur(5px)"
     
     }
});
   


// LOGOUT 
function logOut(){
    alert("LOgout Successfully");
    document.getElementById("logout").style.display = "none"
    document.querySelector("#connect").style.display = "block";
    window.location.reload();
}


// change volume

var show_volume = document.getElementById("show_volume");
var recent_volume = document.querySelector("#volume");
function change_volume(){
   show_volume.innerHTML = recent_volume.value;
   parseInt(audioElement.volume = recent_volume.value/100)
}
document.querySelector(".defaultImg").src = `covers/1.jpg`;
    

// Click On The Next Button And Change The Song 
var song_atist_val = 1;
var song_artis_name = document.getElementById("song_artis_name");

song_artis_name.innerHTML = song_atist_val;
var next = document.querySelector(".next")
next.addEventListener("click",()=>{
   var curVal = song_artis_name.innerHTML++;
   if(curVal > 5){
    song_artis_name.innerHTML = 1
    curVal = 0
}
// console.log(curVal)
   document.querySelector(".defaultImg").src = `covers/${curVal + 1}.jpg`;


   audioElement.src = `songs/${curVal + 1}.mp3`;
   audioElement.play();
   audioElement.currentTime = 0;
   document.querySelector(".defaultImg").classList.add("rotate");
   masterPlay.classList.add("fa-pause");
   masterPlay.classList.remove("fa-play");

});


// Click On The Previous Button And Change The Song 
var song_artis_name = document.getElementById("song_artis_name");
document.querySelector(".previous").addEventListener("click",()=>{
   var PreVal = song_artis_name.innerHTML--;
   if(PreVal < 2){
    song_artis_name.innerHTML = 6
    PreVal = 6
   }
   console.log(PreVal);
   document.querySelector(".defaultImg").src = `covers/${PreVal - 1}.jpg`;
   audioElement.src = `songs/${PreVal - 1}.mp3`;
   audioElement.play();
   audioElement.currentTime = 0;
   document.querySelector(".defaultImg").classList.add("rotate");
   masterPlay.classList.add("fa-pause");
   masterPlay.classList.remove("fa-play");
});


