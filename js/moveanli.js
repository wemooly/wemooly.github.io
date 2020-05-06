// JavaScript Document
bReady(function(){
//小滚轮
	(function(){
		
		var oWarp=document.getElementById('warpGunlun');
		var aHead=oWarp.children[0].children;//卡头
		var aContent=oWarp.children[1].getElementsByTagName('ul');//卡体
		var curUl=aContent[0];
		//1.选项卡
		for(var i=0;i<aHead.length;i++){
			(function(index){
				aHead[i].onclick=function(){
					for(var i=0;i<aHead.length;i++){
						aHead[i].className='';
						aContent[i].className='';	
					}
					this.className='active';
					aContent[index].className='active';
					curUl=aContent[index];	//更新外面的ul
					oBar.style.top=Math.abs(curUl.offsetTop/(curUl.offsetHeight-oContentParent.offsetHeight)*(oBarParent.offsetHeight-oBar.offsetHeight))+'px';
				};
			})(i);	
		}
		
		var oBar=document.getElementById('markgunlun');
		var oBarParent=document.getElementById('div1gunlun');
		var oContentParent=document.getElementById('maingunlun');
		//2.拖拽oBar
		oBar.onmousedown=function(ev){
			var oEvt=ev||event;
			var disY=oEvt.clientY-oBar.offsetTop;
			document.onmousemove=function(ev){
				var oEvt=ev||event;
				var t=oEvt.clientY-disY;//计算
				
				toScroll(t);
				
					
			};
			document.onmouseup=function(){
				document.onmouseup=document.onmousemove=null;
				oBar.releaseCapture&&oBar.releaseCapture();	
			};	
			oBar.setCapture&&oBar.setCapture();
			return false;
		};
		
		//3.上下
		var oUp=document.getElementById('up');
		var oDown=document.getElementById('down');
		var timer=null;
		oDown.onmousedown=function(){
			timer=setInterval(function(){
				var t=oBar.offsetTop+10		//计算
				toScroll(t);	
			},30);	
		};
		oUp.onmousedown=function(){
			timer=setInterval(function(){
				var t=oBar.offsetTop-10		//计算
				toScroll(t);	
			},30);	
		};
		oDown.onmouseup=oUp.onmouseup=function(){
			clearInterval(timer);	
		};
	
		function toScroll(t){
			//限定
			if(t<0) t=0;
			if(t>oBarParent.offsetHeight-oBar.offsetHeight)
				t=oBarParent.offsetHeight-oBar.offsetHeight;
				
			oBar.style.top=t+'px';//使用
	
			var scale=oBar.offsetTop/(oBarParent.offsetHeight-oBar.offsetHeight);
			
			var d=curUl.offsetHeight-oContentParent.offsetHeight;
			curUl.style.top=-scale*d+'px';//使用	
		}
		
		//4.滚轮
		addMouseWheel(oWarp,function(down){
			//5.控制滚动
			var t=oBar.offsetTop		//计算
			if(down){
				t+=10;	
			}else{
				t-=10;
			}
			toScroll(t);
		});
		function addMouseWheel(obj,fn){
			var down=false;
			if(navigator.userAgent.indexOf('Firefox') != -1){
				//ff
				obj.addEventListener('DOMMouseScroll',fnWheel,false);	
			}else{
				//other
				obj.onmousewheel=fnWheel;
			}
			
			function fnWheel(ev){
				var oEvt=ev||event;
	
				if(oEvt.detail){
					down=oEvt.detail>0?true:false;
				}else{
					down=oEvt.wheelDelta<0?true:false;	
				}
				fn(down);
				oEvt.preventDefault&&oEvt.preventDefault();
				return false;
			}
		};
	})()	
	
//换一换

	
	
//结束
});

	