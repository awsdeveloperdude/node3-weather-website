console.log('Client Side Javascript File Loaded')


const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
     const location=search.value

     messageOne.textContent='Loading...'
     messageTwo.textContent=''

     console.log(search)
     fetch('http://localhost:3000/weather?address='+location ).then((response)=>{
            response.json().then((data)=>{
                        if(data.error){
                            console.log('error: '+data.error)
                            messageOne.textContent=data.error
                        }else{
                            console.log('exact location is: '+data.location)
                            console.log('exact temperature is: '+data.forecastData.temperature+' Celsius')
                            messageOne.textContent=data.location
                            messageTwo.textContent=data.forecastData.temperature+' Celsius'
                        }
                            
                    })
            })
    

})