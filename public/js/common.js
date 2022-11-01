const sendData=(path,data)=>{
    fetch(path,{
        method: 'POST',
        headers:new Headers({
            'Content-type': 'application/json'
        }),
        body:JSON.stringify(data)
    })
    .then(res=>res.json(data))
    .then(data=>processData(data))

    const processData=(data)=>{
        loader.style.display=null
        if(data.alert){
            showFromError(data.alert)
        }else{
            //codigo cuando si se pudo
        }
    }
}

const showFormError=(err)=>{
    let error=document.querySelector('.error')
    error.innerHTML=err
    error.classList.add('show')
    setTimeout(()=>{
        error.classList.remove('show')
    },2000)
}