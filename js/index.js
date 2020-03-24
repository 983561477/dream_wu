function return_cmd(data) {
	console.log(JSON.stringify(data));
	// warning开始
	if(data.warning != null){
		warning = data.warning;
		// 错误返回
		if(warning.code != null){
			console.log(warning.code);
			console.log(warning.desc);
			alert("错误代码："+ warning.code +"\n错误描述："+warning.desc+"");
			window.location.href = 'login.html';
			return;
		}
		return;
	}
	// warning结束

	// 登陆成功
	if(data.login_successful != null) {
		// console.log("data.login_successful = " + JSON.stringify(data.login_successful));
		token = data.login_successful.token;
		// 当前用户的名字
		ident = data.login_successful.ident;
		// 传送玩家的状态
		player_state = 0;
		// 加载home.html
		$("#home").load("home.html");
		return;
	}

	// 刷新界面后战斗信息
	if(data.combat_info != null){
		var combat_info = data.combat_info;
		// 战斗状态
		is_combat = combat_info.is_combat;
		// 如果处于战斗状态
		if(is_combat == true){
			// 传送玩家的状态
			player_state = 1;
			// 加载主页面后判断
			$("#home").load("home.html");
			//return;
		}
		return;
	}


	// 信息提示开始
	if(data.talk != null) {
	    // console.log(data.talk);
		$(".txt02").append(data.talk);
		// 更新信息
		$(".txt02").scrollTop($(".txt02").get(0).scrollHeight);
		return;
	}
	// 信息示结束

	// 路径开始
	if(data.path != null) {
		// 场景路径方向
		var path = data.path;
		// 场景的名字和描述
		var local = data.local;
		// console.log("path = " + JSON.stringify(path));
		// console.log("local = " + JSON.stringify(local));
		// console.log("local.name = " + local.name);
		// console.log("local.introduce = " + local.introduce);
		// 当前位置的名称
		$("#title").html(local.name);
		$("#local").html(local.name);
		// 当前位置的介绍信息
		$("#introduce").html(local.introduce);
		// 全部不显示
		$(".but01").addClass("filter");
		// 清除点击的方向
		$(".but01").removeAttr("onclick");
		// 当前位置显示
		$("#local").removeClass("filter");
		// 遍历八个方向的名称
		$.each(path, function(item) {
			// console.log(item);
			// console.log(path[item]);
			// 遍历显示方向
			$("#"+item).removeClass("filter");
			$("#"+item).html(path[item]);
			$("#"+item).attr("onclick", "go('"+item+"')");
		});
		return;
	}
	// 路径结束

	// 场景物资
	if(data.res_info != null){
		// 当前场景的物资
		var res = data.res_info;
		// 清除旧数据
		$(".box02").html("");
		// 遍历新数据
		$.each(res, function(item){
			// console.log(item);
			// console.log("res[item].ident = " + res[item].ident);
			// console.log("res[item].name = " + res[item].name);
			// 不显示自己的名字
			if(res[item].ident != ident && res[item].name != "") {
				// console.log(equipment);
				// 设备为电脑
				if(equipment == 0){
					$(".box02").append("<div class='rw' style='margin-left:0.14rem;'><a href='javascript:void(0)' class='rw_xm2' onclick='call_res(\""+res[item].ident+"\")'>" + res[item].name + "</a></div>");
				}
				// 设备为手机
				if(equipment == 1){
					$(".box02").append("<div class='rw'><a href='javascript:void(0)' class='rw_xm2' onclick='call_res(\""+res[item].ident+"\")'>" + res[item].name + "</a></div>");
				}
			}
			// 获取本玩家是否为巫师
			if(res[item].ident == ident)
			{
				// 获取当前玩家的名称
				name = res[item].name;
				// console.log(name);
				// 获得是否为巫师
				var attr = res[item].attr;
				var jst = JSON.stringify(attr);
				// 是否是巫师
				try{
					var s = '{"desc":"(.*?)","k":"isWiz","v":"(.*?)"}';
					isWiz = jst.match(s)[2];
				}
				catch(exception){
				    var s = '{"desc":"(.*?)","k":"isWiz","parameter":"(.*?)","v":"(.*?)"}';
					isWiz = jst.match(s)[3];
				}
				//console.log(isWiz);
			}
		});
		return;
	}


// 人物界面开始
    if(data.player_info != null){
    	// 人物基本介绍
    	var fiure = data.player_info;
    	// 人物属性
    	var property = fiure.attr;
    	var jst = JSON.stringify(property);
    	// 游戏内交易货币
		try{
			var s = '{"desc":"(.*?)","k":"Money","v":"(.*?)"}';
			player_game_money = jst.match(s)[2];
		}
		catch(exception){
		    var s = '{"desc":"(.*?)","k":"Money","parameter":"(.*?)","v":"(.*?)"}';
			player_game_money = jst.match(s)[3];
		}

		
		// 左
		// 赋值年龄
    	try{
			var s = '{"desc":"(.*?)","k":"age","v":"(.*?)"}';
			var age = jst.match(s)[2];
		}
		catch(exception){
		    var age = "空";
		} 
		// 性别
		try{
			var s = '{"desc":"(.*?)","k":"gender","v":"(.*?)"}';
			var gender = jst.match(s)[2];
		}
		catch(exception){
		    var gender = "空";
		} 
		// 性格
		try{
			var s = '{"desc":"(.*?)","k":"character","v":"(.*?)"}';
			var character = jst.match(s)[2];
		}
		catch(exception){
		    var character = "空";
		}
		// 当前血量
		try{
    		var s = '{"desc":"(.*?)","k":"now_hp","v":"(.*?)"}';
			var now_hp = jst.match(s)[2];
		}
		catch(exception){
		    var now_hp = "空";
		} 
		// 最大血量
		try{
    		var s = '{"desc":"(.*?)","k":"max_hp","v":"(.*?)"}';
			var max_hp = jst.match(s)[2];
		}
		catch(exception){
		    var max_hp = "空";
		} 
		// 当前内力
		try{
    		var s = '{"desc":"(.*?)","k":"now_mp","v":"(.*?)"}';
			var now_mp = jst.match(s)[2];
		}
		catch(exception){
		    var now_mp = "空";
		} 
		// 最大内力
		try{
    		var s = '{"desc":"(.*?)","k":"max_mp","v":"(.*?)"}';
			var max_mp = jst.match(s)[2];
		}
		catch(exception){
		    var max_mp = "空";
		} 	

		// 右
		// 等级
		try{
	    	var s = '{"desc":"(.*?)","k":"level","v":"(.*?)"}';
			var level = jst.match(s)[2];
		}
		catch(exception){
		    var level = "空";
		} 
		// 当前经验值
		try{
			var s = '{"desc":"(.*?)","k":"now_exp","v":"(.*?)"}';
			var now_exp = jst.match(s)[2];
		}
		catch(exception){
		    var now_exp = "空";
		} 
		// 下一级所需经验值
		try{
	    	var s = '{"desc":"(.*?)","k":"next_exp","v":"(.*?)"}';
			var next_exp = jst.match(s)[2];
		}
		catch(exception){
		    var next_exp = "空";
		} 
		
		// 臂力
		try{
  	  		var s = '{"desc":"(.*?)","k":"bi_li","v":"(.*?)"}';
			var bi_li = jst.match(s)[2];
		}
		catch(exception){
		    var bi_li = "空";
		} 
		// 气劲
		try{
    		var s = '{"desc":"(.*?)","k":"qi_jin","v":"(.*?)"}';
			var qi_jin = jst.match(s)[2];
		}
		catch(exception){
		    var qi_jin = "空";
		} 
		// 根骨
		try{
    		var s = '{"desc":"(.*?)","k":"gen_gu","v":"(.*?)"}';
			var gen_gu = jst.match(s)[2];
		}
		catch(exception){
		    var gen_gu = "空";
		}
		// 定力
		try{
   		 	var s = '{"desc":"(.*?)","k":"ding_li","v":"(.*?)"}';
			var ding_li = jst.match(s)[2];
		}
		catch(exception){
		    var ding_li = "空";
		}
		// 身法
		try{
   		 	var s = '{"desc":"(.*?)","k":"shen_fa","v":"(.*?)"}';
			var shen_fa = jst.match(s)[2];
		}
		catch(exception){
		    var shen_fa = "空";
		}
		// 潜能
		try{
    		var s = '{"desc":"(.*?)","k":"potency","v":"(.*?)"}';
			var potency = jst.match(s)[2];
		}
		catch(exception){
		    var potency = "空";
		}

    	// 基本信息
    	// 赋值姓名 nick
    	$(".nick").html(fiure.name);

    	// 属性	
    	// 左
    	// 赋值年龄 age 
    	$(".age").html("<span class='sp02'>年龄</span>" + age);
    	// 赋值性别 gender
		$(".gender").html("<span class='sp02'>性别</span>" + gender);
		// 赋值性格 character
		$(".character").html("<span class='sp02'>性格</span>" + character);
		// 赋值血量 now_hp max_hp 
    	$(".hp").html("<span class='sp02'>血量</span>" + now_hp + "/" + max_hp);
    	// 赋值内力 now_hp max_hp 
    	$(".mp").html("<span class='sp02'>内力</span>" + now_mp + "/" + max_mp);

    	// 右
    	// 赋值等级 level
    	$(".level").html("<span class='sp02'>等级</span>" + level + "<a href='javascript:void(0)' onclick='uplevel()' class='but08 filter'>升级</a>");
    	// 赋值经验 experience
    	$(".experience").html("<span class='sp02'>经验值</span>" + now_exp + "(" + Math.round(now_exp/next_exp*100) + "%)");
    	// 赋值臂力 bi_li 
    	$(".bi_li").html("<span class='sp02'>力量</span>" + bi_li + "<a href='javascript:void(0)' onclick='upattr(7)' class='but08 filter'>提升</a>");
    	// 赋值气劲 qi_jin
    	$(".qi_jin").html("<span class='sp02'>体力</span>" + qi_jin + "<a href='javascript:void(0)' onclick='upattr(8)' class='but08 filter'>提升</a>");
    	// 赋值根骨 gen_gu 
    	$(".gen_gu").html("<span class='sp02'>智力</span>" + gen_gu + "<a href='javascript:void(0)' onclick='upattr(9)' class='but08 filter'>提升</a>");
    	// 赋值定力 ding_li 
    	$(".ding_li").html("<span class='sp02'>敏捷</span>" + ding_li + "<a href='javascript:void(0)' onclick='upattr(11)' class='but08 filter'>提升</a>");
    	// 赋值身法 shen_fa 
    	$(".shen_fa").html("<span class='sp02'>敏捷</span>" + shen_fa + "<a href='javascript:void(0)' onclick='upattr(11)' class='but08 filter'>提升</a>");
    	// 赋值潜能 potency 
    	$(".potency").html("<span class='sp02'>潜能</span>" + potency);
    	// 判断潜能大于0
    	if(potency > 0) {
    		$(".box03_r .but08").removeClass("filter");
    	}
    	// 判断当前经验值是否大于下一级经验值
    	if(now_exp >= next_exp) {
    		$(".box03_l .but08").removeClass("filter");
    	}
    	// 打坐
	    if (fiure.dazuo != null) {
	    	// 不在打坐
	    	if(fiure.dazuo == 0) {
	    		$(".dazuo").html("开始打坐");
	    	}
	    	else {
	    		$(".dazuo").html("停止打坐");
	    	}
	    }
    	return;
    }


    // 打坐收益
    if (data.dazuo_result != null){
    	var dazuo_result = data.dazuo_result;
    	// 赋值经验值 experience
    	$(".experience").html("<span class='sp02'>经验值</span>" + dazuo_result.experience + "(" + Math.round(dazuo_result.experience/dazuo_result.next_exp*100) + "%)");
    	// 判断当前经验值是否大于下一级经验值
    	if(dazuo_result.experience >= dazuo_result.next_exp) {
    		$(".box03_l .but08").removeClass("filter");
    	}
    	// 赋值气血 present_blood max_blood
    	$(".blood").html("<span class='sp02'>气血</span>" + dazuo_result.present_blood + "/" + dazuo_result.max_blood);
    	// 赋值内力 present_force max_force
    	$(".force").html("<span class='sp02'>内力</span>" + dazuo_result.present_force + "/" + dazuo_result.max_force);
    	return;
    }

	// 查看场景物资信息
	if(data.view_res != null){
		//
		var res = data.view_res;
		// 被查询物资ident
		other_ident = res.ident;
		// 被查询物资name
		other_name = res.name;
		var property = res.attr;
		// 按钮类别
		res_pid = res.pid;
		console.log(res_pid);
		//物资为玩家
		if(res_pid == 1001)
		{
			$(".tkbox2").load("page/player-info-display.html", function(){
				// 赋值玩家名字
				$(".rw_xm").html(res.name);
				// 赋值玩家描述
				//$(".zb_txt3").html("<p>"+ res.introduce +"</p>");
				// 赋值物资属
				var jst = JSON.stringify(property);
				// 是否是巫师
				// try{
				// 	var s = '{"desc":"是否是巫师","k":"isWiz","v":"(.*?)"}';
				// 	var is_wiz = jst.match(s)[1];
				// }
				// catch(exception){
				//     var s = '{"desc":"是否是巫师","k":"isWiz","parameter":"(.*?)","v":"(.*?)"}';
				// 	var is_wiz = jst.match(s)[2];
				// }
				// // 游戏内交易货币
				// try{
				// 	var s = '{"desc":"游戏内交易货币","k":"Money","v":"(.*?)"}';
				// 	var game_money = jst.match(s)[1];
				// }
				// catch(exception){
				//     var s = '{"desc":"游戏内交易货币","k":"Money","parameter":"(.*?)","v":"(.*?)"}';
				// 	var game_money = jst.match(s)[2];
				// }
				// // 离线场景
				// try{
				// 	var s = '{"desc":"离线场景","k":"Offline_Scene","v":"(.*?)"}';
				// 	var offline_scene = jst.match(s)[1];
				// }
				// catch(exception){
				//     var s = '{"desc":"离线场景","k":"Offline_Scene","parameter":"(.*?)","v":"(.*?)"}';
				// 	var offline_scene = jst.match(s)[2];
				// }
				// 玩家是否为巫师
				// $(".property").append("<p>是否是巫师：" + is_wiz +"</p>");
				// // 玩家游戏内交易货币
				// $(".property").append("<p>游戏内交易货币：" + game_money +"</p>");
				// // 玩家离线场景
				// $(".property").append("<p>离线场景：" + offline_scene +"</p>");

				// 设置基本样式
			    tkbox2();
			});
			// 显示弹窗
			$(".black").show();
			$(".tkbox2").show();
			return;
		}

		//物资为npc
		if(res_pid == 1002)
		{	
			$(".tkbox2").load("page/npc-info-display.html", function(){
				// 赋值NPC名字
				$(".rw_xm").html(res.name);
				// 赋值NPC描述
				$(".introduce").html("<p>"+ res.introduce +"</p>");
				// 循环赋值NPC属性
				// $.each(res.attr, function(i){
				// 	// 属性
				// 	$(".property").append("<p>"+ res.attr[i].desc + "：" + res.attr[i].v +"</p>");	
				// });
				// 设置基本样式
			    tkbox2();
				});
			// 显示弹窗
			$(".black").show();
			$(".tkbox2").show();
			return;
		}

		//物资为物品
		if(res_pid == '479518a5-5d2e-4633-982f-050cd46b63a1')
		{
			// 赋值物品类别
			goods_category = res.category;
			// console.log(goods_category);

			$(".tkbox2").load("page/material-info-display.html", function(){
				// 赋值物资名字
				$(".zb_mc").html(res.name);
				// 赋值物资描述
				$(".introduce").html("<p>"+ res.introduce +"</p>");
				// 循环赋值物资属性
				$.each(res.attr, function(i){
					//console.log(res.attr[i].desc);
					// 属性
					if(res.attr[i].desc != '是否穿戴' && res.attr[i].desc != '部位'){
						$(".property").append("<p>"+ res.attr[i].desc + "：" + res.attr[i].v +"</p>");
					}
				});
				// 设置基本样式
			    tkbox2();
			});
			// 显示弹窗
			$(".black").show();
			$(".tkbox2").show();
			return;
		}
		return;
	}


	// 赋值按钮
	if(data.button_info != null){
		var but = data.button_info;
		// 按钮类别
		var category = data.category;
		// console.log(category);
		//玩家按钮
		if(category == 1013){
			// 循环赋值按钮
			for (var i = 0; i < but.length; i++){	
				// 热更按钮
				if(but[i].introduce == "热更"){
					// 如果该玩家是巫师
					if(isWiz == 1){
						// 赋值热更按钮
						$(".player_but").append("<a class='but04' onclick='Hot_shift()'>" + but[i].introduce +"</a>");
						continue;
					}
					// 如果玩家不是巫师
					if(isWiz == 0){
						continue;
					}
				}
				// 击杀按钮
				if(but[i].introduce == "杀死"){
					// 赋值热更按钮
					$(".player_but").append("<a class='but04' onclick='Player_kill(\""+ident+"\", \""+other_ident+"\")'>" + but[i].introduce +"</a>");
					continue;
				}
				// 切磋按钮
				if(but[i].introduce == "切磋"){
					// 赋值热更按钮
					// console.log(other_name);
					$(".player_but").append("<a class='but04' onclick='Player_compare(\""+name+"\", \""+ident+"\", \""+other_name+"\", \""+other_ident+"\")'>" + but[i].introduce +"</a>");
					continue;
				}	
				// 普通按钮
				$(".player_but").append("<a class='but04'>"+ but[i].introduce +"</a>");
			}
			return;
		}

		//NPC按钮
		if(category == 1014){
			// 循环赋值按钮
			for (var i = 0; i < but.length; i++){	
				//热更按钮
				if(but[i].introduce == "热更"){
					// 如果该玩家是巫师
					if(isWiz == 1){
						// 赋值热更按钮
						$(".npc_but").append("<a class='but04' onclick='Hot_shift()'>" + but[i].introduce +"</a>");
						continue;
					}
					// 如果玩家不是巫师
					if(isWiz == 0){
						continue;
					}
				}
				// 击杀按钮
				if(but[i].introduce == "杀死"){
					// 赋值热更按钮
					$(".npc_but").append("<a class='but04' onclick='Npc_kill(\""+ident+"\", \""+other_ident+"\")'>" + but[i].introduce +"</a>");
					continue;
				}
				// 切磋按钮
				if(but[i].introduce == "切磋"){
					// 赋值热更按钮
					$(".npc_but").append("<a class='but04' onclick='Npc_compare(\""+ident+"\", \""+other_ident+"\")'>" + but[i].introduce +"</a>");
					continue;
				}		
				// 普通按钮
				$(".npc_but").append("<a class='but04'>"+ but[i].introduce +"</a>");
			}
			return;
		}

		// 接受拒绝类按钮
		if(category == 1015){
			// 循环赋值按钮
			for (var i = 0; i < but.length; i++){	
				if(but[i].introduce == "接受"){
					// 赋值热更按钮
					$(".feedback").append("<a class='but03' onclick='Agree(\""+inquiry_category+"\", \""+inquiry_ident+"\")'>" + but[i].introduce +"</a>");
					continue;
				}	
				if(but[i].introduce == "拒绝"){
					// 赋值热更按钮
					// 给对手发送自己名字
					$(".feedback").append("<a class='but03' onclick='Refuse(\""+inquiry_category+"\",  \""+inquiry_ident+"\")'>" + but[i].introduce +"</a>");
					continue;
				}
			}
			return;
		}

		//物品按钮
		if(res_pid == 1003){
			// 循环赋值按钮
			for (var i = 0; i < but.length; i++){		
				// 如果装备已经穿戴
				if(equip_is_wear == 1 && but[i].introduce == '穿戴'){
					but[i].introduce = '脱下';
				}
				// 赋值按钮
				$(".goods_but").append("<a class='but02'>"+ but[i].introduce +"</a>");	
			}
			return;
		}
		return;
	}




	// 玩家 江湖属性
	if(data.player_attr1 != null){
		var player_attr1 = data.player_attr1;
		$(".tkbox2").load("page/fiure-jh-property.html", function(){
			// 赋值姓名 nick
			$(".txt03").html("<p>"+ player_attr1.nick +"</p>");
			// 赋值攻击 attack
			$(".ul02").append("<li><span>攻击</span>"+ player_attr1.attack +"</li>");
			// 赋值防御 defense
			$(".ul02").append("<li><span>防御</span>"+ player_attr1.defense +"</li>");
			$(".ul02").append("<li><span>命中</span>"+ player_attr1.hit +"</li>");
			// 赋值敏捷 agility
			// 赋值命中 hit
			$(".ul02").append("<li><span>敏捷</span>"+ player_attr1.agility +"</li>");
			// 赋值银两 tael
			$(".ul02").append("<li><span>携带银两</span>"+ player_attr1.tael +"</li>");
			// 赋值杀戮值 kill_count
			$(".ul02").append("<li><span>杀戮值</span>"+ player_attr1.kill_count +"</li>");
			// 赋值死亡次数 die_count
			$(".ul02").append("<li><span>死亡次数</span>"+ player_attr1.die_count +"</li>");
			// 设置基本样式
		    tkbox2();
		});
		// 显示弹窗
		$(".black").show();
		$(".tkbox2").show();
		return;
	}


	// 背包分类
	if(data.Back_category != null){
		// 赋值玩家游戏金币
		$(".game_money").after(player_game_money);
		// 背包种类
		var backCategory = data.Back_category;
		// 赋值物品的种类
        for(var i = 0; i < backCategory.length; i++){
            $(".flsx_con").append("<a href='javascript:void(0)' onclick='back_uid(\""+backCategory[i].uid+"\")'>"+backCategory[i].introduce+"</a>");
        }
        return;
	}

	// 人物页面或背包页面获取物品
	if(data.Back_reses != null){
		var back_size = data.Back_reses.size;
		var res = data.Back_reses.res_list;
		// 如果是从人物页面传入
		if(is_fiure_or_back == 'fiure'){
			// 将穿戴数量置零
			equip_HandLeft_count = 0;
			//console.log("1");
			// 循环判断
			for(var i = 0; i < res.length; i++){
				// 赋值物品id
				goods_id = res[i].id;
				// 获取物品是否穿戴
				var attr = res[i].attr;
				var jst = JSON.stringify(attr);
				var s = '{"desc":"部位","k":"part","v":"(.*?)"}';
				equip_part = jst.match(s)[1];
				var s = '{"desc":"是否穿戴","k":"is_wear","v":"(.*?)"}';
				equip_is_wear = jst.match(s)[1];
				// 增加该部位穿戴数目
				if(equip_part == 'hand_left' && equip_is_wear == 1){
					equip_HandLeft_count++;
					// console.log(equip_HandLeft_count);
				}
				// 同一部位穿戴物品数量多于1报错修改
				if(equip_HandLeft_count > 1){
					alert("左手部位已有穿戴物品！！")
					// 修改穿戴属性
					var res_id = goods_id;
					var key = "is_wear";
					var value = 0;
					Modify_goods_attr(res_id, key, value);
    				// 减少物品穿戴数目
    				equip_HandLeft_count--;
    				// console.log(equip_HandLeft_count);
				}

				// 判断是否穿戴
				if(equip_is_wear == 1){
					//console.log("穿戴物品");
					// 如果穿戴则给玩家穿戴上
					$("#"+ equip_part + " img").attr("src", "images/zb1.png");
					// 消除字体
					$("#"+ equip_part + " span").html("");
					// 增加物品详情按钮
					$("#"+ equip_part).attr("onclick", "back_goods_info('"+goods_id+"')");
				}
			}
			return;
		}

		// 如果是从背包页面传入
		if(is_fiure_or_back == 'back'){
			// 清空背包格子
			$(".xn_xq").html("");
			// 赋值背包格子数目
			// 如果是电脑端
			if(equipment == 0){
				for(var i = 0; i < back_size; i++){
					$(".xn_xq").append("<div style='width:0.79rem;' class='xn_tb "+ i +"'><img src='images/zb2.png'></div>");
				}
			}
			// 手机端
			else{
				for(var i = 0; i < back_size; i++){
					$(".xn_xq").append("<div class='xn_tb "+ i +"'><img src='images/zb2.png'></div>");
				}
			}

			// 赋值背包物品
			for(var i = 0; i < res.length; i++){
				// 赋值物品id
				goods_id = res[i].id;
				$("." + i + " img").attr("src", "images/zb1.png");
				// 增加物品详情按钮
				$("." + i).attr("onclick", "back_goods_info('"+goods_id+"')");
			}
		}

		return;
	}


	// 背包单个物品详情
	if(data.Back_res != null){
		var res = data.Back_res;
		// 物品id
		goods_id = res.id;
		// 获取物品是否穿戴
		var attr = res.attr;
		var jst = JSON.stringify(attr);
		var s = '{"desc":"(.*?)","k":"is_wear","v":"(.*?)"}';
		equip_is_wear = jst.match(s)[2];
		var s = '{"desc":"(.*?)","k":"part","v":"(.*?)"}';
		equip_part = jst.match(s)[2];
		var s = '{"desc":"(.*?)","k":"category","v":"(.*?)"}';
		back_goods_category = jst.match(s)[2];
		//console.log(equip_is_wear);
		// 赋值物品详情页面
		$(".tkbox2").load("page/back-goods-info.html", function(){
			// 赋值物资名字
			$(".zb_mc").html(res.name);
			// 赋值物资描述
			$(".introduce").html("<p>"+ res.introduce +"</p>");
			// 循环赋值物资属性
			$.each(res.attr, function(i){
				//console.log(res.attr[i].desc);
				// 属性
				if(res.attr[i].desc != '是否穿戴' && res.attr[i].desc != '部位'){
					$(".property").append("<p>"+ res.attr[i].desc + "：" + res.attr[i].v +"</p>");
				}
			});
			// 设置基本样式
		    tkbox2();
		});
		// 显示弹窗
		$(".black").show();
		$(".tkbox2").show();
		return;
	}

	// 技能分类
	if(data.categorys != null){
		var skill_categorys = data.categorys;
		// 清空技能分类
		$(".skill_category").empty();
		// 获取分类
		$.each(skill_categorys, function(i, item){
			// 技能类别
			skill_category = item.uid;
			// 技能类别名称
			var skill_category_name = item.introduce
			// 赋值分类		
			$(".skill_category").append("<li class='"+skill_category+"' onclick='Get_skill_list(\""+skill_category+"\")'><span class='martia_tit'>"+skill_category_name+"</span></li>");
			// 遍历所有技能分类
			Get_skill_list(skill_category);
		})
		// 遍历完毕 再返回第一个技能类别
		Get_skill_list(1030);
		return;
	}

	// 根据分类返回的技能列表
	if(data.skills != null){
		var skill_list = data.skills;
		// 初始化技能准备数目
		skill_prepare_num = 0
		// 准备技能的名称
		var skill_prepare_name;
		// 准备技能的品阶
		var skill_prepare_grade;
		// 清空技能列表
		$(".skill_list").empty();
		// 获取技能列表
		$.each(skill_list, function(i, item){
			// 技能id
			skill_id = item.id;
			// 技能名称
			var skill_name = item.name;
			// 技能类别
			skill_category = item.category;
			// 技能序列
			var skill_pid = item.pid;
			// 赋值一级技能分类
			if(skill_pid == 0){
				var jst = JSON.stringify(item.attr);
				// 技能等级
				var s = '{"desc":"等级","k":"level","v":"(.*?)"}';
				var skill_level = jst.match(s)[1];
				// 技能是否准备
				var s = '{"desc":"是否准备","k":"is_prepare","v":"(.*?)"}';
				skill_is_prepare = jst.match(s)[1];
				// 技能品阶
				var s = '{"desc":"品阶","k":"grade","v":"(.*?)"}';
				var skill_grade = jst.match(s)[1];
				// 判断技能是否准备
				if(skill_is_prepare == 1){
					// 增加技能准备数目
					skill_prepare_num++;
				}
				// 判断技能准备数目
				// 技能准备数目超过1
				if(skill_prepare_num > 1){
					var key = "is_prepare";
					var value = 0;
					// 重置该技能的准备为未准备
					Modify_skill_attr(skill_id, key, value);
					// 修改技能为未准备
					skill_is_prepare = 0;
					// 减少技能准备数目
					skill_prepare_num--;
				}

				if(skill_is_prepare == 1){
					// 准备技能名称
					skill_prepare_name = skill_name;
					// 准备技能品阶
					skill_prepare_grade = skill_grade;
					// 赋值技能	
					$(".skill_list").append("<li onclick='Get_skill_details(\""+skill_id+"\")'><span class='syz'>使用中</span><span class='martia_name martia_color"+skill_grade+"'>"+skill_name+"</span><span class='dj'>"+skill_level+"级</span></li>");
				}
				else{
					$(".skill_list").append("<li onclick='Get_skill_details(\""+skill_id+"\")'><span class='martia_name martia_color"+skill_grade+"'>"+skill_name+"</span><span class='dj'>"+skill_level+"级</span></li>");
				}
			}	
		})
		// 技能准备数目等于0
		if(skill_prepare_num == 0){
			// 删除技能分类下显示的技能名
			$("."+skill_category+" .prepare_skill_name").remove();
		}
		// 技能准备数目等于1
		if(skill_prepare_num == 1){
			// 删除技能分类下显示的技能名
			$("."+skill_category+" .prepare_skill_name").remove();
			$("."+skill_category).append("<span class='prepare_skill_name martia_color"+skill_prepare_grade+"'>"+skill_prepare_name+"</span>");
		}
		return;
	}

	// 单个技能详情
	if(data.skill != null){
		var skill = data.skill;
		// 技能类别
		skill_category = skill.category;
		// 技能id
		skill_id = skill.id;
		// 技能名称
		var skill_name = skill.name;
		// 技能描述
		var skill_introduce = skill.introduce;
		// 技能属性
		var jst = JSON.stringify(skill.attr);
		// 技能等级
		var s = '{"desc":"等级","k":"level","v":"(.*?)"}';
		var level = jst.match(s)[1];
		// 技能是否准备
		var s = '{"desc":"是否准备","k":"is_prepare","v":"(.*?)"}';
		skill_is_prepare = jst.match(s)[1];
		// 技能品阶
		var s = '{"desc":"品阶","k":"grade","v":"(.*?)"}';
		var grade = jst.match(s)[1];

		// 赋值技能详情页面
		$(".tkbox2").load("page/skill-details.html", function(){
			// 赋值技能名称 等级
			$(".skill").append("<div class='tkbox2_tit01 martia_color"+grade+"'>"+skill_name+"<span class='jndj'>"+level+"级</span></div>");
			// 赋值技能描述
			$(".introduce").html("<p>"+skill_introduce+"</p>");
			// 是否装备按钮
			if(skill_is_prepare == 1){
				$(".is_prepare").html("取消准备");
			}
			else{
				$(".is_prepare").html("准备");
			}
			// 设置基本样式
		    tkbox2();
		});
		// 显示弹窗
		$(".black").show();
		$(".tkbox2").show();
		return;
	}

	// 询问弹窗
	if(data.inquiry != null){
		// 关闭弹窗
		$(".black").hide();
		$(".tkbox2").hide();
		var inquiry = data.inquiry;
		// 询问类别
		inquiry_category = inquiry.category;
		// 询问反馈状态
		var status = inquiry.status;
		console.log(status);
		// 询问者的姓名
		inquiry_name = inquiry.questioner_name;
		// 询问者的ident
		inquiry_ident = inquiry.questioner_ident;
		// feedback == 1   询问成功
		// feedback == -1  询问失败
		// inquiry_button = 1 接受拒绝类按钮
		// inquiry_category = combat_compare 战斗切磋询问
		
		// 切磋询问
		// 询问失败
		if(inquiry_category == "combat_compare"){
			if(status == 0){
				// 信息提示
				message = "<span style='color:#FF5809'>"+inquiry_name+"</span>正在战斗中，邀请切磋失败。"	
				// 发给自己
				Talk(message, ident);
				return;
			}
			if(status == 1){
				// 接受拒绝类按钮
				inquiry_button = 1;
				// 赋值切磋询问弹窗
				$(".tkbox2").load("page/inquiry-window.html", function(){
					// 赋值物资名字
					$(".name").html(inquiry_name);
					// 赋值物资描述
					$(".desc").html("<p>久仰少侠英名，不知在下能否领教几招？</p>");
					// 设置基本样式
				    tkbox2();
				});
				// 显示弹窗
				$(".black").show();
				$(".tkbox2").show();
				return;
			}
			return;
		}
		return;
	}

	// 收到询问反馈
	if(data.inquiry_feedback != null){
		var inquiry_feedback = data.inquiry_feedback;
		// 反馈类别
		var category = inquiry_feedback.category;
		// 反馈状态
		var status = inquiry_feedback.status;
		// category == combat_compare 战斗切磋
		
		// 反馈类型为战斗切磋
		if(category == "combat_compare"){
			// 拒绝切磋
			if(status == 0){
				// 给自己-询问者发送信息
				var message = "<span style='color:#FF5809'>"+other_name+"</span>拒绝了你的切磋邀请。"
				Talk(message, ident);
				// 给对方-反馈者发送信息
				message = "你拒绝了<span style='color:#FF5809'>"+name+"</span>的切磋邀请。"
				Talk(message, other_ident);
				return;
			}
			// 接受切磋 自己是询问者
			if(status == 1){
				// 开始战斗
				Combat_start(other_ident);
				return;
			}
			return;
		}
		return;
	}


	// 战斗反馈
	if(data.combat_feedback != null){
		// 
		// combat_feedback == -1  战斗结束
		// combat_feedback == 0   自己处于非战斗中
		// combat_feedback == 1   自己处于战斗中
		// combat_feedback == 2   开始新的战斗
		// combat_feedback == 3   自己中途成功加入友队的队伍
		// combat_feedback == -3  自己需要加入的战斗队伍人数已满
		// combat_feedback == 4   战斗胜利
		// combat_feedback == -4  战斗失败
		// combat_feedback == 5	  
		// combat_feedback == -5  

		var combat_feedback = data.combat_feedback;
		// 结束战斗
		if(combat_feedback == -1){
			// 修改玩家状态为正常
			player_state = 0;
			// 关闭弹窗
			$(".black").hide();
			$(".tkbox2").hide();
			// 加载home.html
			$("#home").load("home.html");
			return;
		}

		// 自己处于非战斗中
		if(combat_feedback == 0){
			var message = "你不在战斗中！"
			Talk(message, ident);
			return;
		}

		// 自己处于战斗中
		if(combat_feedback == 1){
			return;
		}

		// 开始新的战斗
		if(combat_feedback == 2){
			// 关闭弹窗
			$(".black").hide();
			$(".tkbox2").hide();
			// 加载战斗界面
			$("#home").load("page/combat.html");
			return;
		}

		// 自己中途成功加入别人的战斗
		if(combat_feedback == 3){
			// 关闭弹窗
			$(".black").hide();
			$(".tkbox2").hide();
			// 加载战斗界面
			$("#home").load("page/combat.html");
			return;
		}

		// 自己需要加入的战斗队伍人数已满
		if(combat_feedback == -3){
			var message = "对方正在战斗中--且--友队人数已满！"
			Talk(message, ident);
			return;
		}

		// 战斗胜利
		if(combat_feedback == 4){
			// 修改玩家状态为正常
			player_state = 0;
			// 隐藏战斗成员，功能
			$(".armyA").hide();
			$(".armyB").hide();
			// 显示战斗胜利弹窗
			$(".combat_message").append("<div class='zd_jg'><img src='images/sl_s1.png' class='sl'><p class='color1'>恭喜你，战胜了对方！</p><div class='cz'><a class='but04' onclick='Leave_combat_html()'>离开战斗</a></div></div>");
			// 更新信息
			$(".zd_mid").scrollTop($(".zd_mid").get(0).scrollHeight);
			return;
		}

		// 战斗失败
		if(combat_feedback == -4){
			// 修改玩家状态为正常
			player_state = 0;
			// 隐藏战斗成员，功能
			$(".armyA").hide();
			$(".armyB").hide();
			// 显示战斗失败弹窗
			$(".combat_message").append("<div class='zd_jg'><img src='images/sb.png' class='sb'><p class='sb_p'>胜败乃兵家常事，大侠请重新来过。</p><div class='cz'><a class='but04' onclick='Leave_combat_html()'>原地疗伤</a><a class='but04' onclick='Leave_combat_html()'>回城休息</a></div></div>");
			// 更新信息
			$(".zd_mid").scrollTop($(".zd_mid").get(0).scrollHeight);
			return;
		}

		return;
	}

    // 对战玩家信息
	if(data.combat_members != null){
		var combat_members = data.combat_members;
		// 获取双方队伍
		var members = combat_members.members;
		// 创建队伍数组存储
		var memberA;
		var memberB;
		// 重置
		members_team = [];
		members_ident = [];

		// 遍历获取队伍
		$.each(members, function(k, v){
			// 添加队伍到队伍数组
			members_team.push(members[k]);
		})
		// console.log(members_team)

		// 遍历各个队伍队员 (适用两个队伍)
		for(var i = 0; i < members_team.length; i++){
			// 当前战斗队伍
			var team = members_team[i];
			// 遍历的队伍人数
			var team_members = 0;
			// console.log(team.length);
			for(var j = 0; j < team.length; j++){
				// 存储战斗人员的ident
				members_ident.push(team[j].ident);

				// console.log(team[j].ident);
				// 判断自己处于哪个队伍
				if(team[j].ident == ident){
					// 友队
					memberA = team;
					// console.log(memberA);
				}
				else{
					// 队伍人数增加
					team_members++;
				}
	
				// 自己不在该队伍
				if(team_members == team.length){
					// 敌对
					memberB = team;
					// console.log(memberB);
				}
			}
		}
		
		// console.log(members_ident);
		// console.log(memberA);
		// console.log(memberB);

		// 初始化战斗页面
		$("#memberA").html("");
		$("#memberB").html("");
		// 
		var now_hp;
		var max_hp;
		var now_mp;
		var max_mp;
		// 遍历己方玩家
		$.each(memberA, function(i, item){
			// 人物属性
			var jst = JSON.stringify(item.attr);
			// 当前血量
			try{
	    		var s = '{"desc":"当前血量","k":"now_hp","v":"(.*?)"}';
				var now_hp = jst.match(s)[1];
			}
			catch(exception){
			    var now_hp = 0;
			} 
			// 最大血量
			try{
	    		var s = '{"desc":"最大血量","k":"max_hp","v":"(.*?)"}';
				var max_hp = jst.match(s)[1];
			}
			catch(exception){
			    var max_hp = 0;
			} 
			// 当前内力
			try{
	    		var s = '{"desc":"当前内力","k":"now_mp","v":"(.*?)"}';
				var now_mp = jst.match(s)[1];
			}
			catch(exception){
			    var now_mp = 0;
			} 
			// 最大内力
			try{
	    		var s = '{"desc":"最大内力","k":"max_mp","v":"(.*?)"}';
				var max_mp = jst.match(s)[1];
			}
			catch(exception){
			    var max_mp = 0;
			} 
			//console.log(JSON.stringify(item));
			$("#memberA").append("<div class='zd_rwz'><span class='zd_rw'>"+item.name+"</span><div class='zd_jd1'><span class='zdjd1_hs zdjd1_hs100 "+item.ident+"_hp'></span><span class='zhi1'>"+now_hp+"</span></div><div class='zd_jd2'><span class='zdjd1_ls zdjd1_ls100 "+item.ident+"_mp'></span><span class='zhi1'>"+now_mp+"</span></div></div>");
			// 血条动态增加
		    BarAdd(item.ident, "."+item.ident+"_hp", 0, now_hp);
		    // 内力动态增加
		    // BarAdd(item.ident, "."+item.ident+"_mp", now_mp, max_mp);
		})

		// 遍历敌方玩家
		$.each(memberB, function(i, item){
			// 人物属性
			var jst = JSON.stringify(item.attr);
			// 当前血量
			try{
	    		var s = '{"desc":"当前血量","k":"now_hp","v":"(.*?)"}';
				var now_hp = jst.match(s)[1];
			}
			catch(exception){
			    var now_hp = 0;
			} 
			// 最大血量
			try{
	    		var s = '{"desc":"最大血量","k":"max_hp","v":"(.*?)"}';
				var max_hp = jst.match(s)[1];
			}
			catch(exception){
			    var max_hp = 0;
			} 
			// 当前内力
			try{
	    		var s = '{"desc":"当前内力","k":"now_mp","v":"(.*?)"}';
				var now_mp = jst.match(s)[1];
			}
			catch(exception){
			    var now_mp = 0;
			} 
			// 最大内力
			try{
	    		var s = '{"desc":"最大内力","k":"max_mp","v":"(.*?)"}';
				var max_mp = jst.match(s)[1];
			}
			catch(exception){
			    var max_mp = 0;
			}
			//console.log(JSON.stringify(item));
			$("#memberB").append("<div class='zd_rwz'><span class='zd_rw'>"+item.name+"</span><div class='zd_jd1'><span class='zdjd1_hs zdjd1_hs100 "+item.ident+"_hp'></span><span class='zhi1'>"+now_hp+"</span></div><div class='zd_jd2'><span class='zdjd1_ls zdjd1_ls100 "+item.ident+"_mp'></span><span class='zhi1'>"+now_mp+"</span></div></div>");
			// 血条动态增加
		    BarAdd(item.ident, "."+item.ident+"_hp", 0, now_hp);
		    // 内力动态增加
		    // BarAdd(item.ident, "."+item.ident+"_mp", now_mp, max_mp);
		})
		return;
	}

	// 战斗技能
	if(data.combat_skills != null){
		var combat_skills = data.combat_skills;
		// 清空战斗技能
		$(".combat_skill").remove();
		// 清空战斗技能id
		combat_skills_id = [];
		// 清空战斗技能消耗的战斗cd数组
		combat_skills_consume_cd = [];
		// 遍历战斗技能
		$.each(combat_skills, function(i, item){
			// 获取战斗技能id
			combat_skills_id[i] = item.id;
			// console.log(i);
			var combat_skill_name = item.name;
			// 技能属性
			var jst = JSON.stringify(item.attr);
			// 技能所消耗的战斗cd
			var s = '{"desc":"消耗气力","k":"consume_cd","v":"(.*?)"}';
			var combat_skill_consume_cd = jst.match(s)[1];
			// 技能品阶
			var s = '{"desc":"品阶","k":"grade","v":"(.*?)"}';
			var combat_skill_grade = jst.match(s)[1];
			// 赋值所消耗的战斗cd
			combat_skills_consume_cd[i] = combat_skill_consume_cd;
			// 赋值战斗技能名
			$(".skill_"+i).html(combat_skill_name);
			// 赋值战斗技能品阶
			$(".skill_"+i).addClass("martia_color"+combat_skill_grade);
		})
		return;
	}

	// 战斗cd
	if(data.combat_cd){
		// 字符串转换为整数
		combat_cd = parseInt(data.combat_cd);
		// 赋值战斗气数cd长度
		$(".combat_cd_legth").css("width", combat_cd*10 + "%");
		// 赋值战斗cd的数目
		$(".combat_cd_num").html(combat_cd + "/10");

		// 循环判断战斗cd跟技能所消耗的战斗cd的比较
		for(var i = 0; i < combat_skills_id.length; i++){
			// 当前战斗技能id
			var combat_skill_id = parseInt(combat_skills_id[i]);
			// 当前的技能消耗战斗cd 字符串转换为整数
			var combat_skill_consume_cd = parseInt(combat_skills_consume_cd[i]);
			if(combat_cd >= combat_skill_consume_cd){
				// 改变技能样式为可点击
				$(".skill_"+i).addClass("zd_ng1");
				// 增加点击技能函数
				$(".skill_"+i).attr("onclick", "Onclick_skill("+combat_skill_id+", "+combat_skill_consume_cd+")");
			}
			else{
				// 改变技能样式为不可点击
				$(".skill_"+i).removeClass("zd_ng1");
				// 增加点击技能消耗战斗cd
				$(".skill_"+i).attr("onclick", "");
			}
		}
		return;
	}

	// 战斗状况
	if(data.combat_condition != null){
		//
		var combat_condition = data.combat_condition;
		// 赋值战斗情况
		$(".combat_message").append(combat_condition);
		// 更新信息
		$(".zd_mid").scrollTop($(".zd_mid").get(0).scrollHeight);
		return;
	}

}

