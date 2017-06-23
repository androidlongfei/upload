function jqueryAjax(url, data, requestType, dataType, beforeSendCallback, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: requestType, //GET
        async: true, //或false,是否异步
        data: data,
        timeout: 5000, //超时时间
        dataType: dataType, //返回的数据格式：json/xml/html/script/jsonp/text
        beforeSend: function (xhr) {
            // console.log(xhr);
            // console.log('发送前');
            if (beforeSendCallback && typeof beforeSendCallback === 'function') {
                beforeSendCallback();
            }
        },
        success: function (data, textStatus, jqXHR) {
            // console.log(data);
            // console.log(textStatus);
            // console.log(jqXHR);
            successCallback(data);
        },
        error: function (xhr, textStatus) {
            // console.log('错误');
            // console.log(xhr);
            // console.log(textStatus);
            errorCallback(xhr);
        },
        complete: function () {
            // console.log('结束');
        }
    });
}

/**
 * [jqueryPost 发送jQueryPost请求]
 * @param  {String} url             [请求地址]
 * @param  {Object} data            [需要发送的数据]
 * @param  {function} successCallback [请求成功后的回调函数]
 * @param  {function} errorCallback   [请求失败后的回调函数]
 */
function jqueryPost(url, data, successCallback, errorCallback) {
    jqueryAjax(url, data, 'POST', 'json', null, successCallback, errorCallback);
}

/**
 * [jqueryPostObjParameter description]
 * @param  {object} requestObj [description]
 * @return {[type]}            [description]
 */
function jqueryPostObjParam(requestObj) {
    jqueryPost(requestObj.url, requestObj.data, requestObj.successCallback, requestObj.errorCallback);
}

/**
 * [pagingQueryData 分页查询]
 * @param  {[string]} url     [url地址]
 * @param  {[int]} start [起始位置]
 * @param  {[int]} count   [每页查询的条目]
 * @param  {[function]} successCallback   [查询成功的回调函数]
 * @param  {[function]} failedCallback   [查询失败的回调函数]
 * @return {[type]}         [description]
 */
function pagingQueryData(url, start, count, successCallback, failedCallback) {
    var data = {
        start: start,
        count: count
    };
    jqueryPost(url, data, successCallback, failedCallback);
}
