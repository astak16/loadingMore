window.jQuery = function(){}
window.$ = window.jQuery
let button = document.querySelector('#button')
let ulTag = document.querySelector('ul')
let len = 5,
    currentIndex = 3,
    isLoading = false

window.jQuery.ajax = function({method,url,body}){
    return new Promise(function(resolve,reject){
        let xhr = new XMLHttpRequest()
        let arr = []

            for(let key in body){
                arr.push(key + '=' + body[key])
            }
            url = url +'?' + arr.join('&')
        

        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status >= 200 && xhr.status <300 || xhr.status === 304){
                    resolve.call(undefined,xhr)
                }else{
                    reject.call(undefined,xhr)
                }
            }
        }
        xhr.open(method,url)
        xhr.send(body)
    })
}


button.addEventListener('click',function(){
    if(isLoading){return}
    isLoading = true
    this.textContent = '加载中...'
    $.ajax({
        method:'GET',
        url:'/xxx',
        body:{
            currentIndex:currentIndex,
            len:len
        }
    }).then(
        (xhr)=>{
            let obj = JSON.parse(xhr.responseText)
            appendChild(obj)
            isLoading = false
            currentIndex = currentIndex + len
        },
        (xhr)=>{console.log(xhr.status)}
    )
})

function appendChild(data){
    console.log(data)
    for(let i = 0; i < data.length; i++){
        let liTag = document.createElement('li')

        liTag.innerText = data[i]
        console.log(liTag.innerText)

        ulTag.appendChild(liTag)
        button.textContent = '加载更多'

    }
}