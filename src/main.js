import options from './data';
import { GetData } from './framework/director/resource';
import { DrawRect } from './framework/director/render';
import { Start } from './framework/director/boot';
import { GridMapIterator, GetGridWidth, GetHalfGridWidth } from './framework/foundation/container/gridmap';

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
        drawTile();
    }
    onUpdate(dt = 0){
        //drawTile();
    }
}

function drawTile(){
    let tilemap = GetData("tile1");
    GridMapIterator(tilemap, grid => {
        let pos = GetTileGridCenter(grid);
        let halfWidth = GetHalfGridWidth(grid);
        let width = GetGridWidth(grid);
        DrawRect(pos, width, width);
    });
}

(function (){
    console.log(options);
    Start(options, new MyScene());
})()