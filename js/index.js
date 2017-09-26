$(document).ready(function () {
    $.ajax({
        url: url3,
        type: "GET",
        data: {},
        dataType: "json",
        async: false,
        success: function (data) {
            $('#currentInformation').empty();
            var result = data.asset;
            var ulStr = "";
            ulStr += "<li>\n" +
                "        <span>资产名字</span>\n" +
                "        <p>" + result.name + "</p>\n" +
                "    </li>\n" +
                "    <li>\n" +
                "        <span>总量</span>\n" +
                "        <p>" + result.maximumShow + "</p>\n" +
                "    </li>\n" +
                "    <li class=\"describe\">\n" +
                "        <span>描述</span>\n" +
                "        <p>" + result.desc + "</p>\n" +
                "    </li>\n" +
                "    <li>\n" +
                "        <span>精度</span>\n" +
                "        <p>" + result.precision + "</p>\n" +
                "    </li>\n" +
                "    <li>\n" +
                "        <span>当前存量</span>\n" +
                "        <p>" + result.quantityShow + "</p>\n" +
                "    </li>\n" +
                "    <li>\n" +
                "        <span>上限</span>\n" +
                "        <p>" + result.maximumShow + "</p>\n" +
                "    </li>\n" +
                "    <li class=\"last-one\">\n" +
                "        <span>高度</span>\n" +
                "        <p>" + result.height + "</p>\n" +
                "    </li>\n"
            $('#currentInformation').append(ulStr);
        },
        error: function () {
            layer.open({
                title: '浏览器版本过低',
                content: '请升级您的浏览器或更换Chrome浏览器搜索查询！！！'
            });
        }
    });

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
            $('.record-table').append(tableStr);
        },
        error: function () {
            layer.open({
                title: '请求数据失败',
                content: '对不起，后台数据正在紧急修复中...'
            });
        }
    });

    $(".header-search").click(function () {
        var val = $(".header-input").val();
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

    $(".header-input").focus();

    $(".header-input").keydown(function () {//给输入框绑定按键事件
        if (event.keyCode == "13") {//判断如果按下的是回车键则执行下面的代码
            var val = $(".header-input").val();
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

