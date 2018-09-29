const Discord = require("discord.js");
const client = new Discord.Client();
const SERVER = "361606929610702848";
const LOGGING = "495625599189254174";
/*time consts
const hour = 3600000;
const halfhr = 1800000;
const quarthr = 900000;
const min = 60000;
const sec = 1000;*/
const TOGGLFLAGS = true;
const UNIQUEFLAGS = true;
const ID_ZORIA = 316187823403171840;
const ID_VENROB = 242422436262313986;
const P_BOTTEST = 6;
const P_OWNER = 5;
const P_ADMIN = 4;
const P_CONTRIBUTOR = 3;
const P_TESTER = 2;
const P_ZC = 1;
const P_DEFAULT = 0;
const PR_ICON = 4;
const PR_ICHELP = PR_ICON;
//               0            1              2               3              4               5              6             7        8        9         10             11          //
//               new bug      unconf'd bg    verif'd bug     crashing       critical        treated        p. fixed      v.fixd   closed   notbug    needs rule2     needsrule  //
var flags = ["\uD83D\uDC1B","\uD83D\uDE48","\uD83D\uDC1E","\uD83D\uDCA3","\uD83D\uDC7F","\uD83D\uDC8A",	"\uD83D\uDEA5",	"\u2705","\u2B55","\u274C","\uD83D\uDCDC","\uD83D\uDCD0",
//             12     REP      13                14 REP      15          16           17             18     BAD     19              20            21              22
//             mechanical      enemies           items       timing      examine      historical     controlany     controlgpad     audio         music/midi      visual
            "\uD83D\uDD27",	"\uD83D\uDC7E",	"\uD83C\uDFF9",	"\u23F1","\uD83D\uDD2C","\uD83D\uDD2E","\uD83D\uDD79","\uD83C\uDFAE","\uD83D\uDD0A","\uD83C\uDFB5","\uD83D\uDC40",
//             23          24            25             26            27              28             29         30  BAD //  31             32                  33
//             saving      wat/swim      link           tiles         combos          flags          lens       balance //  pinned         all-nighter         stress
			"\uD83D\uDCBE","\u2693","\uD83E\uDDDD","\uD83C\uDC04","\uD83C\uDF54","\uD83C\uDF8C","\uD83D\uDD0D","\u2696","\uD83D\uDCCC","\uD83D\uDEAC\u2615","\uD83C\uDF7A",
//               34           35               36            37          38      39           40           41                42
//               locked       readylock        moyai         toilet      p.a.m.  question     bait         spaghetti         snake
			"\uD83D\uDD12","\uD83D\uDD13","\uD83D\uDDFF","\uD83D\uDEBD","\u303D","\u2753","\uD83C\uDF56","\uD83C\uDF5D","\uD83D\uDC0D"];
var flagprio = [30,7,8,6,5,2,1,9,4,3,0,10,11,/**/31,32,33,34,35,36,37,38,39,40,41,/**/16,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];

function insufPerms(message, param){
	//message.delete(1);
	//message.author.createDM().then(dm=>{dm.send("Insufficient permissions for command \"!"+param+"\"!")}).catch(console.error);
}

