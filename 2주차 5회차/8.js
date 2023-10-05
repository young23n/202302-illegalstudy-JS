var km = 0;
var step = 0;
var cal = 0;
var value = 1000;

function calculateKm(callback) {
    km = step * 0.0007;
    callback()
}

function calculateCal(callback) {
    cal = km * 1.7;
    callback()
}
function increaseStep(callback){
    step += value;
    callback()
}

function printResult() {
    increaseStep(function(){
        calculateKm(function(){
            calculateCal(function() {
                console.log("칼로리:", cal);
                console.log("km:", km);
                console.log("걸음:", value);
            });
        });
    });
}

printResult();