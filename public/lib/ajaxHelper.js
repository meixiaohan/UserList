
/**
 *Ajax的Get请求的辅助方法
 * @param {String} url 请求后台的地址
 * @param {function} callback 请求数据之后，返回数据成功，并调用这个方法，这个方法接受一个参数就是后台返回的数据
 */
function AjaxGet(url,callback){
    var xhr = new XMLHttpRequest();
    xhr.open('GET',url,true);
    xhr.send();

    xhr.onreadystatechange =function(){
        if(xhr.readyState==4&&xhr.status==200){
            callback(xhr.responseText);
        }
    }
}


/**
 *
 *Ajax的Post请求的辅助方法
 * @param {String} url
 * @param {string} data
 * @param {function} callback
 */
function AjaxPost(url,data,callback){
    var xhr = new XMLHttpRequest();
    xhr.open('POST',url,true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send(data);
   
    xhr.onreadystatechange =function(){
        if(xhr.readyState==4&&xhr.status==200){
            callback(xhr.responseText);
        }
    }
}