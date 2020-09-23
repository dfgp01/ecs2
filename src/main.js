import data from './data';
import { StartTest } from './framework/director/utils/boot';
import { MainLoop, Starter } from './game/service';

//谨记数据驱动，分清业务配置和框架逻辑配置
var options = data;

class MyScene {
    onStart(){
        Starter(options);
    }
    onUpdate(dt = 0){
        MainLoop();
    }
}

(function (){
    console.log(options);
    StartTest(options, new MyScene());
})()