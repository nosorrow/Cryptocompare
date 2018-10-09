/*
* Criptocompare
* Аликацията изолзва API на https://min-api.cryptocompare.com
*
*/

function cryptoCurrencyPriceTicker(opt) {

    var fsyms = "fsyms=" + opt.coins.toString().toUpperCase();
    var url = "https://min-api.cryptocompare.com/data/pricemultifull?" + fsyms + "&tsyms=" + opt.tosymbol + "&e=" + opt.market;

    $("#currency-ticker_container").addClass('currency-ticker_container');
    if (opt.ticker_container_position == "top") {
        $("#currency-ticker_container").css('top', 0);
    }
    else if (opt.ticker_container_position == "bottom") {
        $("#currency-ticker_container").css('bottom', 0);
    } else {
        alert('WRONG {ticker_container_position} ! ');
    }

    $.getJSON(url, function (data) {
        // Fuck up view READMY.md
        if (data.Response == "Error") {
            errorHandler(data);
            return;
        }

        $.each(data.RAW, function (key, val) {
            var arrow, arrow_style, currency_list;
            var coin = val.EUR;
            var coin_name = criptocurrencies[key];
            var price = coin.PRICE;
            var price2 = (price * opt.exchange_rate).toFixed(2);
            var percent_change = coin.CHANGEPCT24HOUR;
            var src = 'src="cryptocompare/coins/' + normalize(coin_name) + '.png' + '"';

            // if the currency decreases or increases (24hours hystory)
            if (percent_change > 0) {
                arrow_style = opt.percent_up_style;
                arrow = opt.arrow_up;
            } else {
                arrow_style = opt.percent_down_style;
                arrow = opt.arrow_down;
            }
            // start list
            currency_list = "<li>";
            // add image
            currency_list += '<img style="margin-bottom: 3px; height: ' + opt.icon_height + '" id="' + coin.FROMSYMBOL
                + '" alt="' + coin.FROMSYMBOL + '" ' + src + '> ';
            // add coin info
            currency_list += "<span> " + coin_name + " (" + coin.FROMSYMBOL + ")" + " : " + price2 + opt.display_symbol
                + "</span>";
            // add 24hour percent change
            currency_list += '<span style="' + arrow_style + '"><sup> ' + arrow + ' ' + percent_change.toFixed(2) + '%' + '</sup></span>';
            // End list
            currency_list += "</li>";
            $("#currency_ticker_list").append(currency_list);

            // console.log(currency_list)

          //  console.log(coin_name + ': ' + price + '=' + price2);

        });

        $("#currency_ticker_list").endlessRiver({

            // scrolling speed in ms
            speed: opt.rotation_speed,
            // pause on hover
            pause: true,
        });

    });
}

var options_default = {
    market: 'Kraken',
    coins: ['BTC', 'BCH', 'ETH', 'DASH', 'ZEC', 'XMR', 'LTC', 'XRP'],
    tosymbol: 'EUR',
    display_symbol: 'BGN',
    exchange_rate: 1.95583,
    ticker_container: '.currency-ticker_container',
    ticker_container_position: 'top', // or 'bottom'
    icon_height: '20px',
    percent_down_style: 'color:red;',
    percent_up_style: 'color:green;',
    arrow_up: '<i class="fas fa-arrow-up"></i>',
    arrow_down: '<i class="fas fa-arrow-down"></i>',
    // Rotation
    rotation_speed: 52,
    //Refresh time in miliseconds
    refresh: 300000 // 5min
};


function parseOptionProperties(opt) {

    if (jQuery.isEmptyObject(opt)) {
        return options_default;
    }

    //console.log(Object.getOwnPropertyNames(opt));
    var propertyes = Object.getOwnPropertyNames(options_default);

    $.each(propertyes, function (key, val) {
        if (!opt.hasOwnProperty(val)) {
            opt[val] = options_default[val];
        }
    });

    return opt;

}

function normalize(str) {
    return str.replace(/\s+/g, '-').toLowerCase()
}

// START
function CurrencyTicker(options) {
    var opt = parseOptionProperties(options);

    cryptoCurrencyPriceTicker(opt);

    if (opt.refresh !== false) {
        var op = opt;
        $(function () {
            setInterval(function () {
                cryptoCurrencyPriceTicker(op);

            }, op.refresh) // 5 min
        });
    }

}

// For Blockchain.bg

function errorHandler(obj) {

    var cryptoerror = getCookie("cryptoerror");

    if (cryptoerror == 1) {

        console.log('%c An unexpected error has occurred from cryptocompare API: ' + obj.Message , 'background: red; color: #fff; fon-size:12px');
        $("#currency-ticker_container").hide();

    } else {

        setCookie("cryptoerror", 1, 1);

        console.log('%c An unexpected error has occurred from cryptocompare API: ' + obj.Message , 'background: red; color: #fff;' +
            ' fon-size:12px');

        $.ajax({
            url: "http://my.manu/Cryptocompare-app/cryptocompare/php/mailto.php",
            method: "POST",
            data: {object:obj},
            success: function (result) {

                if (result == 1){

                    $("#currency-ticker_container").hide();
                }
            }

        });

    }

}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


