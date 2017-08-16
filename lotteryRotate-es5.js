function LotteryRotate(opt){
	this.obj = opt.obj;//大转盘外层盒子
	this.btn = opt.btn;//转盘按钮
	this.listCont = opt.listCont;//转盘里的奖品名称
	this.num = opt.listCont.length;//奖品数量
	this.pre = opt.preRotate;//预旋转圈数
	this.chance = opt.chance;//抽奖次数
	this.rotateTime = opt.rotateTime/1000;//转盘抽奖的旋转总时间，单位是毫秒
	this.rem = opt.rem;//canvas的大小，移动端布局，直接写数字，不用带单位
	this.eType = opt.eType;//按钮的事件类型
	this.isRotate=true;
	this.pos = 0;//转盘初始的位置在数组里的索引
	this.init();
}
	
LotteryRotate.prototype.init=function(){
	var canvas=document.createElement('canvas');
	if(!canvas || !canvas.getContext)alert('您的浏览器不支持此转盘游戏！')
	var lottery_list=document.createElement('ul');
	this.obj.style.cssText = 'position: relative;-webkit-transition: -webkit-transform '+this.rotateTime+'s ease;transition: transform '+this.rotateTime+'s ease;';
	lottery_list.style.cssText = 'position: absolute;left: 0;top: 0;right: 0;bottom:0;list-style: none;text-align: center;';
	var html=document.documentElement || document.body;
	var hW=html.getBoundingClientRect().width;
	var cW = hW/7.5*this.rem;
	//动态改变canvas的宽高，达到自适应，因为ctx方法里不允许带单位，所以无法用rem转换
	canvas.setAttribute('width',cW);
	canvas.setAttribute('height',cW);
	var ctx = canvas.getContext('2d');
	for (var i = 0; i < this.num; i++) {
	    // 保存当前状态
	    ctx.save();
	    // 开始一条新路径
	    ctx.beginPath();
	    // 位移到圆心，下面需要围绕圆心旋转
	    ctx.translate(cW/2,cW/2);
	    // 从(0, 0)坐标开始定义一条新的子路径
	    ctx.moveTo(0, 0);
	    // 旋转弧度,需将角度转换为弧度,使用 degrees * Math.PI/180 公式进行计算。
	   ctx.rotate((i*360/this.num-180/this.num-90)* Math.PI/180);
	    // 绘制圆弧
	   ctx.arc(0, 0,cW/2, 0,  2 * Math.PI / this.num, false);
	    if (i % 2 == 0) {
	        ctx.fillStyle = '#fff';
	    }else{
	        ctx.fillStyle = '#cde59d';
	    }
	    // 填充扇形
	    ctx.fill();
	    // 绘制边框
	    ctx.lineWidth = 0.5;
	    ctx.strokeStyle = '#f48d24';
	    ctx.stroke();
	    // 恢复前一个状态
	    ctx.restore();
	    var li=document.createElement('li');
	    li.innerHTML = this.listCont[i];
	    li.style.cssText = 'position: absolute;top:0;left:0;width: 100%;padding-top:0.2rem;transform-origin: 50% 2.025rem;-webkit-transform-origin: 50% 2.025rem;font-size: .3rem;color:red;';
		li.style.webkitTransform='rotate('+(-(360/ this.num)*i)+'deg)';
		lottery_list.appendChild(li);
	}
	this.obj.appendChild(canvas);
	this.obj.appendChild(lottery_list);
}
LotteryRotate.prototype.rotate=function(opt){
	var ajax =opt.ajax;
	var callback = opt.callback;
	var degree=0;
	var timer =null;
	var target;
	var $this = this;
	$this.btn.addEventListener($this.eType,()=>{
		if($this.isRotate){
			if($this.chance>=1){
				$this.isRotate = false;
				if(ajax){
					target = ajax($this.listCont);
				}else{
					var random = Math.ceil(Math.random()*$this.num);
					target = random;
				}
				//计算并保留当前的索引位置
				console.log('上一次索引是:'+$this.pos);
				$this.pos+target>=$this.num?$this.pos=($this.pos+target-$this.num):$this.pos += target;
				console.log('当前索引是:'+$this.pos);
				degree += 360/this.num*target+360*$this.pre;
				$this.obj.style.transform='rotate('+degree+'deg)';
				$this.obj.style.webkitTransform='rotate('+degree+'deg)';
				$this.chance--;
				timer = setTimeout(()=>{
					$this.isRotate=true;
					callback&&callback($this.listCont[$this.pos]);
				},$this.rotateTime*1000);
			}else{
				clearTimeout(timer);
				alert('您抽奖次数已用完');
			}
		}
	})
}