// 玩家的状态
// function Player_state(player_state){
// 	sdmg("{\"gid\":\""+gid+"\", \"token\":\""+token+"\", \"ident\":\""+ident+"\", \"cmd\":\"player_state\",\"para\":[{\"player_state\":\""+player_state+"\"}]}");
// }

// 路径返回函数
// function go(path) {
// 	sdmg("{\"gid\":\""+gid+"\", \"token\":\""+token+"\", \"ident\":\""+ident+"\", \"cmd\":\"go\",\"para\":[{\"path\":\""+path+"\"}]}");
// }

// 对话函数
function Talk(message, recipient_indent){
	sdmg("{\"gid\":\""+gid+"\", \"token\":\""+token+"\", \"ident\":\""+ident+"\", \"cmd\":\"message\", \"para\":[{\"message\":\""+message+"\", \"recipient_indent\":\""+recipient_indent+"\",}]}");
	// console.log("发送信息");
}

// 热更函数
function Hot_shift(){
	sdmg("{\"gid\":\""+gid+"\", \"token\":\""+token+"\", \"ident\":\""+ident+"\", \"cmd\":\"reLoad\",\"para\":[]}");
	//console.log("热更了");
}

// 获取按钮
// function Get_button(category){
// 	sdmg("{\"gid\":\""+gid+"\", \"token\":\""+token+"\", \"ident\":\""+ident+"\", \"cmd\":\"getButton\", \"para\":[{\"category\":\""+category+"\"}]}");
// }

