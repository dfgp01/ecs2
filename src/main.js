
//谨记数据驱动，分清业务配置和框架逻辑配置
// var options = Object.assign(data, {
//     keyDownHandler : keyDownHandler,
//     keyUpHanler : keyUpHanler,
//     collide : {
// 		useBox : true,
//         group : [
//         {
//             team1 : 1,
//             team2 : 2
//         }],
//         callback : BoxCallback
// 	}
// });
// options.tilemap.initHandler = initHandler;

class MyScene {
    onStart(){

    }
    onUpdate(dt = 0){
    }
}

(function (){
    console.log(options);
    Start(options, new MyScene());
})()