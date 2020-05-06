// JavaScript Document
//获取类
function getByClass(oParent,sName){
	if(oParent.getElementsByClassName){
		return oParent.getElementsByClassName(sName);
	}else{
		var allEle=oParent.getElementsByTagName("*");
		var result=[]
		for(var i=0;i<allEle.length;i++){
			var arr=allEle[i].className.split(' ');
			for(var j=0;j<arr.length;j++){
				if(arr[j]==sName){
					result.push(arr[j]);
					break;
				}
			}
		}
		
		return result;
	}	
	
};
//获取非行间样式
function getStyle(obj, name)
{
	return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj, false)[name];
};
function rnd(n,m){
		return parseInt(n+Math.random()*(m-n));
};
function getPos(obj){
		var l=0;
		var t=0;
		if(obj){
			l+=obj.offsetLeft;
			t+=obj.offsetTop;
			obj=obj.offsetParent;//注意赋值的是定位父级
		}
		return {left:l,top:t}
};
//设置CSS
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