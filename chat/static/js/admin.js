// 소켓생성(채팅룸 1)
var ws1 = new WebSocket((window.location.protocol == 'http:' ? 'ws://' : 'wss://') +  window.location.host + '/PKwar_chat/' + 1)
// 소켓생성(채팅룸 2)
var ws2 = new WebSocket((window.location.protocol == 'http:' ? 'ws://' : 'wss://') +  window.location.host + '/PKwar_chat/' + 2)



setInterval(function(){
    $.ajax({url: "/chat/reload_match", success: function(result){
        $(".livematch").html(result);
    }});
}, 300000);

setInterval(function(){
    $.ajax({url: "/chat/reload_banuser", success: function(result){
        $("#banned_users").html(result);
    }});
}, 10000);

setInterval(function(){
    $.ajax({url: "/chat/reload_banword", success: function(result){
        $("#banned_words").html(result);
    }});
}, 10000);

setInterval(function(){
    $.ajax({url: "/chat/reload_freeze", success: function(result){
        $("#is_freeze").html(result);
    }});
}, 10000);










//입력창에서 엔터 키 누를 시 sendChat 실행.
function handle(e, team){
  if(e.keyCode == 13){
      if(team == 'P') sendChat1();
      else sendChat2();
  }
}




//채팅룸으로 메시지 전달.
function sendChat1() {
  var element = document.getElementById("p_input");
  var nickname = document.getElementById("p_nickname");
    if(nickname.value != ""){
      if(element.value != ""){
        ws1.send(nickname.value + ": " + element.value + "$!:@{#4'}>+*&:|");
        element.value = "";
        //본인이 입력 시 스크롤 내림.
        var el = document.getElementById('P_chat');
        el.scrollTop = el.scrollHeight;
      }
    }
    else{
      alert('닉네임을 입력하세요');
    }

};

function sendChat2() {
  var element = document.getElementById("k_input");
  var nickname = document.getElementById("k_nickname");
  if(nickname.value != ""){
    if(element.value != "") {
      ws2.send(nickname.value + ": " + element.value + "$!:@{#4'}>+*&:|");
      element.value = "";
      //본인이 입력 시 스크롤 내림.
      var el = document.getElementById('K_chat');
      el.scrollTop = el.scrollHeight;
    }
  }
  else{
    alert('닉네임을 입력하세요');
  }
};




//메시지 수신(채팅룸1)
ws1.onmessage = function(message) {
  var paragraph = document.createElement("p");
  var num = (message.data).indexOf("$!:@{#4'}>+*&:|");
  if(num >= 0){
    var anotheruser_id = (message.data).slice(num + 15, num + 15 + 7);
    {
      //채팅 내용을 사용자에게 추가해줌.
      var node = document.createTextNode((message.data).slice(0, num) + "  #" + anotheruser_id);
      paragraph.appendChild(node);
    }

    //스크롤 자동 내림.
    var el = document.getElementById('P_chat');
    if(el.scrollHeight - el.scrollTop == el.offsetHeight) {
      el.appendChild(paragraph);
      el.scrollTop = el.scrollHeight;
    }
    else{
      el.appendChild(paragraph);
    }

    //일정 시간(10초)마다 밴 유저 목록 확인. 밴되면 내용 전부 삭제.
    setInterval(function(){
      if(banusercheck(anotheruser_id) == true){
        var parent = document.getElementById('P_chat');
        var child = parent.getElementsByClassName(anotheruser_id);
        var child_length = child.length;
        for(var i = 0; i < child_length; i++){
          //parent.removeChild(child[0]);
          child[i].innerHTML = "deleted message";
        }
      }
    }, 10000)

    //일정 시간 후 자동 삭제.(현재 500초)
    setTimeout(function(){
      var parent = document.getElementById('P_chat');
      var child = document.getElementsByClassName(anotheruser_id);
      parent.removeChild(child[0]);
    }, 500000);
  }
};

