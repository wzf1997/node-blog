
let baseUrl = 'http://127.0.0.1:3030';

export function isEmpty(value:any): Boolean {
    if(Array.isArray(value)){
        return value.length == 0;
    }else if(typeof value == 'object'){
       return Object.keys(value).length == 0;
    }else if(typeof value == 'string'){
        return value.split('').length == 0;
    }
    return false;
}


export  function  api ( url:string, data:object, formData:FormData | '' , method = 'POST', isFileUpload = false,   ) {
    let config: Object =  {
        body: JSON.stringify(data),
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',
        headers: {
            'content-type': 'application/json',
            'token': localStorage.getItem('token') || '',
        }
    }  
    if(isFileUpload){
        config = { 
            method :"POST",
            body: formData,
            headers:{
                // "Content-Type": "multipart/form-data",
                'token': localStorage.getItem('token') || '',
            } 
        }
    }  
    return  new Promise ((resolve,reject) => {
        fetch(baseUrl+url,config).then(res=> {
            if(!res.ok){
                reject(res); 
            }else {
                resolve(res.json())
            }
        }).catch(err=> reject(err))
    })
    
}


// 基于文件上传 利用XML 监听文件上传的进度 
export  function uploadFile({ apiName='', data, progressCallback, endCallback  } : { apiName: string, data: FormData, progressCallback: Function, endCallback:Function } ) {
    return new Promise ((resolve,reject) => {
        let xhr:any =  new XMLHttpRequest() ;
        let method = 'POST';
        let url  = baseUrl + apiName
        xhr.open(method,url,true)

        //设置请求头 
        xhr.setRequestHeader('token', localStorage.getItem('token') || '');
        // 上传时文件钩子监听
        xhr.upload.onprogress = ( e:any )=>{
            // 获得 已经传输的 loaded  除以总的
            const {loaded, total } = e
            let percent = (loaded/total*100).toFixed(2);
            progressCallback({percent, abort:()=>{xhr.abort()} });

        }
        // 文件上传结束
        xhr.onload = () => {
            resolve()
            endCallback({isUploadEnd:true});
            console.log('文件上传结束')
        }
        // 文件上传失败
        xhr.onerror = (err:any) => {
            console.log('文件上传结束')
            reject(err)
        }
        
        xhr.send(data);
    })
    
   
}