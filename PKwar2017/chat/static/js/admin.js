// 소켓생성(채팅룸 1)
var ws1 = new WebSocket((window.location.protocol == 'http:' ? 'ws://' : 'wss://') +  window.location.host + '/PKwar_chat/' + 1)
// 소켓생성(채팅룸 2)
var ws2 = new WebSocket((window.location.protocol == 'http:' ? 'ws://' : 'wss://') +  window.location.host + '/PKwar_chat/' + 2)


//입력창에서 엔터 키 누를 시 sendChat 실행.
function handle(e, team){
  if(e.keyCode == 13){
      if(team == 'P') sendChat1();
      else sendChat2();
  }
}



//10초마다 밴 정보 로드.
var increment = 0;
setInterval(function(){
  $.ajax({
    type: "GET",
    url: '/chat/reload_banuser/',
    data: {'increment': increment}
  })
  .done(function(response){
    var parent = document.getElementById('banned_users');
    var count = parent.childElementCount;
    for(var i = 0; i < count; i++){
      var child = parent.children[0];
      parent.removeChild(child);
    }
    $('#banned_users').append(response);
    increment += 10;
  });
}, 10000)

setInterval(function(){
  $.ajax({
    type: "GET",
    url: '/chat/reload_banword/',
    data: {'increment': increment}
  })
  .done(function(response){
    var parent = document.getElementById('banned_words');
    var count = parent.childElementCount;
    for(var i = 0; i < count; i++){
      var child = parent.children[0];
      parent.removeChild(child);
    }
    $('#banned_words').append(response);
    increment += 10;
  });
}, 10000)



//채팅룸으로 메시지 전달.
function sendChat1() {
  var element = document.getElementById("p_input");
  var nickname = document.getElementById("p_nickname");
  var user_id=getCookie("username");
  {
    {
      if(nickname.value != ""){
        if(element.value != ""){
          ws1.send(nickname.value + ": " + element.value + "$!:@{#4'}>+*&:|" + user_id);
          element.value = "";
          //본인이 입력 시 스크롤 내림.
          var el = document.getElementById('P_chat');
          el.scrollTop = el.scrollHeight;
        }
      }
      else{
        alert('닉네임을 입력하세요');
      }
    }
  }
};

function sendChat2() {
  var element = document.getElementById("k_input");
  var nickname = document.getElementById("k_nickname");
  var user_id=getCookie("username");
  {
    {
      if(nickname.value != ""){
        if(element.value != "") {
          ws2.send(nickname.value + ": " + element.value + "$!:@{#4'}>+*&:|" + user_id);
          element.value = "";
          //본인이 입력 시 스크롤 내림.
          var el = document.getElementById('K_chat');
          el.scrollTop = el.scrollHeight;
        }
      }
      else{
        alert('닉네임을 입력하세요');
      }
    }
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
      //user_id를 추출해냄.
      paragraph.className += (anotheruser_id);
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

  }
};

//메시지 수신(채팅룸2)
ws2.onmessage = function(message) {
  var paragraph = document.createElement("p");
  var num = (message.data).indexOf("$!:@{#4'}>+*&:|");
  if(num >= 0){
    var anotheruser_id = (message.data).slice(num + 15, num + 15 + 7);
    {
      //채팅 내용을 사용자에게 추가해줌.
      var node = document.createTextNode((message.data).slice(0, num) + "  #" + anotheruser_id);
      paragraph.appendChild(node);
      //user_id를 추출해냄.
      paragraph.className += (anotheruser_id);
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
  }
};








//쿠키
function setCookie(cname) {
    var d = new Date();
    d.setTime(d.getTime() + (5*24*60*60*1000));
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






/*---------------problems------------------*/
//3. 원하는 글(딱 한 개)을 임의로 삭제하는 기능 추가.
