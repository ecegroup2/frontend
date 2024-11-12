       
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
       console.log('val',val) ;   

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
    };
    
}

// for rendering data in table in UI 
datereposrtlist() ;
async function datereposrtlist(){
    try { 
       
        const response = await fetch('http://localhost:9080/api/data/getByDate?date=2024-11-13'); 
        const data = await response.json(); 
        const dataList = []; 
        dataList.push(...data); 
        console.log('datalist',dataList); 


        document.getElementById('date').addEventListener('change', function() {  

        // Clear the table body before adding new rows 
        const tableBody = document.getElementById('data-table').querySelector('tbody');
        tableBody.innerHTML = '';

    
        for (let i = 1; i <= dataList.length; i++) { 
           console.log(dataList[dataList.length - i]); 
            
            const dataString = dataList[dataList.length - i] ;
            console.log('data',dataString) ;

        // rendering date in UI
            const selectedDate = this.value;
            console.log(selectedDate);
            
            // Create a new table row and cell
            const newRow = document.createElement('tr');
            const newCell = document.createElement('td');
            newCell.innerHTML = selectedDate;
            newRow.appendChild(newCell);
        
            // Append the new row to the table body
            document.getElementById('data-table').querySelector('tbody').appendChild(newRow);


            // rendering time in UI
            let id = dataString?.userId ;
            console.log('id',id) ;
            hms = id%1000000 ;
            dis="" ;
            while(hms>0){
                dis = `${hms%100}`+dis ;
                hms=Math.floor(hms/100) ;
                dis=':'+dis ;
            }
            dis=dis.substr(1,dis.length) ;
            console.log(dis)

            const newdata =  document.createElement('td') ;
            newdata.innerHTML = dis ;
            newRow.appendChild(newdata);
           //document.getElementById('data-table').querySelector('tbody').appendChild(newRow);
            
            //for showing details section
           const newdetails = document.createElement('td') ;
           newdetails.className = 'primary' ;
           newdetails.idName = 'details' ;
           newdetails.innerHTML = 'Details' ;
           newRow.appendChild(newdetails);

        //for onclick evnt on Details section to show the previous test result in UI  
          newdetails.setAttribute('onclick', `testResult(${id})`);

        }});
        
         } catch (err){ 
            console.log('Error fetching data:', err);
     }
}


async function testResult(id){
    
       try{
        console.log('id mil gya',id) ;

        let heartrate = document.querySelector('#heart') ;
        let heartratePercentage = document.querySelector('#heartrate_percentage') ;
    
        let spo2rate = document.querySelector('#spo2') ;
        let spo2Percentage = document.querySelector('#spo2_percentage') ;
    
        let response = await fetch('http://localhost:9080/api/data/getall'); 
           let val = await response.json();
           console.log('val',val) ;   
    
           const length = Object.keys(val).length;
    
           for(let i=0 ; i<length ; i++){
            if(val[i]?.userId == id){
                console.log('isit',val[i]?.userId )
                // for rendering heart rate
                heartrate.innerText = `${val[i]?.heartrate}`; 
                let heartratevaluePercentage = Math.round(heartrate.innerText) ;
                heartratePercentage.innerText= `${heartratevaluePercentage}%` ;
    
                // for rendering spo2 rate
                spo2rate.innerText = `${val[i]?.spo2}`; 
                console.log('spo2:',spo2.innerText) ;
                let spo2valuePercentage = Math.round(spo2rate.innerText) ;
                spo2Percentage.innerText= `${spo2valuePercentage}%` ; 
            }
        }
       }
       catch(err){
        console.log(err) ;
       }

}
