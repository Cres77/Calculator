
let num1 = "0"
let num2 = ""
let operators = ""
let solution=""

let solutionActive = false
let operatorActive = false
let num2Active = false
let decimalActive = false

const display = document.querySelector(".displayScreen")
display.textContent = num1 + operators + num2

const numberSelect = document.querySelectorAll(".numbers")
    numberSelect.forEach((number)=>{
        number.addEventListener("click",()=>{
            firstOrSecond(number.textContent)
            decimalCall1()
            decimalCall2()
        })
    })
function firstOrSecond(num){
        if(operatorActive == false && num1=="0" ){
            num1 = num
            }
        else if(operatorActive == false && solutionActive == true){
            num1 += num
        }
        else if(operatorActive == false && num1!="0"){
            num1 += num
            }
        else{
            num2 += num
            num2Active= true
            } 
    updateDisplay()         
}  

//Decimals
const decimal = document.querySelector("#decimal")
function decimalCall1(){
    decimal.addEventListener('click', function decimalPlacement1() {
        if(decimalActive==false && num2Active==false){
            num1+="."
            updateDisplay() 
            decimalActive=true 
            this.removeEventListener('click', decimalPlacement1);  
        }
});
}
function decimalCall2(){
    decimal.addEventListener('click', function decimalPlacement2() {
        if(decimalActive==false){
        num2+= "."
        updateDisplay()
        decimalActive=true
        this.removeEventListener('click', decimalPlacement2);
        }
});
}

//Operators
const operatorSelection = document.querySelectorAll(".operators")
    operatorSelection.forEach((operator)=>{
        operator.addEventListener("click",()=>{
            operatorActive=true
            if(num2Active==false){
                decimalActive=false
            }  
            if(num2Active== true){
                nextSolution=operate(num1,operators,num2)
                num1=nextSolution
                operators=operator.textContent
                num2=""
                updateDisplay()
            }
            else if(solutionActive==true && num2Active==false){
                operators=operator.textContent
                num2= ""
                updateDisplay()
            }
            else{
                operators=operator.textContent
                updateDisplay()
            }
        })
    })

//equals
const equal = document.querySelector("#equal")
    equal.addEventListener("click",()=>{
        if(num2 == ""||operators==""){
            return
        }
        solution=operate(num1,operators,num2)
        rounded = (Math.round(solution*100000)/100000).toFixed(5)
        solutionActive=true
        num2Active= false
        num2=""
        operators=""
            if(solution!=rounded){
                num1=rounded
                decimalActive=true
            }
            else{
                num1 = solution
                decimalActive= false
            }
        updateDisplay()
    })


//fully clears board
const clear = document.querySelector("#clear")
clear.addEventListener("click",()=>{
    num1=""
    operators=""
    num2=""
    solution=""
    num2Active= false
    solutionActive = false
    operatorActive = false 
    decimalActive= false
    updateDisplay()
})

//backspace
const backspace = document.querySelector("#backspace")
backspace.addEventListener("click",function backspace(){
    if(num1 != "" && operators == ""){
        stringNum = num1.toString()
        num1Length = num1.length
        NewNum = num1.slice(0,(num1Length-1))
        num1=NewNum
        updateDisplay()
    }
    else if(num2 == "" && operators!=""){
        operators=""
        updateDisplay()
    }
    else if(num2 != "" && operators !=""){
        stringNum = num2.toString()
        num2Length = num2.length
        NewNum = num2.slice(0,(num2Length-1))
        num2=NewNum
        updateDisplay()
    } 
})

//updates display
function updateDisplay(){
    if(num1 == ""){
        num1 = 0
    }
    const display = document.querySelector(".displayScreen")
    display.textContent = num1 + " " + operators + " " + num2
    
}

//choose operation 
function operate(num1, operator, num2){
    if(operator == "+"){
        return parseFloat(num1) + parseFloat(num2)
    }
    else if(operator == "-"){
        return num1 - num2
    }
    else if(operator == "/"){
        if(num2=="0"){
            const display = document.querySelector(".displayScreen")
            return display.textContent = "Come on Bruh"
        }
        return num1 / parseFloat(num2)
    }
    else if(operator=="x"){
        return num1 * num2
    } 
}