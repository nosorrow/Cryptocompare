## Criptocompare

####
Аликацията изолзва API на https://min-api.cryptocompare.com

#### Demo:
http://haspel.000webhostapp.com/cryptocompare/sample-page.php
## Getting started

### 1. CSS:
```
<link rel="stylesheet" href="cryptocompare/css/style.css">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
```
### 2.JavaScript:
```
<script src="http://code.jquery.com/jquery-3.3.1.js"></script>
<!--cryptocompare JS -->
<script src="cryptocompare/js/endlessRiver.js"></script>
<script src="cryptocompare/js/cryptocurrencies.js"></script>
<script src="cryptocompare/js/cryptocompare_app.js"></script>
```
#### забележка ! с jquery-3.3.1.slim.js  апликацията няма да работи!

### 3. Икони - разрхивирайте coins.zip
скрипта търси иконите в директория - (coins) като името на валутата
съответсва на името на иконата пр. Bitcoin = bitcoin.png

### Как да го ползвам
#### HTML
```
<! -- контейнер някъде в страницата -->
<div class="currency-ticker" style="position: fixed;">
    <ul id="currency_ticker_list"></ul>
</div>
```
##### скрипта ще генерира списъка с избраните валути

#### JS
```
<script>
    // Default options

   var options = {
           market: 'Kraken',
           coins: ['BTC', 'BCH', 'ETH', 'DASH', 'ZEC', 'XMR', 'LTC', 'XRP'],
           tosymbol: 'EUR',
           display_symbol: 'BGN',
           exchange_rate: 1.95583,
           ticker_container: 'currency-ticker_container',
           ticker_container_position: 'bottom', // or 'bottom'
           icon_width: '20px',
           percent_down_style: 'color:red;',
           percent_up_style: 'color:green;',
           arrow_up: '<i class="fas fa-arrow-up"></i>',
           arrow_down : '<i class="fas fa-arrow-down"></i>',
           // Rotation
           rotation_speed: 52,
           //Refresh time in miliseconds or false => no refreshing
           refresh: 300000 // = 5min or
       };

    // Run ticker application
    CurrencyTicker(options);
</script>
```
### Опции:
1. <b>market</b> - възможни пазари виж https://min-api.cryptocompare.com/data/all/exchanges;
2. <b>coins</b> - Масив с валути. Въвежда се съкращанието на валутата (поддържани валути виж https://min-api.cryptocompare.com/)
3. <b>tosymbol: 'EUR'</b> - цена на крипто валутата в евро = BTC/EUR
4. <b>display_symbol</b> - какво ще се покаже на екрана пр. 12658.54BGN
5. <b>exchange_rate</b> - валутен курс ако показваме в друга валута. Ако искаме в евро курс = 1;
6. <b>ticker_container</b> - ако искате да смените CSS класът по подразбиране с ваш
7. <b>ticker_container_position</b> - възможни 'top', 'bottom'
8. <b>icon_width</b> - височина на иконката в px пр. (icon_width:'22px'), широчината е автоматично.
9. <b>percent_down_style</b> - ако валутата през последните 24ч. пада. Използват се само валидни CSS декларации - 'property:value;'
```
percent_down_style: 'color: #4CAF50; font-size:11px;'
```
10. <b>percent_up_style</b> - като горното ако се покачва. Използват се само валидни CSS декларации - 'property:value;'
11. <b>arrow_up</b> - иконка на стрелката (по подразбиране е от https://fontawesome.com)
12. <b>arrow_down</b> - иконка на стрелката (по подразбиране е от https://fontawesome.com)
13. <b>rotation_speed</b> - скорост на ticker
14. <b>refresh</b> - опресняване на валутите в милисекунди, без потребителя да натиска refresh. (refresh: false => не опреснява)

#####


#####







