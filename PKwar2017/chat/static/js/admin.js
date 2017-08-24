// 소켓생성(채팅룸 1)
var ws1 = new WebSocket((window.location.protocol == 'http:' ? 'ws://' : 'wss://') +  window.location.host + '/PKwar_chat/' + 1)
// 소켓생성(채팅룸 2)
var ws2 = new WebSocket((window.location.protocol == 'http:' ? 'ws://' : 'wss://') +  window.location.host + '/PKwar_chat/' + 2)




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
  var user_id=getCookie("username");
  if(banusercheck(user_id) == true){
    alert('You are banned user!');
  }
  else{
    {
      if(nickname.value != ""){
        if(element.value != ""){
          ws1.send(nickname.value + ": " + element.value);
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
  if(banusercheck(user_id) == true){
    alert('You are banned user!');
  }
  else{
    {
      if(nickname.value != ""){
        if(element.value != "") {
          ws2.send(nickname.value + ": " + element.value);
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
  var user_id=getCookie("username");
  {
    //채팅 내용을 사용자에게 추가해줌.
    var node = document.createTextNode(message.data + " #" + user_id);
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
    if(banusercheck(user_id) == true){
      var parent = document.getElementById('P_chat');
      var child = parent.getElementsByClassName(user_id);
      var child_length = child.length;
      for(var i = 0; i < child_length; i++){
        //parent.removeChild(child[0]);
        child[i].innerHTML = "deleted message";
      }
    }
  }, 10000)
};

//메시지 수신(채팅룸2)
ws2.onmessage = function(message) {
  var paragraph = document.createElement("p");
  var user_id=getCookie("username");
  {
    //채팅 내용을 사용자에게 추가해줌.
    var node = document.createTextNode(message.data + " #" + user_id);
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
    if(banusercheck(user_id) == true){
      var parent = document.getElementById('K_chat');
      var child = parent.getElementsByClassName(user_id);
      var child_length = child.length;
      for(var i = 0; i < child_length; i++){
        //parent.removeChild(child[0]);
        child[i].innerHTML = "deleted message";
      }
    }
  }, 10000)
};



//밴 유저 필터링.
function banusercheck(user_id){
  var banned_users = document.getElementById('banned_users');
  for(var i = 0; i < banned_users.childElementCount; i++){
    if(user_id == banned_users.children[i].innerHTML) return true;
  }
  return false;
}










//쿠키
function setCookie(cname) {
    var d = new Date();
    d.setTime(d.getTime() + (1*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    cvalue = Math.floor(Math.random() * 10) * 1000000 +  Math.floor(Math.random() * 10) * 100000 +  Math.floor(Math.random() * 10) * 10000 + Math.floor(Math.random() * 10) * 1000 + Math.floor(Math.random() * 10) * 100 + Math.floor(Math.random() * 10) * 10 + Math.floor(Math.random() * 10);
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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
    var user=getCookie("username");
    if (user == ""){
        setCookie("username");
    }
}






/*---------------problems------------------*/
//3. 원하는 글(딱 한 개)을 임의로 삭제하는 기능 추가.