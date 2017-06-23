var HOST = "http://10.4.52.32:8000";
var COUNT = 15; // 默认每次加载10条
var loadStatus = 0; // 0:可加载 1:加载中 2:所有数据加载完成

/**
 * [解决ios点击事件延迟300ms]
 * @return {[type]} [description]
 */
$(function () {
    FastClick.attach(document.body);
});

initLoadMore(); //初始化加载更多
refresh(); // 初次加载数据

$(document.body).pullToRefresh().on("pull-to-refresh", function () {
    // 触发下拉刷新
    refresh();
});

$(document.body).infinite().on("infinite", function () {
    // 触发加载更多
    if (loadStatus === 0) {
        loadMore();
    }
});

function loadMore() {
    loadStatus = 1;
    $('.weui-loadmore').show();
    var start = $("#list > a").length;
    console.log(typeof start);
    console.log(typeof COUNT);
    var url = HOST + '/paging';
    console.log('more start', start);
    pagingQueryData(url, start, COUNT, loadMoreSuccess, loadMoreFailed);
}

function loadMoreSuccess(data) {
    console.log('加载更多获取数据成功', data);
    var elments = assemblyElement(data.testData);
    var total = data.total;
    $("#list").append(elments);
    loading = false;
    var currentTotal = $("#list > a").length;
    console.log('currentTotal', currentTotal);
    console.log('total', total);
    if (currentTotal == total) {
        //全部加载完毕
        loadStatus = 2;
    } else {
        loadStatus = 0;
    }
    $('.weui-loadmore').hide();
}

function loadMoreFailed(data) {
    loadStatus = 0;
    $('.weui-loadmore').hide();
}

function initLoadMore() {
    //初始化加载更多
    loadStatus = 0;
    $(document.body).infinite(65);
    $('.weui-loadmore').hide();
}


/**
 * [refresh 下拉刷新]
 * @return {[type]} [description]
 */
function refresh() {
    // var start = $("#list > a").length;
    var start = 0;
    var url = HOST + '/paging';
    console.log('refresh start', start);
    pagingQueryData(url, start, COUNT, refreshSuccess, refreshFailed);
}

function refreshSuccess(data) {
    console.log('下拉刷新获取数据成功', data);
    var elments = assemblyElement(data.testData);
    var total = data.total;
    $("#list").empty();
    $("#list").append(elments);
    $("#time").text(moment().format('YYYY-MM-DD HH:mm:ss'));
    $(document.body).pullToRefreshDone();

    // 初始化 加载更多
    initLoadMore();
    var currentTotal = $("#list > a").length;
    if (currentTotal == total) {
        //全部加载完毕 , 不显示加载过多
        loadStatus = 2;
        $('.weui-loadmore').hide();
    }
}

function refreshFailed(error) {
    console.log('获取数据失败', error);
    $(document.body).pullToRefreshDone();
}

function assemblyElement(data) {
    var elements = _.map(data, function (value, key) {
        return getItem(value);
    });
    return elements;
}

function getItem(itemData) {
    var content = '<a class="weui-cell weui-cell_access" href="javascript:;">' +
        '<div class="weui-cell__bd">' +
        '<p>' + itemData.title + '</p>' +
        '</div>' +
        '<div class="weui-cell__ft">' + itemData.number +
        '</div>' +
        '</a>';
    return content;
}
