$(document).ready(function () {
    function getUrlRequest() {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            if (str.indexOf("&") != -1) {
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
            } else {
                theRequest[str.split("=")[0]] = unescape(str.split("=")[1]);
            }
        }
        return theRequest;
    }

    var particularVal = getUrlRequest().id;

    var particularStr = "";
    particularStr = "<span class=\"particular-record\">" + "最近的交易记录 " + particularVal + "</span>";
    $(".particular-container header").append(particularStr);

    var informationStr = "";

    informationStr = "<span class=\"particular-address\">" + "<b class=\"float_l\">" + "交易ID" + "</b>" + particularVal + "</span>";
    $(".particular-information").prepend(informationStr);

    $.ajax({
        url: urlTransactionId + particularVal,
        type: "GET",
        data: {},
        dataType: "json",
        async: false,
        success: function (data) {
            var transaction;
            transaction = data.transaction;
            if (transaction) {
                var particularLiStr = "";
                particularLiStr = "       <li class=\"particular-title\">" + "概览" + "</li>\n" +
                    "        <li>\n" +
                    "            <span class=\"float_l\">" + "发送者" + "</span>\n" +
                    "            <span>" + transaction.senderId + "</span>\n" +
                    "        </li>\n" +
                    "        <li>\n" +
                    "            <span class=\"float_l\">" + "接收者" + "</span>\n" +
                    "            <span>" + transaction.recipientId + "</span>\n" +
                    "        </li>\n" +
                    "        <li>\n" +
                    "            <span class=\"float_l\">" + "确认数" + "</span>\n" +
                    "            <span>" + transaction.confirmations + "</span>\n" +
                    "        </li>\n" +
                    "        <li>\n" +
                    "            <span class=\"float_l\">" + "金额" + "</span>\n" +
                    "            <span>" + transaction.asset.uiaTransfer.amountShow + " XAS" + "</span>\n" +
                    "        </li>\n" +
                    "        <li>\n" +
                    "            <span class=\"float_l\">" + "手续费" + "</span>\n" +
                    "            <span>" + "0.1 XAS" + "</span>\n" +
                    "        </li>\n" +
                    "        <li>\n" +
                    "            <span class=\"float_l\">" + "时间数" + "</span>\n" +
                    "            <span>" + transaction.timestamp + "</span>\n" +
                    "        </li>\n" +
                    "        <li>\n" +
                    "            <span class=\"float_l\">" + "区块ID" + "</span>\n" +
                    "            <span>" + transaction.blockId + "</span>\n" +
                    "        </li>\n" +
                    "        <li></li>";

                $(".particular-information ul").append(particularLiStr);
            } else {
                var addressStr1 = "";
                addressStr1 = "<span class=\"particular-empty\">" + "未搜索到当前ID的交易记录..." + "</span>";
                $(".particular-information ul").append(addressStr1);
                $(".particular-empty").css({
                    "display": "block",
                    "width": "100%",
                    "height": "400px",
                    "line-height": "400px",
                    "text-align": "center",
                    "background": "#20242d",
                    "color": "#00b3ee",
                    "font-size": "16px"
                });

                layer.open({
                    title: '请求数据失败',
                    content: '对不起，您当前查询的交易ID不存在...'
                });
            }
        },
        error: function () {
            layer.open({
                title: '请求数据失败',
                content: '对不起，您当前查询的交易ID不存在...'
            });
        }
    });

    $(".particular-logo").click(function () {
        window.location.href = "index.html";
    });
});