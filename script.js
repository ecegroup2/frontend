





















let heartrate = document.querySelector('.heartrate_result') ;
let heartrate_percentage = document.querySelector('#heartrate_percentage') ;

let spo2 = document.querySelector('.spo2_result') ;
let spo2_percentage = document.querySelector('#spo2_percentage') ;


const form = document.querySelector('.bmi') ;

form.addEventListener('submit',(e)=>{
    e.preventDefault() ;

    const height =  parseInt(document.querySelector('#height').value) ;
    const weight =  parseInt(document.querySelector('#weight').value) ;
    const results = document.querySelector('#results') ;
    const condition = document.querySelector('#condition') ;

    if((height==='' || height<0 || isNaN(height)) && (weight==='' || weight<0 || isNaN(weight))){
        results.innerHTML = `Please give valid height-weight, your height ${height} and weight ${weight}` ;
    }
    else if(height==='' || height<0 || isNaN(height)){
        results.innerHTML = `Please give a valid height, your height is ${height}` ;
    }
    else if(weight==='' || weight<0 || isNaN(weight)){
        results.innerHTML = `Please give a valid weight, your weight is ${weight}` ;
    }
    else{
        const bmi = (weight / ((height * height) / 10000)).toFixed(2);
        results.innerHTML = `<span>Your bmi is ${bmi}</span>` ;
        if(bmi<18.6){
            condition.innerHTML = `you are Underweight` ;
        }
        else if(bmi>=18.6 && bmi<=24.9){
            condition.innerHTML = `you are at Normal Range` ;
        }
        else if(bmi>24.9){
            condition.innerHTML = `you are OverWeight`
        }
    }

});