//메시지 수신(채팅룸2)
ws2.onmessage = function(message) {
  var paragraph = document.createElement("p");
  var num = (message.data).indexOf("$!:@{#4'}>+*&:|");
  if(num >= 0){
    var anotheruser_id = (message.data).slice(num + 15, num + 15 + 7);{
      //채팅 내용을 사용자에게 추가해줌.
      var node = document.createTextNode((message.data).slice(0, num) + "  #" + anotheruser_id);
      paragraph.appendChild(node);
    }

    //스크를 자동 내림.
    var el = document.getElementById('K_chat');
    if(el.scrollHeight - el.scrollTop == el.offsetHeight) {
      el.appendChild(paragraph);
      el.scrollTop = el.scrollHeight;
    }
    else{
      el.appendChild(paragraph);
    }

    //일정 시간(10초)마다 밴 유저 목록 확인. 밴되면 내용 전부 삭제.
    setInterval(function(){
      if(banusercheck(anotheruser_id) == true){
        var parent = document.getElementById('K_chat');
        var child = parent.getElementsByClassName(anotheruser_id);
        var child_length = child.length;
        for(var i = 0; i < child_length; i++){
          //parent.removeChild(child[0]);
          child[i].innerHTML = "deleted message";
        }
      }
    }, 10000)

    //일정 시간 후 자동 삭제(현재 500초)
    setTimeout(function(){
      var parent = document.getElementById('K_chat');
      var child = document.getElementsByClassName(anotheruser_id);
      parent.removeChild(child[0]);
    }, 500000);
  }
};







//쿠키
function setCookie(cname) {
    var d = new Date();
    d.setTime(d.getTime() + (7*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    var cvalue = makeid();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 7; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function checkCookie() {
  var is_admin = "FALSE";
  var user=getCookie("username");
  if (user == ""){
      setCookie("username");
  }
  else{
    var admins = document.getElementById("admins");
    for(var i = 0; i < admins.childElementCount; i++){
      if(user == admins.children[i].innerHTML) is_admin = 'TRUE';
    }
  }

  if(is_admin == "FALSE") {
    alert('You are not admin!');
    window.location.replace("/chat/");
  }
}







//날짜 관리
var d = new Date();
var d_dateString = d.toDateString();
var d_timeString = d.toTimeString();

var Hour = parseInt(d_timeString.slice(0, 2)); //시
var Minute = parseInt(d_timeString.slice(3, 5)); //분
var Second = parseInt(d_timeString.slice(6, 8)); //초
var Gmt = d_timeString.slice(9, 17); //GMT

var Day = d_dateString.slice(0, 3); //요일
var Month = d_dateString.slice(4, 7); //월
var date = parseInt(d_dateString.slice(8, 10)); //일
var Year = parseInt(d_dateString.slice(11, 15)); //년




//실시간 경기 중
var sports_section = document.getElementById('finished_match');
var temp;

for(var i=0; i < sports_section.childElementCount; i++){
  temp = sports_section.children[i].children[1].children[0].children[0].children[3];

  if(Gmt === "GMT+0900"){
    if(Year === parseInt(temp.children[1].innerHTML) && Month === temp.children[2].innerHTML && date === parseInt(temp.children[3].innerHTML) && (Day === temp.children[4].innerHTML)){
      //n시
      if(Hour === parseInt(temp.children[5].innerHTML) && Minute >= parseInt(temp.children[6].innerHTML)){
        $('#' + temp.children[0].innerHTML).css('display', 'block');
      }
      //n시 이후
      else if(Hour > parseInt(temp.children[5].innerHTML)) {
        $('#' + temp.children[0].innerHTML).css('display', 'block');
      }
    }

    else if(Year === parseInt(temp.children[1].innerHTML) && Month === temp.children[2].innerHTML && date > parseInt(temp.children[3].innerHTML)){
      $('#' + temp.children[0].innerHTML).css('display', 'block');
    }
  }
}
