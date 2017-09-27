$(document).ready(function () {
    function recordSearch() {
        $(".header-top-search").focus();

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

        var val = getUrlRequest().val;
        var addressStr = "";
        addressStr = "<a class=\"record-skip\" href=\"#\">" + "地址 : " + val + "</a>";
        $(".record-address").prepend(addressStr);
        var address = val;

        if (val.length === 64) {
            $.ajax({
                url: url2 + address,
                type: "GET",
                data: {
                    address: val
                },
                dataType: "json",
                async: false,
                success: function (data) {
                    console.log(data);
                },
                error: function () {
                    layer.open({
                        title: '请求数据失败',
                        content: '对不起，后台数据正在紧急修复中...'
                    });
                }
            });
        } else {
            $.ajax({
                url: url1 + address + "?offset=0&limit=100",
                type: "GET",
                data: {
                    address: val
                },
                dataType: "json",
                async: false,
                success: function (data) {
                    var transactions = data.transactions;
                    var fee = "手续费: 0.1 XAS";
                    var transactionsLen = transactions.length;
                    var pageCount;
                    var startTransactions;
                    var clickTransactions;

                    if (transactions && transactionsLen > 0) {
                        if (transactionsLen % 10 > 0) {
                            pageCount = Math.ceil(transactionsLen / 10);
                        } else {
                            pageCount = transactionsLen / 10;
                        }
                    }

                    if (transactions && transactionsLen != 0) {
                        transactions = transactions.reverse();

                        for (var i = 0, len = transactions.length; i < len; i++) {
                            transactions[i].timestamp = formatDateTime(transactions[i].timestamp);
                        }

                        var recordStr = function () {
                            var recordStr = "";
                            $.each(clickTransactions, function (i, result) {
                                if (result.asset.uiaTransfer) {
                                    recordStr += " <li>\n" +
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
                            $('.scroll-record-container').append(recordStr);
                        };

                        $.ajax({
                            url: url5 + address,
                            type: "GET",
                            data: {
                                address: val
                            },
                            dataType: "json",
                            async: false,
                            success: function (data) {
                                var dataBalanceShow = data.balances[0].balanceShow;
                                var outstandingStr = "";
                                outstandingStr = "<span class=\"outstanding\">" + "账户余额：" + dataBalanceShow + " XAS" + "</span>";
                                $(".record-address").append(outstandingStr);
                            },
                            error: function () {
                                layer.open({
                                    title: '请求数据失败',
                                    content: '对不起，后台数据正在紧急修复中...'
                                });
                            }
                        });

                        startTransactions = transactions.slice(0, 10);

                        var recordLiStr = "";
                        $.each(startTransactions, function (i, result) {
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


                        function clickCount() {
                            $(".recordPages").find("a").click(function () {
                                $('.scroll-record-container  li').remove();
                                var aVal;
                                aVal = $(this).text();

                                if (aVal == pageCount) {
                                    var startCount1;
                                    startCount1 = (aVal - 1) * 10;
                                    clickTransactions = transactions.slice(startCount1, transactions.length);
                                } else if (aVal == 1) {
                                    clickTransactions = transactions.slice(0, 10);
                                } else {
                                    var startCount2, endCount2;
                                    startCount2 = (aVal - 1) * 10;
                                    endCount2 = startCount2 + 10;

                                    clickTransactions = transactions.slice(startCount2, endCount2);
                                }
                                recordStr();
                            });

                            $(".prevPage").click(function () {
                                var currentVal, endCount;
                                currentVal = parseInt($(".current").text()) - 1;

                                $('.scroll-record-container  li').remove();
                                currentVal = (currentVal - 1) * 10;
                                endCount = currentVal + 10;
                                clickTransactions = transactions.slice(currentVal, endCount);

                                recordStr();
                            });

                            $(".nextPage").click(function () {
                                var currentVal;
                                currentVal = parseInt($(".current").text()) + 1;
                                // alert(currentVal);

                                $('.scroll-record-container  li').remove();
                                currentVal = (currentVal - 1) * 10;
                                endCount = currentVal + 10;
                                clickTransactions = transactions.slice(currentVal, endCount);
                                console.log(clickTransactions);

                                recordStr();
                            });

                            $(".senderId").click(function () {
                                var senderIdText = $(this).find("span").text();
                                senderIdText = senderIdText.replace(/\s+/g, "");
                                window.location.href = "record.html" + "?" + "val" + "=" + senderIdText;
                                recordSearch();
                            });

                            $(".recipientId").click(function () {
                                var recipientIdText = $(this).find("span").text();
                                recipientIdText = recipientIdText.replace(/\s+/g, "");
                                window.location.href = "record.html" + "?" + "val" + "=" + recipientIdText;
                                recordSearch();
                            });

                            $(".scroll-record-container").find("a").click(function () {
                                var recipientIdText = $(this).text();
                                recipientIdText = recipientIdText.replace(/\s+/g, "");
                                window.location.href = "particular.html" + "?" + "val" + "=" + recipientIdText;
                            });
                        }


                        if (transactions.length > 11) {
                            $(".recordPages").createPage({
                                pageCount: pageCount,
                                current: 1,
                                backFn: function (p) {
                                    clickCount();
                                }
                            });
                        }
                        clickCount();

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
                            title: '未搜索到地址值',
                            content: '您输入的地址不正确，或者截止到目前交易记录为空！！！'
                        });
                    }

                },
                error: function (data) {
                    layer.open({
                        title: '请求数据失败',
                        content: '对不起，后台数据正在紧急修复中...'
                    });
                }

            });
        }
    }

    recordSearch();


    $(".record-search").click(function () {
        var recordVal = $(".header-top-search").val();
        if (recordVal.length == 64) {
            // window.location.href = "record.html";
        } else if (recordVal.length == 0) {
            layer.open({
                title: '搜索栏为空',
                content: '请在搜索栏输入您要查找的ID、交易ID或地址！！！'
            });
        } else {
            window.location.href = "record.html" + "?" + "val" + "=" + recordVal;
            recordSearch();
        }
    });


    $(".header-top-search").keydown(function () {//给输入框绑定按键事件
        if (event.keyCode == "13") {//判断如果按下的是回车键则执行下面的代码
            var val = $(".header-top-search").val();
            if (val.length == 64) {
                window.location.href = "record.html" + "git?" + "id" + "=" + val;
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
        recordSearch();
    });

    $(".senderId").click(function () {
        var senderIdText = $(this).find("span").text();
        senderIdText = senderIdText.replace(/\s+/g, "");
        window.location.href = "record.html" + "?" + "val" + "=" + senderIdText;
        recordSearch();
    });

    $(".recipientId").click(function () {
        var recipientIdText = $(this).find("span").text();
        recipientIdText = recipientIdText.replace(/\s+/g, "");
        window.location.href = "record.html" + "?" + "val" + "=" + recipientIdText;
        recordSearch();
    });

    $(".scroll-record-container").find("a").click(function () {
        var recipientIdText = $(this).text();
        recipientIdText = recipientIdText.replace(/\s+/g, "");
        window.location.href = "particular.html" + "?" + "val" + "=" + recipientIdText;
    });
});

