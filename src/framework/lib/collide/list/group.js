import { TEAM_MASK_CODE } from "../../../foundation/const";
import { AddToList, ListIterator, ListIteratorCompare, RemoveFromList } from "../../../foundation/container/list";
import { NewLink } from "../../list/linklist";
import { AbstractColliderContainer, AbstractColliderSystem, GetColliderTag } from "../base";


/**
 * 碰撞对
 */
class GroupPair {
    constructor(id = 0, team1 = null, team2 = null){
        this.id = id;     //link use
        this.team1 = team1;
        this.team2 = team2;
    }
}

class GroupColliderContainer extends AbstractColliderContainer {
    constructor(){
        super();
        this.pairs = null;
        this.teams = null;
    }

    init(options = null){
        this.pairs = NewLink();
        this.teams = [];
        TEAM_MASK_CODE.forEach(code => {
            this.teams.push(NewLink());
        });

        let ps = options['pairs'];   //[[1, 2], [2, 4], [1, 8]...]
        ps.forEach(pArr => {
            let team1 = pArr[0];
            let team2 = pArr[1];
            if(team1==0 || team2==0){
                return;
            }
            let t1 = getTeam(this.teams, team1);
            let t2 = team1 == team2 ? null : getTeam(this.teams, team2);
            AddToList(this.pairs, new GroupPair(team1 | team2, t1, t2));
        });
    }

    addCollider(collider = null){
        for(let i=0; i<TEAM_MASK_CODE.length; i++){
            let flag = TEAM_MASK_CODE[i] & GetColliderTag(collider);
            if(flag){
                AddToList(this.teams[i], collider);
            }
        }
    }

    removeCollider(collider = null){
        for(let i=0; i<TEAM_MASK_CODE.length; i++){
            let flag = TEAM_MASK_CODE[i] & GetColliderTag(collider);
            if(flag){
                RemoveFromList(this.teams[i], collider.id);
            }
        }
    }
}

function getTeam(teams = null, code = 0){
    for(let i=0; i<TEAM_MASK_CODE.length; i++){
        if(TEAM_MASK_CODE[i] == code){
            return teams[i];
        }
    }
    return null;
}

var container = null;
function GetGroupColliderContainer(){
    if(!container){
        container = new GroupColliderContainer();
    }
    return container;
}

/**
 * 基于分组的碰撞检测
 */
class GroupColliderSystem extends AbstractColliderSystem {
    onUpdate(dt = 0){
        ListIterator(container.pairs, pair => {
            //是否同组碰撞
            if(pair.tag == pair.team1){
                //one team
                ListIteratorCompare(pair.team1, (collider1, collider2) => {
                    super.check(dt, collider1, collider2);
                });
            }else{
                //two team
                ListIterator(pair.team1, collider1 => {
                    ListIterator(pair.team2, collider2 => {
                        super.check(dt, collider1, collider2);
                    });
                })
            }
        });
    }
}

var sys = null;
function GetGroupColliderSystem(){
    if(!sys){
        sys = new GroupColliderSystem();
    }
    return sys;
}

export{
    GetGroupColliderContainer, GetGroupColliderSystem
}