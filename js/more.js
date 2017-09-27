$(document).ready(function () {

    // 渲染最近交易记录数据
    $.ajax({
        url: url4,
        type: "GET",
        data: {},
        dataType: "json",
        async: false,
        success: function (data) {
            var transactions = data.transactions;
            var total = 0;
            var pageCount;
            var currentCount;
            var startTransactions;
            var clickTransactions;

            if (transactions && transactions.length > 0) {
                console.log(transactions.length);
                if (transactions.length % 10 > 0) {
                    pageCount = Math.ceil(transactions.length / 10);
                    console.log(pageCount);
                } else {
                    pageCount = transactions.length / 10;
                    console.log(pageCount);
                }
            }

            $(".tcdPageCode").createPage({
                pageCount: pageCount,
                current: 1,
                backFn: function (p) {

                }
            });
            (function () {
                for (var i = 0, len = transactions.length; i < len; i++) {
                    if (transactions[i].asset.uiaTransfer.amountShow && !isNaN((transactions[i].asset.uiaTransfer.amountShow))) {
                        total = total + parseFloat(transactions[i].asset.uiaTransfer.amountShow);
                    }
                    transactions[i].timestamp = formatDateTime(transactions[i].timestamp);
                }
            })();
            transactions=transactions.reverse();
            startTransactions = transactions.slice(0, 10);
            var tableStr = "";
            var grossStr = "";
            total = total.toFixed(2);
            grossStr = "<span class=\"more-gross\">" + "交易总量 : " + total + "</span>";
            $('.more-search').append(grossStr);
            $.each(startTransactions, function (i, result) {
                tableStr += "  <tr>\n" +
                    "        <td>" + result.senderId + "</td>\n" +
                    "        <td>" + result.timestamp + "</td>\n" +
                    "        <td>" + result.recipientId + "</td>\n" +
                    "        <td>" + result.asset.uiaTransfer.amountShow + "</td>\n" +
                    "    </tr>";
            });
            $('.more-table-tbody').append(tableStr);
            console.log($(".tcdPageCode").find("a"));
            currentCount=$(".tcdPageCode").find(".current").text();
            // console.log($(".tcdPageCode").children("a"));

            // function pageCount() {
            //
            // }

            $(".tcdPageCode").find("a").click(function () {
                console.log($(".tcdPageCode").find("a"));
                $('.more-table-tbody  tr').remove();
                alert($(this).text());
                // $(this).click(function () {
                //
                // });
                var startCount=($(this).text()-1)*10;
                var endCount=startCount+10;
                // console.log(startCount);
                // console.log(endCount);
                clickTransactions = transactions.slice(startCount,endCount);
                // console.log(clickTransactions);
                // (function () {
                //     for (var i = 0, len = clickTransactions.length; i < len; i++) {
                //         if (clickTransactions[i].asset.uiaTransfer.amountShow && !isNaN((clickTransactions[i].asset.uiaTransfer.amountShow))) {
                //             total = total + parseFloat(clickTransactions[i].asset.uiaTransfer.amountShow);
                //         }
                //         clickTransactions[i].timestamp = formatDateTime(clickTransactions[i].timestamp);
                //     }
                // })();
                var tableStr = "";
                $.each(clickTransactions, function (i, result) {
                    tableStr += "  <tr>\n" +
                        "        <td>" + result.senderId + "</td>\n" +
                        "        <td>" + result.timestamp + "</td>\n" +
                        "        <td>" + result.recipientId + "</td>\n" +
                        "        <td>" + result.asset.uiaTransfer.amountShow + "</td>\n" +
                        "    </tr>";
                });
                $('.more-table-tbody').append(tableStr);


            });

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



