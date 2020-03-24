var socket;
if (!window.WebSocket) {
	window.WebSocket = window.MozWebSocket;
}

if (window.WebSocket) {
//	socket = new WebSocket("ws://localhost:7070/ws");
	socket = new WebSocket("ws://120.27.155.99:7070/ws");
	socket.onmessage = function(event) {
//		alert(event.data);
		var ret = jQuery.parseJSON(event.data);
		return_cmd(ret);
	};
	// 登录验证
	socket.onopen = function(event) {
		$.get(host + "/player", {action:"checkLogin"}, function(data) {
			// console.log(data);
			// console.log("data.ret = " + data.ret);
			// 登录成功
			if (data.ret == "1"){
				// alert("成功");
				var id = data.id;
				var psd = data.psd;
				gid = data.gid;
				// console.log("id = " + id);
				//console.log("psd = " + psd);
				//console.log("gid = " + gid);
				// var login = "{\"login\":{\"id\":\"" + id + "\", \"psd\":\"" + psd + "\"}}";
				// console.log(login);
				sdmg("{\"cmd\":\"login\",\"para\":{\"id\":\""+id+"\", \"psd\":\""+psd+"\", \"gid\":\""+gid+"\"}}");
			}
			// 未登录
			else {
				alert("错误");
				window.location.href = '/login.html';
			}
			// 注意写："json"
		}, "json")
	};
	socket.onerror = function(event) {
		alert("服务器连接失败！");
	};
	socket.onclose = function(event) {
	};
} else {
	alert("360浏览器请使用极速模式！");
}

function sdmg(message) {
	if (!window.WebSocket) {
		return;
	}
	if (socket.readyState == WebSocket.OPEN) {
		socket.send(message);
	} else {
		alert("服务器连接失败！");
	}
}