// 物资信息返回函数
function call_res(res_ident) {
	// 发送请求
    sdmg("{\"gid\":\""+gid+"\",\"token\":\""+token+"\", \"ident\":\""+ident+"\", \"cmd\":\"viewRes\",\"para\":[{\"ident\":\""+res_ident+"\"}]}");
    //console.log("物资详情");
}

// 背包物资信息返回函数
function back_goods_info(id) {
	// 发送请求
    sdmg("{\"gid\":\""+gid+"\",\"token\":\""+token+"\", \"ident\":\""+ident+"\", \"cmd\":\"pushRes\",\"para\":[{\"id\":\""+id+"\"}]}");
    // console.log("单个物品详情");
}

// 修改物品属性
function Modify_goods_attr(res_id, key, value){
	sdmg("{\"gid\":\""+gid+"\", \"token\":\""+token+"\", \"ident\":\""+ident+"\", \"cmd\":\"modify_goods_attr\",\"para\":[{\"res_id\":\""+res_id+"\", \"key\":\""+key+"\", \"value\":\""+value+"\"}]}");
}

// 根据技能分类获取技能列表
function Get_skill_list(skill_category){
	sdmg("{\"gid\":\""+gid+"\", \"token\":\""+token+"\", \"ident\":\""+ident+"\", \"cmd\":\"get_skill_list\", \"para\":[{\"category\":\""+skill_category+"\"}]}");
}

