       
// document.addEventListener("DOMContentLoaded",(e)=>{
//     let circle = document.querySelectorAll('.circle') ;
//     circle.forEach(function(progress){
//         let degree = 0 ;
//         var targetDegree = parseInt(progress.getAttribute('data-degree')) ;
//         let color = progress.getAttribute('data-color') ;
//         let number = progress.querySelector('.number') ;

//         var interval = setInterval(()=>{
//             degree += 1 ;
//             if(degree > targetDegree){
//                 clearInterval(interval) ;
//                 return ;
//             }
//             progress.style.background = `conic-gradient(${color} ${degree}%, #222 0%)` ;
//             number.innerHTML = degree + '<span>%</span>' ;
//             number.style.color =color ;
//         },50)
//     })
// })


document.getElementById('height').addEventListener('input', calculateBMI); 
document.getElementById('weight').addEventListener('input', calculateBMI);
 function calculateBMI() { 
    const height = document.getElementById('height').value; 
    const weight = document.getElementById('weight').value; 
    if(height>0 || weight>0){
        const bmi = (weight / ((height / 100) * (height / 100))).toFixed(2);
        document.getElementById('bmiresult').innerText = `${bmi}`;
    }
    else if (height > 0 && weight > 0) { 
        const bmi = (weight / ((height / 100) * (height / 100))).toFixed(2);
        document.getElementById('bmiresult').innerText = `${bmi}`;
     }  
}



fetchheart() ;
async function fetchheart(){
    
    try{

        let heartrate = document.querySelector('#heart') ;
        let heartratePercentage = document.querySelector('#heartrate_percentage') ;

        let spo2rate = document.querySelector('#spo2') ;
        let spo2Percentage = document.querySelector('#spo2_percentage') ;
        
       // fetch('http://localhost:9080/api/data/getall').then(val=>val.json()).then(val=>console.log(val))
        
       let response = await fetch('http://localhost:9080/api/data/getall'); 
       let val = await response.json();
       console.log(val) ;   

       const length = Object.keys(val).length;
        // Subtract 1 from the length 
       const recentId = length - 1;

        // for rendering heart rate
        heartrate.innerText = `${val[recentId]?.heartrate}`; 
        let heartratevaluePercentage = Math.round(heartrate.innerText) ;
        heartratePercentage.innerText= `${heartratevaluePercentage}%` ;

       // for rendering spo2 rate
       spo2rate.innerText = `${val[recentId]?.spo2}`; 
       let spo2valuePercentage = Math.round(spo2rate.innerText) ;
       spo2Percentage.innerText= `${spo2valuePercentage}%` ; 


    }
    catch(err){
        console.log('error found',err) ;
    }

    ;
    

}

