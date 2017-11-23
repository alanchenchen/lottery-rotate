# lottery-rotate
## 适配移动端rem布局的canvas大转盘抽奖插件
> Author：Alan Chen
> E-mail: 739709491@qq.com
##  * `使用说明`
* 1.目前给出了ES5和ES6两种语法的版本，有后缀名es5为es5版本，可以直接用script标签引入，es6版本必须使用import引入，因为插件使用了export导出模块。
* 2.使用该插件十分简单，无需导入其余css，不依赖任何插件，只需先初始化一个实例，es5版本构造函数名必须为LotteryRotate，例如： `new LotteryRotate()` 而es6版本可以根据import引入模块自定义命名，因为插件是export default导出。
##  * `配置项` `Object`
* 构造器传入的是一个对象，所有参数都作为对象的键值对。
* `obj` 【`DOM`】 大转盘最外层盒子，插件挂载的dom结构，例如： `document.querySelector('.lottery_box')`。
* `eType` 【`String`】 抽奖按钮的事件类型，不需要加前缀on，例如： `touchstart`。
* `rotateTime` 【`Number`】 抽奖一次的总时间，单位是毫秒，例如： `3000`。
* `preRotate` 【`Number`】 中奖前预旋转的圈数，提高用户体验，必须是正整数，例如： `6`。
* `chance` 【`Number`】 抽奖次数，次数不足再触发事件会弹窗提示，必须是正整数，例如： `1`。
* `rem` 【`Number`】 canvas的宽和高，此处传入的是rem布局中的rem值，例如： `4.05`。
* `btn` 【`DOM`】 抽奖按钮的dom结构，例如： `document.querySelector('.btn')`。
* `listCont` 【`Array | String`】 奖品名称，奖品必须是字符串，写入数组里，例如： `['1元话费','2元话费','3元话费','4元话费','5元话费','6元话费']`。
##  * `方法调用` `Object`
* 插件提供了一个方法 `rotate`，而且必须在实例初始化之后调用，函数里传入的是一个对象，所有参数作为对象的键值对。
  * `ajax(list)` `Function` `可选` 。请求后台的回调函数，用来获取中奖的奖项，必须return一个数字，数字和数组中的索引对应，默认有一个参数 `list` ，`list` 是奖品数组 `listCont`，如果不传入ajax回调函数，插件默认会调用随机数抽奖
  * `callback(award)` `Function`。抽奖成功的回调函数，默认有一个参数 `award` ，`award` 是奖品名称
##  * `使用案例` `demo`
```javascript
let Lottery=new LotteryRotate({
	obj:document.querySelector('.lottery_box'),
	eType:'touchstart',
	rotateTime:3000,//抽奖一次总旋转时间
	preRotate:6,//预旋转圈数
	chance:1,//可抽奖次数
	rem:4.05,
	btn:document.querySelector('.btn'),
	listCont:['10元话费','2元话费','1元话费','10元话费','2元话费','1元话费']
});
Lottery.rotate({
	//请求后台的函数，必须return一个数字，数字和数组中的索引对应，a是奖品数组listCont
	ajax:(list)=>list.indexOf('1元话费'),
	//抽奖成功的函数，num为中奖后的奖品名称，是字符串
	callback:(award)=>alert(`恭喜你获得${award}`);
});