// 获得单个技能详情
function Get_skill_details(skill_id){
	sdmg("{\"gid\":\""+gid+"\", \"token\":\""+token+"\", \"ident\":\""+ident+"\", \"cmd\":\"get_skill_details\", \"para\":[{\"skill_id\":\""+skill_id+"\"}]}");
}

// 修改技能属性
function Modify_skill_attr(skill_id, key, value){
	sdmg("{\"gid\":\""+gid+"\", \"token\":\""+token+"\", \"ident\":\""+ident+"\", \"cmd\":\"modify_skill_attr\",\"para\":[{\"skill_id\":\""+skill_id+"\", \"key\":\""+key+"\", \"value\":\""+value+"\"}]}");
}

// 战斗开始
function Combat_start(challenged_ident){
	sdmg("{\"gid\":\""+gid+"\", \"token\":\""+token+"\", \"ident\":\""+ident+"\", \"cmd\":\"combat_start\",\"para\":[{\"challenged_ident\":\""+challenged_ident+"\"}]}");
}

// 获取战斗成员的信息
function Push_combat_info(){
  	sdmg("{\"gid\":\""+gid+"\", \"token\":\""+token+"\", \"ident\":\""+ident+"\", \"cmd\":\"pushCombatMembers\", \"para\":[]}");
}

