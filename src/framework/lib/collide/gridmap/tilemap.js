import { NewTileMap } from "../../gridmap/tilemap/base";
import { BaseGridMapColliderContainer } from "./base";
import { NewPos } from "../../../foundation/structure/geometric";
import { GetInt } from "../../../foundation/structure/math";

class TileMapColliderContainer extends BaseGridMapColliderContainer {
    onInit(options = null){
        let rows = options['rows'];
        let columns = options['columns'];
        let width = options['width'];
        let height = options['height'];
        this.gridmap = NewTileMap(rows, columns, GetInt(width / columns), GetInt(height / rows), NewPos());
        super.initGrids();
    }
}

function NewTileMapColliderContainer(){
    return new TileMapColliderContainer();
}

export{
    NewTileMapColliderContainer
}

