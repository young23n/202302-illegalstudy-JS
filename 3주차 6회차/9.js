//스타크래프트를 기반으로 만들어 보았습니다.
let mineral = 0;
let gas = 0;
// 미네랄과 가스 저장소가 중복되어선 안됨

function buildingPylon(){
    const cost = 100;//소모되는 가격이 재할당, 변경되면 안됨
    return cost;
}

function buildingGateWay(){
    const cost = 150;
    return cost;
}

function mining(){
    const value = 8;//  마찬가지로 채취했을 때 들어오는 값이 들쭉날쭉해선 안됨
    mineral += value;
}

function refine(){
    const value = 4;
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