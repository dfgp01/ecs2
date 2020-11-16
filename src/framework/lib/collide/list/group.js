import { AddToCollection, CollectionIterator, CollectionIteratorCompare, RemoveFromCollection } from "../../../foundation/component/collection";
import { TEAM_MASK_CODE } from "../../../foundation/const";
import { NewLinkList } from "../../collection/linklist";
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
        this.pairs = NewLinkList();
        this.teams = [];
    }

    onInit(options = null){
        TEAM_MASK_CODE.forEach(code => {
            this.teams.push(NewLinkList());
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
            AddToCollection(this.pairs, new GroupPair(team1 | team2, t1, t2));
        });
    }

    addCollider(collider = null){
        for(let i=0; i<TEAM_MASK_CODE.length; i++){
            let flag = TEAM_MASK_CODE[i] & GetColliderTag(collider);
            if(flag){
                AddToCollection(this.teams[i], collider);
            }
        }
    }

    removeCollider(collider = null){
        for(let i=0; i<TEAM_MASK_CODE.length; i++){
            let flag = TEAM_MASK_CODE[i] & GetColliderTag(collider);
            if(flag){
                RemoveFromCollection(this.teams[i], collider.id);
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


/**
 * 基于分组的碰撞检测
 */
class GroupColliderSystem extends AbstractColliderSystem {
    onUpdate(dt = 0){
        CollectionIterator(this.container.pairs, pair => {
            //是否同组碰撞
            if(!pair.team2){
                //one team
                CollectionIteratorCompare(pair.team1, (collider1, collider2) => {
                    super.check(dt, collider1, collider2);
                });
            }else{
                //two team
                CollectionIterator(pair.team1, collider1 => {
                    CollectionIterator(pair.team2, collider2 => {
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
        sys = new GroupColliderSystem(new GroupColliderContainer());
    }
    return sys;
}

export{
    GetGroupColliderSystem
}