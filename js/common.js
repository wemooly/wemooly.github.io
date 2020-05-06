// JavaScript Document

/*ready事件*/
function bReady(fn){
	
	if(document.addEventListener){//高级
		document.addEventListener("DOMContentLoaded",fn,false);
	} else {
		document.attachEvent("onreadystatechange",function(){
			if(document.readyState == "complete"){
				fn &&fn();
			}	
			
		});
	}
};

/*ready---end*/
/*高度*/
function viewH(){
    var h = document.documentElement.clientHeight||document.body.clientHeight;
    return h;
}
/*获取元素*/
function $(id){
	return document.getElementById(id);
};
function getTag(obj,tag){
	
	return obj.getElementsByTagName(tag);
};
function getByClass(clsName,oParent){
    var arr=[];
    if(window.getElementsByClassName)return (oParent||document).getElementsByClassName(clsName);
    var obj = (oParent||document).getElementsByTagName("*");
    var res = new RegExp("(^|\\s+)"+clsName+"(\\s|$)")
    for(var i=0;i<obj.length;i++){
        if(res.test(obj[i].className)){
            arr.push(obj[i])
        } 
    }
    return arr;
};
/*添加删除判断切换类*/
	function addClass(obj,sName){
		var re=new RegExp('\\b'+sName+'\\b','g');
		if(!re.test(obj.className)){
			obj.className=obj.className+' '+sName;
		}
	}
	function removeClass(obj,sName){
		var re=new RegExp('\\b'+sName+'\\b','g');
		//obj.className=obj.className.replace(re,'');	
		obj.className=obj.className.replace(re,'').replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/\s+/g,' ');	
	}
	
	function hasClass(obj,sName){
		var re=new RegExp('\\b'+sName+'\\b','g');
		return re.test(obj.className);	
	}
	
	function toggleClass(obj,sName){
		hasClass(obj,sName)?removeClass(obj,sName):addClass(obj,sName);	
	}

/*滚轮的函数封装*/

