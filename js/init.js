//var host="http://localhost:8080";
var host="http://mud1.taesio.com:8080";

$(function () {
        $.ajaxSetup({xhrFields: {withCredentials: true}});
});

// 设备
// equipment == 0; 电脑
// equipment == 1; 手机
var equipment;
// 屏幕的宽度
var window_width;
// 屏幕的高度
var window_height;
// 页面的宽度
var html_width;
// 页面的高度
var html_height;

var token;  // 连接
var ident;  // 当前玩家的ident
var name;	// 当前玩家的name

// 巫师指令
// fly: 飞行
var Wiz_instruct = ["fly"];

// 场景npc
var scene_npc_name;
var scene_npc_ident;

// 场景玩家
var scene_player_name;
var scene_player_ident;

// 玩家是否战斗
var is_combat = false;

// 玩家的状态
// player_state == 0; 正常登陆状态
// player_state == 1; 处于战斗状态
var player_state;

// 其它物资的ident
var other_ident; 
// 其它物资的name
var other_name;

var gid = 300;    // 游戏id

//玩家的游戏货币
var player_game_money; 
var isWiz;	// 玩家是否为巫师

var res_pid; //物资的pid
var goods_category; //物品类别

// 装备是穿戴
var equip_is_wear;
// 物品id
var goods_id;
// 装备部位数组 12 个 武器 项链 戒指 戒指 护符 护符 帽子 衣服 鞋子 护腕 护肩
var equip_part_array = new Array();
// 装备数组下标
var equipment_index;

// 背包分类uid
var back_category_uid;
// 背包分类introduce
var back_category_introduce;
// 装备的uid
var back_equipment_uid = "c1482092-f95c-4380-8db8-3e06ab9c14ca";

var back_goods_category; //背包物品类别

var is_fiure_or_back; //判断是从fiure页面传过去的，还是从背包页面传过去的

var url;    // 江湖属性url

// 技能类别
var skill_category;
// 技能是否准备
var skill_is_prepare;
// 技能id
var skill_id;
// 技能准备数目
var skill_prepare_num;



// 询问类别
var inquiry_category;
// 询问按钮
var inquiry_button;
// 询问者的姓名
var inquiry_name;
// 询问者的ident
var inquiry_ident;



// 队伍数组
var members_team = [];
// 战斗成员的ident数组
var members_ident = [];

// 战斗cd
var combat_cd;
// 战斗技能id
var combat_skills_id = [];
// 战斗技能消耗的战斗cd
var combat_skills_consume_cd = [];