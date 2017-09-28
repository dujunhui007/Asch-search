$(document).ready(function(){
    $('#box').append('<span class="bacImage"></span>');
    $('#loading').hide()
});

function formatDateTime(timeStamp) {
    // var stringTime = "2016/09/27 20:00:00";
    var timestamp1 = new Date(Date.UTC(2016, 5, 27, 20, 0, 0, 0));
    timestamp1 = timestamp1 / 1000;
    timeStamp += timestamp1;
    var date = new Date();
    date.setTime(timeStamp * 1000);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}


var urlBalances="http://45.32.254.236/api/uia/balances/";
var urlAsset="http://45.32.254.236/api/uia/assets/ABSORB.YLB";
var urlTransaction="http://45.32.254.236/api/uia/transactions/my/";
var urlYLB="http://45.32.254.236/api/uia/transactions/ABSORB.YLB";
var urlTransactionId="http://45.32.254.236/api/uia/transactions/";
var currency="ABSORB.YLB";