function flaghelp(){
	return "Flag words:\nAny \"-\" may be omitted or replaced by \"_\"\n"+
	"new: `"+flags[0]+"`\n"+
	"unconfirmed: `"+flags[1]+"`\n"+
	"verified: `"+flags[2]+"`\n"+
	"crash, crashes, horrific: `"+flags[3]+"`\n"+
	"urgent, critical: `"+flags[4]+"`\n"+
	"treated, sick: `"+flags[5]+"`\n"+
	"pfixed, potential: `"+flags[6]+"`\n"+
	"fixed, vfixed: `"+flags[7]+"`\n"+
	"closed, close: `"+flags[8]+"`\n"+
	"nonbug, notbug, nobug: `"+flags[9]+"`\n"+
	"rule2, needsrule2: `"+flags[10]+"`\n"+
	"rule, needsrule: `"+flags[11]+"`\n"+
	"mech, mechanical: `"+flags[12]+"`\n"+
	"enemy, enemies: `"+flags[13]+"`\n"+
	"item, items: `"+flags[14]+"`\n"+
	"time, timing: `"+flags[15]+"`\n"+
	"examine: `"+flags[16]+"`\n"+
	"historical, old: `"+flags[17]+"`\n"+
	"control, keyboard: `"+flags[18]+"`\n"+
	"controller, gamepad: `"+flags[19]+"`\n"+
	"audio, sound, sfx: `"+flags[20]+"`\n"+
	"music, midi: `"+flags[21]+"`\n"+
	"graphics, visual, gfx: `"+flags[22]+"`\n"+
	"saving, save: `"+flags[23]+"`\n"+
	"water, swimming, swim: `"+flags[24]+"`\n"+
	"link: `"+flags[25]+"`\n"+
	"tiles, tile: `"+flags[26]+"`\n"+
	"combo, combos: `"+flags[27]+"`\n"+
	"flag, flags: `"+flags[28]+"`\n"+
	"lens, lensoftruth: `"+flags[29]+"`\n"+
	"balance, balancing: `"+flags[30]+"`\n"+
	"Dev-Only: pin: `"+flags[31]+"`\n"+
	"all-nighter, all-night, night: `"+flags[32]+"`\n"+
	"stress, stressed: `"+flags[33]+"`\n"+
	"Dev-Only: lock: `"+flags[34]+"`\n"+
	"readylock: `"+flags[35]+"`\n"+
	"moyai, moai: `"+flags[36]+"`\n"+
	"toilet, loo: `"+flags[37]+"`\n"+
	"m, part-alternation-mark: `"+flags[38]+"`\n"+
	"?, help: `"+flags[39]+"`\n"+
	"bait: `"+flags[40]+"`\n"+
	"spaghetti, spagh, mess: `"+flags[41]+"`\n"+
	"snake: `"+flags[42] + "`";
}

function runflags(chan, params, perms){
	var chanName = chan.name;
	for(var i = 1; i < params.length; i++){
		var arg = params[i];
		var fl = "";
		if(isNaN(Number.parseInt(arg))){
			fl = stringToFlag(arg,perms);
		} else {
			var index = Number.parseInt(arg) - 1;
			if(index<flags.length && index > -1){
				if((index!=34 && index!=31)||perms>=4)//Lock and Pinned are Dev+ only
					fl = flags[index];
			} else {
				console.log("Flag index " + index + " is invalid!")
			}
		}
		if(fl=="")continue;
		if(chanName.includes(fl)){
			if(TOGGLFLAGS){
				chanName = chanName.replace(new RegExp(fl,'g'),"");
			} else if(!UNIQUEFLAGS){
				chanName = fl + chanName;
			}
		} else {
			chanName = checkExclusivities(chanName, fl);
			chanName = fl + chanName;
		}
	}
	chanName = ordering(chanName);
	chan.setName(chanName);
}

function ordering(name){
	for(var i = flagprio.length - 1; i>=0; i--){
		name = moveUp(name, flagprio[i]);
	}
	return name;
}

function moveUp(string,flagindex){
	if(string.includes(flags[flagindex])){
		string = flags[flagindex] + string.replace(new RegExp(flags[flagindex],'g'),"");
	}
	return string;
}

function checkExclusivities(name, flag){
	switch(flag){
		//Unconfirmed bug, Verified bug, Not a bug
		case flags[1]:
			name = name.replace(new RegExp(flags[2],'g'),"").replace(new RegExp(flags[9],'g'),"");
			break;
		case flags[2]:
			name = name.replace(new RegExp(flags[1],'g'),"").replace(new RegExp(flags[9],'g'),"");
			break;
		case flags[9]:
			name = name.replace(new RegExp(flags[1],'g'),"").replace(new RegExp(flags[2],'g'),"");
			break;
		//Treated/Potentially fixed, Verified Fixed
		case flags[5]:
			name = name.replace(new RegExp(flags[7],'g'),"");
			break;
		case flags[6]:
			name = name.replace(new RegExp(flags[7],'g'),"");
			break;
		case flags[7]:
			name = name.replace(new RegExp(flags[5],'g'),"").replace(new RegExp(flags[6],'g'),"");
			break;
		//Lock, Ready To Lock
		case flags[34]:
			name = name.replace(new RegExp(flags[35],'g'),"");
			break;
		case flags[35]:
			name = name.replace(new RegExp(flags[34],'g'),"");
			break;
		//
	}
	return name;
}

