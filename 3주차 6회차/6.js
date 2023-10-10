//스타크래프트를 기반으로 만들어 보았습니다.
var mineral = 0;
var gas = 0;

function buildingPylon(){
    var cost = 100;
    return cost;
}

function buildingGateWay(){
    var cost = 150;
    return cost;
}

function mining(){
    var value = 8;
    mineral += value;
}

function refine(){
    var value = 4;
    gas += value;
}

function warning(){
    if(mineral < buildingPylon() || mineral < buildingStarGate()){
        console.log("광물이 모자랍니다.");
    }
}

function state(){
    mining();mining();mining();mining();
    refine();refine();
    console.log(mineral);
    console.log(gas);
}

state();
warning();