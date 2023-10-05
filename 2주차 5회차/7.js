function factorial(n){
    if(n === 0){ //n이 0이 될때 재귀탈출 및 0을 곱하지 않도록 1로 변환
        return 1; 
    }
    else{
        return n * factorial(n-1); // 재귀이용, n이 3일때 ->  3 * (2 * (1 * (0 변환및 탈출 -> 1))) 이러한 형식으로 작동 결과는 6
    }
}
console.log(factorial(3));