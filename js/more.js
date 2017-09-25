$(document).ready(function () {
    $.ajax({
        url: "http://45.32.254.236/api/uia/transactions2/ABSORB.YLB",
        type: "GET",
        data: {},
        dataType: "json",
        async: false,
        success: function (data) {
            console.log(data);
            var transactions;
            var total = 0;
            transactions = data.transactions;
            (function () {
                for (var i = 0, len = transactions.length; i < len; i++) {
                    if (transactions[i].asset.uiaTransfer.amountShow && !isNaN((transactions[i].asset.uiaTransfer.amountShow))) {
                        total = total + parseFloat(transactions[i].asset.uiaTransfer.amountShow);
                    }
                    console.log(transactions[i].asset.uiaTransfer.amountShow);

                    transactions[i].timestamp = formatDateTime(transactions[i].timestamp);
                    for (var j = 0; j < transactions.length - 1 - i; j++) {
                        if (transactions[j].timestamp < transactions[j + 1].timestamp) {
                            var middle = transactions[j];
                            transactions[j] = transactions[j + 1];
                            transactions[j + 1] = middle;
                        }
                    }
                }
            })();
            transactions = transactions.slice(0, 10);
            var tableStr = "";
            var grossStr = "";
            total=total.toFixed(2);
            grossStr = "<span class=\"more-gross\">" + "交易总数量 : " + total  + "</span>";
            $('.more-search').append(grossStr);
            $.each(transactions, function (i, result) {
                tableStr += "  <tr>\n" +
                    "        <td>" + result.senderId + "</td>\n" +
                    "        <td>" + result.timestamp + "</td>\n" +
                    "        <td>" + result.recipientId + "</td>\n" +
                    "        <td>" + result.asset.uiaTransfer.amountShow + "</td>\n" +
                    "    </tr>";
            });
            $('.more-table').append(tableStr);

        }
    });
});
