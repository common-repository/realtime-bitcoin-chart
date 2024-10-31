=== Realtime Bitcoin Chart ===
Contributors: zoken
Tags: bitcoin,realtime,chart
Donate link: https://paypal.me/jimblack
Stable tag: 1.1.2

This plugin allow your display price chart of bitcoin on your site. You can add it to sidebar or page content.

# Installation #
1. After download the zip file, go to **Plugins** > **Add New** then press Upload Button and choose zip file
2. Press **Upload** button
3. After upload press **Activate**
 
# How to use #
- **Page:** Add shortcoin `[bitcoinchart currency="USD"]` into your page or post content, you can change currency by valid currencies (Checkout here: https://api.coindesk.com/v1/bpi/supported-currencies.json)
- **Widget:** Go to **Appearance** > **Widgets** and drag **BitcoinChart** to your sidebar
- Choose your **Currency**

# Data Source #
We use [Coindesk API](http://coindesk.com/api) for our plugin

# Libraries #
[Hightcharts](https://www.highcharts.com/)
[Async](https://github.com/caolan/async)

# Changelog  #
## Version 1.0 ##
- Initial Release.
## Version 1.0.1 ##
- Fix protocol in js code for https sites
## Version 1.0.2 ##
- Remove source link in widget
## Version 1.0.3 ##
- Fix link of charts in sidebar
## Version 1.1 ##
- Add currencies selection for shortcode and widget
## Version 1.1.1 ##
- Change author to bitcoinnews.ch
## Version 1.1.2 ##
- Add setting for chart url and light theme