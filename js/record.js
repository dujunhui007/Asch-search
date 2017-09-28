$(document).ready(function () {
    var url = urlTransaction;
    var offset = 1;
    var limit = 10;
    var fee = "手续费: 0.1 XAS";
    var pageCount;
    var currentPage = 1;

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

    var address = getUrlRequest().val;
    $(".header-top-search").focus();
    getInfo(url, offset, address, limit);
    var addressStr = "";
    addressStr = "<a class=\"record-skip\" href=\"#\">" + "地址 : " + address + "</a>";
    $(".record-address").prepend(addressStr);

    function getInfo(url, beforeOffset, address, limit) {
        var offset = (beforeOffset - 1) * 10;
        if (address.length === 64) {
            window.location.href = "particular.html" + "?" + "id" + "=" + address;
        } else {
            $.ajax({
                url: url + address + "?offset=" + offset + "&" + "limit=" + limit,
                type: "GET",
                data: {},
                dataType: "json",
                async: false,
                success: function (data) {
                    var transactions;
                    var count;
                    count = data.count;
                    transactions = data.transactions;

                    if (transactions && transactions.length > 0) {
                        transactions = transactions.reverse();
                        for (var i = 0; i < transactions.length; i++) {
                            transactions[i].timestamp = formatDateTime(transactions[i].timestamp);
                        }
                        if (count % 10 != 0) {
                            pageCount = Math.ceil(count / 10);
                        } else {
                            pageCount = count / 10;
                        }
                    }

                    $.ajax({
                        url: urlBalances + address,
                        type: "GET",
                        data: {},
                        dataType: "json",
                        async: false,
                        success: function (data) {
                            var balances;
                            var dataBalanceShow;

                            if (data.balances && data.balances.length > 0) {
                                balances = data.balances;
                                dataBalanceShow = balances[0].balanceShow;
                                var outstandingStr = "";
                                outstandingStr = "<span class=\"outstanding\">" + "账户余额：" + dataBalanceShow + " XAS" + "</span>";
                                $(".record-address").append(outstandingStr);

                                $('.scroll-record-container  li').remove();
                                var recordLiStr = "";
                                $.each(transactions, function (i, result) {
                                    if (result.asset.uiaTransfer) {
                                        recordLiStr += " <li>\n" +
                                            "                <div>\n" +
                                            "                    <a href=\"#\">" + result.id + "</a>\n" +
                                            "                    <p>" + result.timestamp + "</p>\n" +
                                            "                </div>\n" +
                                            "                <div>\n" +
                                            "                    <div class=\"senderId\">\n" +
                                            "                        <span>" + result.senderId + "</span>\n" +
                                            "                    </div>\n" +
                                            "                    <span class=\"arrow-to\"></span>\n" +
                                            "                    <div class=\"recipientId\">\n" +
                                            "                        <span>" + result.recipientId + "</span>\n" +
                                            "                    </div>\n" +
                                            "                </div>\n" +
                                            "                <div class=\"record-information\">\n" +
                                            "                    <span>" + fee + "</span>\n" +
                                            "                    <span></span>\n" +
                                            "                    <span>" + result.confirmations + " 确认数" + "</span>\n" +
                                            "                    <span>" + result.asset.uiaTransfer.amountShow + " XAS " + "</span>\n" +
                                            "                </div>\n" +
                                            "            </li>";
                                    }
                                });
                                $('.scroll-record-container').append(recordLiStr);


                            } else {
                                var addressStr1 = "";
                                addressStr1 = "<span class=\"record-empty\">" + "未搜索到当前地址的交易记录..." + "</span>";
                                $(".scroll-record-container").append(addressStr1);
                                $(".record-empty").css({
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
                                    content: '对不起，当前数据请求失败...'
                                });
                            }
                        },
                        error: function () {
                            layer.open({
                                title: '请求数据失败',
                                content: '对不起，您搜索的地址不存在...'
                            });
                        }
                    });
                },
                error: function () {
                    layer.open({
                        title: '请求数据失败',
                        content: '对不起，后台数据正在紧急修复中...'
                    });
                }
            })
        }
    }

    if (pageCount > 1) {
        $(".recordPages").createPage({
            pageCount: pageCount,
            current: 1,
            backFn: function (p) {
                $(".recordPages").find(".tcdNumber").click(function () {
                    var aVal;
                    aVal = $(this).text();
                    currentPage = Number($(this).text());
                    getInfo(url, currentPage, address, limit);
                });
                $(".recordPages").find(".nextPage").click(function () {
                    currentPage = currentPage + 1;
                    getInfo(url, currentPage, address, limit);
                });
                $(".recordPages").find(".prevPage").click(function () {
                    currentPage = currentPage - 1;
                    getInfo(url, currentPage, address, limit);
                });

                $(".senderId").click(function () {
                    var senderIdText = $(this).find("span").text();
                    senderIdText = senderIdText.replace(/\s+/g, "");
                    window.location.href = "record.html" + "?" + "val" + "=" + senderIdText;

                });

                $(".recipientId").click(function () {
                    var recipientIdText = $(this).find("span").text();
                    recipientIdText = recipientIdText.replace(/\s+/g, "");
                    window.location.href = "record.html" + "?" + "val" + "=" + recipientIdText;
                });
            }
        });
    }


    $(".recordPages").find(".tcdNumber").click(function () {
        var aVal;
        aVal = $(this).text();
        currentPage = Number($(this).text());
        getInfo(url, currentPage, address, limit);
    });
    $(".recordPages").find(".nextPage").click(function () {
        currentPage = currentPage + 1;
        getInfo(url, currentPage, address, limit);
    });
    $(".recordPages").find(".prevPage").click(function () {
        currentPage = currentPage - 1;
        getInfo(url, currentPage, address, limit);
    });

    $(".record-search").click(function () {
        var recordVal = $(".header-top-search").val();
        if (recordVal.length == 64) {
            window.location.href = "particular.html" + "?" + "id" + "=" + recordVal;
        } else if (recordVal.length == 0) {
            layer.open({
                title: '搜索栏为空',
                content: '请在搜索栏输入您要查找的ID、交易ID或地址！！！'
            });
        } else {
            window.location.href = "record.html" + "?" + "val" + "=" + recordVal;
        }
    });

    $(".header-top-search").keydown(function () {//给输入框绑定按键事件
        if (event.keyCode == "13") {//判断如果按下的是回车键则执行下面的代码
            var val = $(".header-top-search").val();
            if (val.length == 64) {
                window.location.href = "particular.html" + "?" + "id" + "=" + val;
            } else if (val.length == 0) {
                layer.open({
                    title: '搜索栏为空',
                    content: '请在搜索栏输入您要查找的ID、交易ID或地址！！！'
                });
            } else {
                window.location.href = "record.html" + "?" + "val" + "=" + val;
            }
        }
    });

// 点击LOGO返回主页面
    $(".record-logo").click(function () {
        window.location.href = "index.html";
    });

    $(".record-skip").click(function () {
        var reg = /[^:]*:([^:]*)/;
        var aText = $(".record-skip").text().replace(reg, "$1");
        aText = aText.replace(/\s+/g, "");
        window.location.href = "record.html" + "?" + "val" + "=" + aText;
    });

    $(".senderId").click(function () {
        var senderIdText = $(this).find("span").text();
        senderIdText = senderIdText.replace(/\s+/g, "");
        window.location.href = "record.html" + "?" + "val" + "=" + senderIdText;

    });

    $(".recipientId").click(function () {
        var recipientIdText = $(this).find("span").text();
        recipientIdText = recipientIdText.replace(/\s+/g, "");
        window.location.href = "record.html" + "?" + "val" + "=" + recipientIdText;
    });

    $(".scroll-record-container").find("a").click(function () {
        var recipientIdText = $(this).text();
        recipientIdText = recipientIdText.replace(/\s+/g, "");
        window.location.href = "particular.html" + "?" + "id" + "=" + recipientIdText;
    });
});


