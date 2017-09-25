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
    var val = getUrlRequest().val;
    alert("地址长度："+val.length);
    var address = val;
    if(val.length===64){
        $.ajax({
            url: url2+address,
            type: "GET",
            data: {
                address: val
            },
            dataType: "json",
            async: false,
            success: function (data) {
                console.log(data);
                // console.log(1);
                // console.log(data.transactions);
                // var transactions;
                // transactions = data.transactions;
                // (function () {
                //     for (var i = 0; i < transactions.length; i++) {
                //         // console.log(transactions[i].timestamp);
                //         transactions[i].timestamp = formatDateTime(transactions[i].timestamp);
                //         // console.log(transactions[i].timestamp);
                //         for (var j = 0; j < transactions.length - 1 - i; j++) {
                //             if (transactions[j].timestamp < transactions[j + 1].timestamp) {
                //                 var middle = transactions[j];
                //                 transactions[j] = transactions[j + 1];
                //                 transactions[j + 1] = middle;
                //             }
                //         }
                //     }
                // })();
                // transactions = transactions.slice(0, 10);
                // // console.log(transactions);
                // var tableStr = "";
                // $.each(transactions, function (i, result) {
                //     tableStr += "  <tr>\n" +
                //         "        <td>" + result.senderId + "</td>\n" +
                //         "        <td>" + result.timestamp + "</td>\n" +
                //         "        <td>" + result.recipientId + "</td>\n" +
                //         "        <td>" + result.asset.uiaTransfer.amountShow + "</td>\n" +
                //         "    </tr>";
                // });
                // $('.record-table').append(tableStr);
            }
        });
    }else {
        $.ajax({
            url: url1 +address,
            type: "GET",
            data: {
                address: val
            },
            dataType: "json",
            async: false,
            success: function (data) {
                // console.log(data.transactions);
                var transactions;
                transactions = (data.transactions).reverse();
                (function () {
                    for (var i = 0; i < transactions.length; i++) {
                        transactions[i].timestamp = formatDateTime(transactions[i].timestamp);
                    }
                })();
                transactions = transactions.slice(0, 10);
                console.log(transactions);
                var tableStr = "";
                $.each(transactions, function (i, result) {
                    if(result.asset.uiaIssue){
                    tableStr += "  <tr>\n" +
                        "        <td>" + result.senderId + "</td>\n" +
                        "        <td>" + result.timestamp + "</td>\n" +
                        "        <td>" + result.recipientId + "</td>\n" +
                        "        <td>" + result.asset.uiaIssue.amountShow + "</td>\n" +
                        "    </tr>";
                    }
                });
                $('.record-table').append(tableStr);
            }
        });
    }


});

