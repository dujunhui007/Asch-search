$(document).ready(function () {
    var url = urlYLB;
    var offset = 1;
    var limit = 10;
    var pageCount;
    var currentPage = 1;
    getInfo(url, offset, limit);

    function getInfo(url, beforeOffset, limit) {
        var offset = (beforeOffset - 1) * 10;
        $(".more-input").focus();
        $.ajax({
            url: url + "?offset=" + offset + "&" + "limit=" + limit,
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
                $('.more-table-tbody  tr').remove();
                var tableStr = "";
                $.each(transactions, function (i, result) {
                    tableStr += "  <tr>\n" +
                        "        <td class=\"moreSenderId\">" + result.senderId + "</td>\n" +
                        "        <td >" + result.timestamp + "</td>\n" +
                        "        <td class=\"moreRecipientId\">" + result.recipientId + "</td>\n" +
                        "        <td>" + result.asset.uiaTransfer.amountShow + "</td>\n" +
                        "    </tr>";
                });
                $('.more-table-tbody').append(tableStr);
            },
            error: function () {
                layer.open({
                    title: '请求数据失败',
                    content: '对不起，后台数据正在紧急修复中...'
                });
            }
        })
    }

    if(pageCount>1){
        $(".tcdPageCode").createPage({
            pageCount: pageCount,
            current: 1,
            backFn: function (p) {
                $(".tcdPageCode").find(".tcdNumber").click(function () {
                    var aVal;
                    aVal = $(this).text();
                    currentPage = Number($(this).text());
                    getInfo(url, currentPage, limit);
                });
                $(".tcdPageCode").find(".nextPage").click(function () {
                    console.log('click nextPage currentPage =', currentPage);
                    currentPage = currentPage + 1;
                    getInfo(url, currentPage, limit);
                });
                $(".tcdPageCode").find(".prevPage").click(function () {
                    currentPage = currentPage - 1;
                    getInfo(url, currentPage, limit);
                });

                $(".more-table-tbody").find("tr .moreSenderId").click(function () {
                    var senderIdText = $(this).text();
                    senderIdText = senderIdText.replace(/\s+/g, "");
                    window.location.href = "record.html" + "?" + "val" + "=" + senderIdText;
                });

                $(".more-table-tbody").find("tr .moreRecipientId").click(function () {
                    var senderIdText = $(this).text();
                    senderIdText = senderIdText.replace(/\s+/g, "");
                    window.location.href = "record.html" + "?" + "val" + "=" + senderIdText;
                });
            }
        });
    }

    $(".tcdPageCode").find(".tcdNumber").click(function () {
        var aVal;
        aVal = $(this).text();
        currentPage = Number($(this).text());
        getInfo(url, currentPage, limit);
    });
    $(".tcdPageCode").find(".nextPage").click(function () {
        console.log('click nextPage currentPage =', currentPage);
        currentPage = currentPage + 1;
        getInfo(url, currentPage, limit);
    });
    $(".tcdPageCode").find(".prevPage").click(function () {
        currentPage = currentPage - 1;
        getInfo(url, currentPage, limit);
    });

    $(".more-table-tbody").find("tr .moreSenderId").click(function () {
        var senderIdText = $(this).text();
        senderIdText = senderIdText.replace(/\s+/g, "");
        window.location.href = "record.html" + "?" + "val" + "=" + senderIdText;
    });

    $(".more-table-tbody").find("tr .moreRecipientId").click(function () {
        var senderIdText = $(this).text();
        senderIdText = senderIdText.replace(/\s+/g, "");
        window.location.href = "record.html" + "?" + "val" + "=" + senderIdText;
    });

    // LOGO点击跳转首页
    $(".more-logo").click(function () {
        window.location.href = "index.html";
    });

    // 设置搜索框
    $(".small-search").click(function () {
        var val = $(".more-input").val();
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
    });

    $(".more-input").keydown(function () {//给输入框绑定按键事件
        if (event.keyCode == "13") {//判断如果按下的是回车键则执行下面的代码
            var val = $(".more-input").val();
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
});



