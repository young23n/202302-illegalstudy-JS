var input = '';

for(;;){
    input = '종료'// 사용자 입력칸 
    if(input === '종료') break;
    for(var i = 0; i <= input.length; i++){
        console.log(input[input.length - i]);
    }
}
