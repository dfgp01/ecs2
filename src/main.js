import data from './data';
import { GetData, GetDefaultCamera, GetSpriteFrame } from './framework/director/service/resource';
import { DrawRect, DrawLine, DrawCircle } from './framework/director/render';
import { Start } from './framework/director/boot';
import { GridMapIterator, GetGridWidth, GetHalfGridWidth, GetGridData } from './framework/foundation/container/gridmap';
import { GetTileGridCenter } from './framework/lib/grid/tilemap/base';
import { NewRect, NewPos, NewVec } from './framework/foundation/structure/geometric';
import { GetCameraHeight, GetCameraWidth } from './framework/lib/camera/base';
import { AddDisplayer } from './framework/lib/view/utils';
import { NewEntityId } from './framework/foundation/component/ecs';
import { GetRenderComponent } from './framework/lib/view/component/render';
import { SetUnitPos } from './framework/lib/pos/component';

//谨记数据驱动，分清业务配置和框架逻辑配置
var options = Object.assign(data, {
    touchOnCallback : touchOnCallback,
    touchOverCallback : touchOverCallback,
});

function touchOnCallback(x = 0, y = 0){
    console.log(x, y);
}
function touchOverCallback(x = 0, y = 0){

}

class MyScene {
    onStart(){
        let tilemap = GetData("tile1");
        GridMapIterator(tilemap, grid => {
            let data = GetGridData(grid);
            let pos = GetTileGridCenter(tilemap, grid);
            initDisplay(data, pos);
        });
        //draw();
    }
    onUpdate(dt = 0){
        draw();
    }
}

function draw(){
    drawTile();
    drawCenter();
}

function drawCenter(){
    DrawCircle(NewPos(), 3);
    DrawRect(NewPos(), NewRect(
        GetCameraWidth(
            GetDefaultCamera()),
        GetCameraHeight(
            GetDefaultCamera())));
}

function drawTile(){
    let tilemap = GetData("tile1");
    GridMapIterator(tilemap, grid => {
        let pos = GetTileGridCenter(tilemap, grid);
        let halfWidth = GetHalfGridWidth(grid);
        let width = GetGridWidth(grid);
        //console.log("g[%d, %d]: (%d, %d), %d %d", grid.rowIndex, grid.colIndex, pos.x, pos.y, halfWidth, width);
        //DrawRect(pos, NewRect(width, width));
        testIso(pos, halfWidth);
    });
}

function testIso(pos = null, halfWidth = 0){
    let pos1 = NewPos(pos.x - halfWidth, pos.y - halfWidth);
    let pos1iso = getIso(pos1);
    let pos2 = NewPos(pos.x + halfWidth, pos.y - halfWidth);
    let pos2iso = getIso(pos2);
    let pos3 = NewPos(pos.x - halfWidth, pos.y + halfWidth);
    let pos3iso = getIso(pos3);
    let pos4 = NewPos(pos.x + halfWidth, pos.y + halfWidth);
    let pos4iso = getIso(pos4);
    // console.log("p1:(%d, %d), iso:(%d, %d)", pos1.x ,pos1.y, pos1iso.x, pos1iso.y);
    // console.log("p2:(%d, %d), iso:(%d, %d)", pos2.x ,pos2.y, pos2iso.x, pos2iso.y);
    // console.log("p3:(%d, %d), iso:(%d, %d)", pos3.x ,pos3.y, pos3iso.x, pos3iso.y);
    // console.log("p4:(%d, %d), iso:(%d, %d)", pos4.x ,pos4.y, pos4iso.x, pos4iso.y);

    // DrawLine(pos1iso, pos2iso);
    // DrawLine(pos2iso, pos3iso);
    // DrawLine(pos3iso, pos4iso);
    // DrawLine(pos4iso, pos1iso);

    DrawLine(pos1iso, pos2iso);
    DrawLine(pos2iso, pos4iso);
    DrawLine(pos4iso, pos3iso);
    DrawLine(pos3iso, pos1iso);
}

function getIso(pos = null){
    return NewPos(
        (pos.x - pos.y),
        (pos.x + pos.y) * 0.5
    );
}

/**
 * "1" : {
			"display" : {
				"isometric" : true,
				"frame" : "building1"
			}
		},
 */
function initDisplay(data = null, pos = null){
    let d = data['display'];
    if(!d){
        return;
    }
    let id = NewEntityId();
    GetRenderComponent(id, {isometrics:true});
    SetUnitPos(id, pos.x, pos.y);
    AddDisplayer(
        GetSpriteFrame(
            d['frame']), id, 1, 0,
            NewVec(
                d['offset-x'], d['offset-y']
            ));
}



(function (){
    console.log(options);
    Start(options, new MyScene());
})()