function addMouseWheel(obj,fn){
	var down=true;
	if(navigator.userAgent.indexOf('Firefox')!=-1){
		obj.addEventListener('DOMMouseScroll',fnWheel,false)
	}else{
		obj.onmousewheel=fnWheel;
	}
	function fnWheel(ev){
		var oEvt=ev||event;
		if(oEvt.detail){
			down=oEvt.detail<0?true:false;
		}else{
			down=oEvt.wheelDelta>0?true:false;
		}
		fn(down);
		oEvt.preventDefault&&oEvt.preventDefault();
		return false;
	};
};
/*运动函数*/
//获取非行间样式
function getStyle(obj,attr){
	
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];
};
function move(obj,json,option){
	option=option||{};
	option.time=option.time||300;
	option.fn=option.fn||null;
	option.type=option.type||'linear';
	var start={};
	var dis={};
	for(key in json){
		start[key]=parseFloat(getStyle(obj,key));
		dis[key]=json[key]-start[key];
	}
	
	var count=Math.round(option.time/30);
	var n=0;
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		for(var key in json){
			switch(option.type){
				case 'linear':
				var a=n/count;
				var cur=start[key]+dis[key]*a;
				break;
				
				case 'easeIn':
				var a=n/count;
				var cur=start[key]+dis[key]*a*a*a;
				break;
				
				case 'easeOut':
				var a=1-n/count;
				var cur=start[key]+dis[key]*(1-a*a*a);
			}
			if(key=='opacity'){
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity='+cur*100+')';
			}else if(key=='scrollTop'){
				document.documentElement.scrollTop=document.body.scrollTop=cur;
			}else{
					
				obj.style[key]=cur+'px';
			}
		}	

		if(n==count){
			clearInterval(obj.timer)
			option.fn&&option.fn();
		}	
		
	},30)
	
};
/*运动框架结束*/
/*设置css3兼容模式样式*/
function sCss(obj, name, value){
	obj.style['Webkit'+name.charAt(0).toUpperCase()+name.substring(1)]=value;
	obj.style['Moz'+name.charAt(0).toUpperCase()+name.substring(1)]=value;
	obj.style['ms'+name.charAt(0).toUpperCase()+name.substring(1)]=value;
	obj.style['O'+name.charAt(0).toUpperCase()+name.substring(1)]=value;
	obj.style[name]=value;
};
/*随机函数*/
function rnd(n,m){
	return parseInt(n+Math.random()*(m-n));
}
/*获取位置*/
function getPos(obj){
	var l=0;
	var t=0;
	
	while(obj){
		 l += obj.offsetLeft;
		 t += obj.offsetTop;
		obj=obj.offsetParent;	//找div的定位父级
	}
	
	return {left:l, top:t}
}
//设置CSS  一下都是第五屏的
function setStyle(obj, json){
	if(obj.length){
		for(var i=0;i<obj.length;i++){
			setStyle(obj[i], json);
		}
	}else{
		if(arguments.length==2){	//json
			for(var i in json) setStyle(obj, i, json[i]);
		}else{
			switch(arguments[1].toLowerCase()){
				case 'opacity':
					obj.style.filter='alpha(opacity:'+arguments[2]+')';
					obj.style.opacity=arguments[2]/100;
					break;
				default:
					if(typeof arguments[2]=='number'){
						obj.style[arguments[1]]=arguments[2]+'px';
					}
					else{
						obj.style[arguments[1]]=arguments[2];
					}
					break;
			}
		}
	}
};
function setCss3(obj,opt){
    var s ="";
    try{
        for(var attr in opt){
            s = attr.charAt(0).toUpperCase()+attr.substring(1)
            obj.style["webkit"+s]=opt[attr];
            obj.style["moz"+s]=opt[attr];
            obj.style["o"+s]=opt[attr];
            obj.style[attr]=opt[attr];
        }
      }catch(e){

    }
}
function setStyle3(obj, name, value){
	obj.style['Webkit'+name.charAt(0).toUpperCase()+name.substring(1)]=value;
	obj.style['Moz'+name.charAt(0).toUpperCase()+name.substring(1)]=value;
	obj.style['ms'+name.charAt(0).toUpperCase()+name.substring(1)]=value;
	obj.style['O'+name.charAt(0).toUpperCase()+name.substring(1)]=value;
	obj.style[name]=value;
};
function flex(obj, cur, target, fnDo, fnEnd, fs, ms){
	var MAX_SPEED=16;	
	if(!fs)fs=6;
	if(!ms)ms=0.75;
	var now={};
	var x=0;	//0-100	
	if(!obj._flex_v)obj._flex_v=0;	
	if(!obj._last_timer)obj._last_timer=0;
	var t=new Date().getTime();
	if(t-obj._last_timer>20){
		fnMove();
		obj._last_timer=t;
	}	
	clearInterval(obj.timer);
	obj.timer=setInterval(fnMove, 20);	
	function fnMove(){
		obj._flex_v+=(100-x)/fs;
		obj._flex_v*=ms;
		if(Math.abs(obj._flex_v)>MAX_SPEED)obj._flex_v=obj._flex_v>0?MAX_SPEED:-MAX_SPEED;		
		x+=obj._flex_v;		
		for(var i in cur){
			now[i]=(target[i]-cur[i])*x/100+cur[i];
		}		
		if(fnDo)fnDo.call(obj, now);		
		if(Math.abs(obj._flex_v)<1 && Math.abs(100-x)<1){
			clearInterval(obj.timer);
			if(fnEnd)fnEnd.call(obj, target);
			obj._flex_v=0;
		}
	}
};
function buffer(obj, cur, target, fnDo, fnEnd, fs){ 
     if(!fs)fs=6;
     var now={};
     var x=0;
     var v=0;
     if(!obj._last_timer)obj._last_timer=0;
     var t=new Date().getTime();
     if(t-obj._last_timer>20){
           fnMove();
           obj._last_timer=t;
     }
     clearInterval(obj.timer);
     obj.timer=setInterval(fnMove, 20);
     function fnMove(){
         	v=Math.ceil((100-x)/fs);    
         	x+=v;   
         	for(var i in cur){
              	now[i]=(target[i]-cur[i])*x/100+cur[i];
         	}   
         	if(fnDo)fnDo.call(obj, now);    
         	if(Math.abs(v)<1 && Math.abs(100-x)<1){
              	clearInterval(obj.timer);
              	if(fnEnd){
                	fnEnd.call(obj, target);
              	}
          }
     }
};
function linear(obj, cur, target, fnDo, fnEnd, fs){
	if(!fs)fs=50;
	var now={};
	var x=0;
	var v=0;	
	if(!obj._last_timer)obj._last_timer=0;
	var t=new Date().getTime();
	if(t-obj._last_timer>20){
		fnMove();
		obj._last_timer=t;
	}	
	clearInterval(obj.timer);
	obj.timer=setInterval(fnMove, 20);	
	v=100/fs;
	function fnMove(){
		x+=v;		
		for(var i in cur){
			now[i]=(target[i]-cur[i])*x/100+cur[i];
		}		
		if(fnDo)fnDo.call(obj, now);		
		if(Math.abs(100-x)<1){
			clearInterval(obj.timer);
			if(fnEnd)fnEnd.call(obj, target);
		}
	}
}
function stop(obj){
	clearInterval(obj.timer);
}


