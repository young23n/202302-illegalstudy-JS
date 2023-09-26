function deepCopy(obj) {
    if (obj === null || typeof obj !== "object") {//들어온 값이 null이거나 객체가 아니면 그대로 돌려보냄 
        return obj;
    }
    let copy = {};
    for (let key in obj) {// 객체 내부의 속성 값 하나씩 가져옴
        copy[key] = deepCopy(obj[key]); //재귀를 통해 속성 내부의 속성 까지 가져옴 마지막 속성일 경우 위의 if문이 null을 감지하고 돌려보냄
    }
    return copy;
}
const obj = {
    a: 1,
    b: { c: 2,},
    func: function () { return this.a; },
};//객체 생성
const newObj = deepCopy(obj);
newObj.b.c = 3;
console.log(obj);
console.log(obj.b.c === newObj.b.c);
