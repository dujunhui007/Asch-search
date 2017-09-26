$(document).ready(function () {
    // 渲染最近交易记录数据
    $.ajax({
        url: url4,
        type: "GET",
        data: {},
        dataType: "json",
        async: false,
        success: function (data) {
            var transactions;
            transactions = (data.transactions).reverse();
            (function () {
                for (var i = 0, len = transactions.length; i < len; i++) {
                    transactions[i].timestamp = formatDateTime(transactions[i].timestamp);
                }
            })();
            transactions = transactions.slice(0, 10);
            var tableStr = "";
            $.each(transactions, function (i, result) {
                tableStr += "  <tr>\n" +
                    "        <td>" + result.senderId + "</td>\n" +
                    "        <td>" + result.timestamp + "</td>\n" +
                    "        <td>" + result.recipientId + "</td>\n" +
                    "        <td>" + result.asset.uiaTransfer.amountShow + "</td>\n" +
                    "    </tr>";
            });
            $('.more-table').append(tableStr);
        },
        error: function () {
            layer.open({
                title: '请求数据失败',
                content: '对不起，后台数据正在紧急修复中...'
            });
        }
    });

    // LOGO点击跳转首页
    $(".more-logo").click(function () {
        window.location.href = "index.html";
    });

    // 设置搜索框
    $(".small-search").click(function () {
        var val = $(".more-input").val();
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
    });

    $(".more-input").focus();

    $(".more-input").keydown(function () {//给输入框绑定按键事件
        if (event.keyCode == "13") {//判断如果按下的是回车键则执行下面的代码
            var val = $(".more-input").val();
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

});