// 获得自己的战斗技能
function Get_combat_skills(){
	sdmg("{\"gid\":\""+gid+"\", \"token\":\""+token+"\", \"ident\":\""+ident+"\", \"cmd\":\"get_combat_skills\", \"para\":[]}");
}

// // 开始调用战斗CD
// function Start_combat_cd(){
// 	sdmg("{\"gid\":\""+gid+"\", \"token\":\""+token+"\", \"ident\":\""+ident+"\", \"cmd\":\"start_combat_cd\", \"para\":[]}");
// }

// 停止调用战斗CD
// function Stop_combat_cd(){
// 	sdmg("{\"gid\":\""+gid+"\", \"token\":\""+token+"\", \"ident\":\""+ident+"\", \"cmd\":\"stop_combat_cd\", \"para\":[]}");
// }

// 战斗反馈
function Combat_feedback(type, other_ident){
	sdmg("{\"gid\":\""+gid+"\", \"token\":\""+token+"\", \"ident\":\""+ident+"\", \"cmd\":\"combat_feedback\",\"para\":[{\"type\":\""+type+"\", \"other_ident\":\""+other_ident+"\"}]}");
}
  
// 结束战斗
// function Combat_over(combat_no){
// 	sdmg("{\"gid\":\""+gid+"\", \"token\":\""+token+"\", \"ident\":\""+ident+"\", \"cmd\":\"combat_over\",\"para\":[{\"combat_no\":\""+combat_no+"\"}]}");
// 	// console.log("结束战斗");
// }



// 弹窗格式函数
function tkbox2() {
	// 获取高度
	var h = $(".tkbox2").height();
	// console.log("h = " + h);
	$(".tkbox2").css("margin-top",-h/2);
	// 关闭弹窗
	$("a[name='gb']").click(function(){
		$(".black").hide();
	    $(".tkbox2").hide();
	});
}