function stringToFlag(flag, perms){
	switch(flag.toLowerCase()){
		case "new":
			return flags[0];
		case "unconfirmed":
			return flags[1];
		case "verified":
			return flags[2];
		case "crash": case "crashes": case "horrific":
			return flags[3];
		case "urgent": case "critical":
			return flags[4];
		case "treated": case "sick":
			return flags[5];
		case "pfixed": case "potential":
			return flags[6];
		case "fixed": case "vfixed":
			return flags[7];
		case "closed": case "close":
			return flags[8];
		case "nonbug": case "notbug": case "nobug":
			return flags[9];
		case "rule2": case "needsrule2":
			return flags[10];
		case "rule": case "needsrule":
			return flags[11];
		case "mech": case "mechanical":
			return flags[12];
		case "enemy": case "enemies":
			return flags[13];
		case "item": case "items":
			return flags[14];
		case "time": case "timing":
			return flags[15];
		case "examine":
			return flags[16];
		case "historical": case "old":
			return flags[17];
		case "control": case "keyboard":
			return flags[18];
		case "controller": case "gamepad":
			return flags[19];
		case "audio": case "sound": case "sfx":
			return flags[20];
		case "music": case "midi":
			return flags[21];
		case "graphics": case "gfx": case "visual":
			return flags[22];
		case "saving": case "save":
			return flags[23];
		case "water": case "swimming": case "swim":
			return flags[24];
		case "link":
			return flags[25];
		case "tiles": case "tile":
			return flags[26];
		case "combo": case "combos":
			return flags[27];
		case "flag": case "flags":
			return flags[28];
		case "lens": case "lensoftruth":
			return flags[29];
		case "balance": case "balancing":
			return flags[30];
		case "pin":
			if(perms<4)return "";
			return flags[31];
		case "all-nighter": case "all-night": case "allnighter": case "allnight": case "night": case "all_nighter": case "all_night":
			return flags[32];
		case "stress": case "stressed":
			return flags[33];
		case "lock":
			if(perms<4)return "";
			return flags[34];
		case "readylock":
			return flags[35];
		case "moyai": case "moai":
			return flags[36];
		case "toilet": case "loo":
			return flags[37];
		case "m": case "partalternationmark": case "part_alternation_mark": case "part-alternation-mark": 
			return flags[38];
		case "?": case "help":
			return flags[39];
		case "bait":
			return flags[40];
		case "spaghetti": case "spagh": case "mess":
			return flags[41];
		case "snake":
			return flags[42];
		default:
			console.log("Flag `" + flag + "` not parsed!");
			return "";
	}
}

function newBugReport(message, command, perms){
	var lines = command.split('\n');
	var icons = "";
	var title = "";
	var post = "";
	var skipicon = false;
	for(var i = 0; i<lines.length; i++){
		var params = lines[i].split(' ');
		for(var j = 0; j<params.length; j++){
			if(params[0]=="bug"){
				if(j==0)continue;
				if(j==1){
					title=params[j];
				} else {
					title+= "-" + params[j];
				}
			} else if(params[0].toLowerCase()=="icon"&&!skipicon){
				icons = lines[i];
				skipicon=true;
				break;
			} else {
				if(post=="")post=params[j];
				else if(j==0)post += "\n" + params[j];
				else post += " " + params[j];
				skipicon=true;
			}
		}
	}
	title = title.toLowerCase();
	message.guild.createChannel(title,"text").then((channel) => {
		runflags(channel,icons.split(' '),perms);
		channel.send(post);
	});
	//add channel to category. Should go to Bug Reports; auto sorting by flags could be added to runflags() though...
}

function hasperms(member, permreq){
	if(member.roles.find("name","Founder")){
		return permreq<=P_BOTTEST;
	} else if(member.id==ID_ZORIA){
		return permreq<=P_OWNER;
	} else if(member.roles.find("name","Developers") || member.id==ID_VENROB){
		return permreq<=P_ADMIN;
	} else if(member.roles.find("name","Contributors")){
		return permreq<=P_CONTRIBUTOR;
	} else if(member.roles.find("name","Testers")){
		return permreq<=P_TESTER;
	} else if(member.roles.find("name","ZC Users")){
		return permreq<=P_ZC;
	} else return permreq<=P_DEFAULT;
}

function getperms(member){
	if(member.roles.find("name","Founder")){
		return P_BOTTEST;
	} else if(member.id==ID_ZORIA){
		return P_OWNER;
	} else if(member.roles.find("name","Developers") || member.id==ID_VENROB){
		return P_ADMIN;
	} else if(member.roles.find("name","Contributors")){
		return P_CONTRIBUTOR;
	} else if(member.roles.find("name","Testers")){
		return P_TESTER;
	} else if(member.roles.find("name","ZC Users")){
		return P_ZC;
	} else return P_DEFAULT;
}

client.on("ready", () => {
  console.log("BOT LAUNCHED SUCCESSFULLY!");
});

client.on("message", (message) => {
	//console.log(message.channel.id);
	try
	{
		//if(!message.author.bot)console.log("Message sent in channel: " + message.channel.name + ":" + message.channel.id);
		if (message.content.startsWith("!"))
		{
			//var roles = client.channels.get(pings).server.roles;
			var fullCmd = message.content.substring(1,message.content.length+1).toLowerCase();
			//message.channel.send("LOGGING TEST: " + message.author.tag + " sent: " + message.content + "\nIn channel named: `" + message.channel.name + "`");
			var params = fullCmd.split(' ');
			switch(params[0])
			{
				/*case "say":
					//console.log(message.member.roles.find("name",adminrole));
					if(message.member.roles.find("name",adminrole)){
						message.delete(1);
						message.channel.send(message.content.substring(5, message.content.length));
					} else {
						insufPerms(message,params[0]);
					}
					break;
				case "help":
					if(message.member.roles.find("name",adminrole)){
						client.channels.get(pings).send('@everyone' + ' ' + fullCmd.substring(7,fullCmd.length) + '\nPinged by: ' + message.author.tag);
						message.delete(1);
					} else {
						insufPerms(message,params[0]);
					}
					break;*/
				case "icon":
				case "addflags":
				case "addicon":
					if(hasperms(message.member,PR_ICON)/* && message.channel.permissionsFor(message.member).has("MANAGE_CHANNELS",false)*/){
						runflags(message.channel, params,getperms(message.member));
						message.delete(1);
					} else {
						insufPerms(message,params[0]);
					}
					break;
				case "ichelp":
				case "flaghelp":
				case "icons":
					if(hasperms(message.member,PR_ICHELP)){
						message.member.send(flaghelp());
						message.delete(1);
					} else {
						insufPerms(message,params[0]);
					}
					break;
				case "bug":
					if(hasperms(message.member,6)){
						newBugReport(message, message.content.substr(1),getperms(message.member));
						message.delete(1);
					} else {
						insufPerms(message,params[0]);
					}
					return;
				default:
					//message.delete(1);
			}
			client.channels.get(LOGGING).send("user " + message.author.tag + " sent command " + message.content + " in channel `" + message.channel.name + "`");
			//console.log("\"!" + fullCmd + "\" Completed for user " + message.author.tag);
		}
	} catch(err){console.log("Error: " + err.message)};
});

client.login("NDk1MDE2NDAwODM5MjQ1ODMx.Do8Z0A.kE4mhRHDhpMK6P7741cJY7w2UO8");