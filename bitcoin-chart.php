<?php

/**
 * Plugin Name:       Realtime Bitcoin Chart
 * Plugin URI:        https://www.bitcoinnews.ch/bitcoin-kurs/
 * Description:       Bitcoin chart based on coindesk.com/price.
 * Version:           1.1.2
 * Author:            Bitcoinnewsch
 * Author URI:        https://bitcoinnews.ch/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       bitcoin-chart
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

function bitcoinchart_currencies_options($selected_val) {
	$aCurrencies = array(
		'USD' => 'United States Dollar',
		'GBP' => 'British Pound Sterling',
		'EUR' => 'Euro',
		'CNY' => 'Chinese Yuan',
		'AUD' => 'Australian Dollar',
		'CAD' => 'Canadian Dollar',
		'AED' => 'United Arab Emirates Dirham',
		'AFN' => 'Afghan Afghani',
		'ALL' => 'Albanian Lek',
		'DZD' => 'Algerian Dinar',
		'AOA' => 'Angolan Kwanza',
		'ARS' => 'Argentine Peso',
		'AMD' => 'Armenian Dram',
		'AWG' => 'Aruban Florin',
		'AZN' => 'Azerbaijani Manat',
		'BSD' => 'Bahamian Dollar',
		'BHD' => 'Bahraini Dinar',
		'BDT' => 'Bangladeshi Taka',
		'BBD' => 'Barbadian Dollar',
		'BYR' => 'Belarusian Ruble',
		'BZD' => 'Belize Dollar',
		'BMD' => 'Bermudan Dollar',
		'BTN' => 'Bhutanese Ngultrum',
		'BTC' => 'Bitcoin',
		'XBT' => 'Bitcoin',
		'BOB' => 'Bolivian Boliviano',
		'BAM' => 'Bosnia-Herzegovina Convertible Mark',
		'BWP' => 'Botswanan Pula',
		'BRL' => 'Brazilian Real',
		'BND' => 'Brunei Dollar',
		'BGN' => 'Bulgarian Lev',
		'BIF' => 'Burundian Franc',
		'KHR' => 'Cambodian Riel',
		'CVE' => 'Cape Verdean Escudo',
		'KYD' => 'Cayman Islands Dollar',
		'XOF' => 'CFA Franc BCEAO',
		'XAF' => 'CFA Franc BEAC',
		'XPF' => 'CFP Franc',
		'CLP' => 'Chilean Peso',
		'CLF' => 'Chilean Unit of Account (UF)',
		'COP' => 'Colombian Peso',
		'KMF' => 'Comorian Franc',
		'CDF' => 'Congolese Franc',
		'CRC' => 'Costa Rican Colón',
		'HRK' => 'Croatian Kuna',
		'CUP' => 'Cuban Peso',
		'CZK' => 'Czech Republic Koruna',
		'DKK' => 'Danish Krone',
		'DJF' => 'Djiboutian Franc',
		'DOP' => 'Dominican Peso',
		'XCD' => 'East Caribbean Dollar',
		'EGP' => 'Egyptian Pound',
		'ERN' => 'Eritrean Nnakfa',
		'EEK' => 'Estonian Kroon',
		'ETB' => 'Ethiopian Birr',
		'FKP' => 'Falkland Islands Pound',
		'FJD' => 'Fijian Dollar',
		'GMD' => 'Gambian Dalasi',
		'GEL' => 'Georgian Lari',
		'GHS' => 'Ghanaian Cedi',
		'GIP' => 'Gibraltar Pound',
		'XAU' => 'Gold (troy ounce)',
		'GTQ' => 'Guatemalan Quetzal',
		'GNF' => 'Guinean Franc',
		'GYD' => 'Guyanaese Dollar',
		'HTG' => 'Haitian Gourde',
		'HNL' => 'Honduran Lempira',
		'HKD' => 'Hong Kong Dollar',
		'HUF' => 'Hungarian Forint',
		'ISK' => 'Icelandic Króna',
		'INR' => 'Indian Rupee',
		'IDR' => 'Indonesian Rupiah',
		'IRR' => 'Iranian Rial',
		'IQD' => 'Iraqi Dinar',
		'ILS' => 'Israeli New Sheqel',
		'JMD' => 'Jamaican Dollar',
		'JPY' => 'Japanese Yen',
		'JEP' => 'Jersey Pound',
		'JOD' => 'Jordanian Dinar',
		'KZT' => 'Kazakhstani Tenge',
		'KES' => 'Kenyan Shilling',
		'KWD' => 'Kuwaiti Dinar',
		'KGS' => 'Kyrgystani Som',
		'LAK' => 'Laotian Kip',
		'LVL' => 'Latvian Lats',
		'LBP' => 'Lebanese Pound',
		'LSL' => 'Lesotho Loti',
		'LRD' => 'Liberian Dollar',
		'LYD' => 'Libyan Dinar',
		'LTL' => 'Lithuanian Litas',
		'MOP' => 'Macanese Pataca',
		'MKD' => 'Macedonian Denar',
		'MGA' => 'Malagasy Ariary',
		'MWK' => 'Malawian Kwacha',
		'MYR' => 'Malaysian Ringgit',
		'MVR' => 'Maldivian Rufiyaa',
		'MTL' => 'Maltese Lira',
		'MRO' => 'Mauritanian Ouguiya',
		'MUR' => 'Mauritian Rupee',
		'MXN' => 'Mexican Peso',
		'MDL' => 'Moldovan Leu',
		'MNT' => 'Mongolian Tugrik',
		'MAD' => 'Moroccan Dirham',
		'MZN' => 'Mozambican Metical',
		'MMK' => 'Myanma Kyat',
		'NAD' => 'Namibian Dollar',
		'NPR' => 'Nepalese Rupee',
		'ANG' => 'Netherlands Antillean Guilder',
		'TWD' => 'New Taiwan Dollar',
		'NZD' => 'New Zealand Dollar',
		'NIO' => 'Nicaraguan Córdoba',
		'NGN' => 'Nigerian Naira',
		'KPW' => 'North Korean Won',
		'NOK' => 'Norwegian Krone',
		'OMR' => 'Omani Rial',
		'PKR' => 'Pakistani Rupee',
		'PAB' => 'Panamanian Balboa',
		'PGK' => 'Papua New Guinean Kina',
		'PYG' => 'Paraguayan Guarani',
		'PEN' => 'Peruvian Nuevo Sol',
		'PHP' => 'Philippine Peso',
		'PLN' => 'Polish Zloty',
		'QAR' => 'Qatari Rial',
		'RON' => 'Romanian Leu',
		'RUB' => 'Russian Ruble',
		'RWF' => 'Rwandan Franc',
		'SHP' => 'Saint Helena Pound',
		'SVC' => 'Salvadoran Colón',
		'WST' => 'Samoan Tala',
		'STD' => 'São Tomé and Príncipe Dobra',
		'SAR' => 'Saudi Riyal',
		'RSD' => 'Serbian Dinar',
		'SCR' => 'Seychellois Rupee',
		'SLL' => 'Sierra Leonean Leone',
		'XAG' => 'Silver (troy ounce)',
		'SGD' => 'Singapore Dollar',
		'SBD' => 'Solomon Islands Dollar',
		'SOS' => 'Somali Shilling',
		'ZAR' => 'South African Rand',
		'KRW' => 'South Korean Won',
		'XDR' => 'Special Drawing Rights',
		'LKR' => 'Sri Lankan Rupee',
		'SDG' => 'Sudanese Pound',
		'SRD' => 'Surinamese Dollar',
		'SZL' => 'Swazi Lilangeni',
		'SEK' => 'Swedish Krona',
		'CHF' => 'Swiss Franc',
		'SYP' => 'Syrian Pound',
		'TJS' => 'Tajikistani Somoni',
		'TZS' => 'Tanzanian Shilling',
		'THB' => 'Thai Baht',
		'TOP' => 'Tongan Pa?anga',
		'TTD' => 'Trinidad and Tobago Dollar',
		'TND' => 'Tunisian Dinar',
		'TRY' => 'Turkish Lira',
		'TMT' => 'Turkmenistani Manat',
		'UGX' => 'Ugandan Shilling',
		'UAH' => 'Ukrainian Hryvnia',
		'UYU' => 'Uruguayan Peso',
		'UZS' => 'Uzbekistan Som',
		'VUV' => 'Vanuatu Vatu',
		'VEF' => 'Venezuelan Bolívar Fuerte',
		'VND' => 'Vietnamese Dong',
		'YER' => 'Yemeni Rial',
		'ZMW' => 'Zambian Kwacha',
		'ZMK' => 'Zambian Kwacha (pre-2013)',
		'ZWL' => 'Zimbabwean Dollar'
	);
	$html = '';
	
	foreach( $aCurrencies as $key => $value) {
		$html .= '<option ' . ($selected_val == $key ? 'selected' : '') . ' value="' . $key . '">' . sprintf('%s - %s', $key, $value) . '</option>';
	}
	
	return $html;
}

function bitcoinchart_styles() {
	wp_enqueue_style( 'bitcoinchart-style', plugin_dir_url( __FILE__ ) . 'css/custom-chart-style.css', array(), '1.1.2');
	wp_enqueue_style( 'bitcoinchart-jqueryui', plugin_dir_url( __FILE__ ) . 'css/jquery-ui.min.css');
}

function bitcoinchart_scripts() {
	wp_enqueue_script( 'bitcoinchart-libraries', plugin_dir_url( __FILE__ ) . 'js/libraries.js', array( 'jquery', 'jquery-ui-datepicker' ), 1, false );
	wp_enqueue_script( 'bitcoinchart-script', plugin_dir_url( __FILE__ ) . 'js/init.js', array( 'jquery', 'jquery-ui-datepicker' ), '1.1.2', false );
}

function bitcoinchart_footer() {
	?><script type="text/javascript">window.bitcoin_plugin_url = '<?php echo plugin_dir_url(__FILE__); ?>';</script><?php
}

function bitcoinchart_shortcode($attr) {
	$currency = is_array($attr) && isset($attr['currency']) ? $attr['currency'] : 'USD';
	
	$html = 'Currency: <select class="bitcoin-chart-currency-selection">' . bitcoinchart_currencies_options($currency) . '</select><div class="single-content xbtindex"><a id="bitcoinnews-logo-container" target="_blank" href="https://bitcoinnews.ch" title="BitcoinNews.ch"><img id="bitcoinnews-logo" src="' . plugin_dir_url(__FILE__) . '/images/bitcoinschweiz.png" /></a><div id="xbtindex-chart" class="chart"><div id="loadingBall"> <div class="loadingBall">Loading Chart&hellip;</div> </div> </div> <script type="text/javascript"> </script> <div class="below-price-chart"> <div> </div> </div> </div> <div id="cdbpidata"> <span class="wpsr_floatbts_anchor" data-offset="31" style="float: left;"></span> <div class="latest"> <span class="data">–</span> <span class="percent"></span> </div> <div style="" class="pricepage-data"> <dl class="data data-today"> <dt class="first">Today\'s Open</dt> <dd class="first todayopen"><span class="data">–</span></dd> <dt>Today\'s High</dt> <dd class="todayhigh"><span class="data">–</span></dd> <dt>Today\'s Low</dt> <dd class="todaylow"><span class="data">–</span></dd> </dl> <dl class="data data-other"> <dt class="first">Change</dt> <dd class="first dailychange"><span class="data">–</span></dd> <dt>Market Cap</dt> <dd class="marketcap"><span class="data">–</span></dd> <dt>Supply</dt> <dd class="totalbtx"><span class="data">–</span></dd> </dl> </div> </div><script type="text/javascript">window.current_currency = "' . $currency . '"; jQuery(document).ready(function() { var marketCenterPage = new MarketCenterPage(); }); </script>';
	return $html;
}

class BitCoinChart_Widget extends WP_Widget {

	/**
	 * Sets up the widgets name etc
	 */
	public function __construct() {
		$widget_ops = array( 
			'classname' => 'bitcoinchart widget_coindesk_price_widget',
			'description' => 'BitcoinChart Widget',
		);
		parent::__construct( 'bitcoinchart', 'BitcoinChart', $widget_ops );
	}

	/**
	 * Outputs the content of the widget
	 *
	 * @param array $args
	 * @param array $instance
	 */
	public function widget( $args, $instance ) {
		// outputs the content of the widget ?>
		<p>
			Currency:
			<select id="<?php echo $this->get_field_id('currency'); ?>" class="bitcoin-currency-selection"><?php echo bitcoinchart_currencies_options($instance['currency']); ?></select>
		</p>
		<script type="text/javascript">
			var bitcoin_charturl = "<?php echo $instance['chart_url']; ?>";
			applyWidgetCurrency("<?php echo $instance['currency']; ?>");
			jQuery('#<?php echo $this->get_field_id('currency'); ?>').change(function(event) { applyWidgetCurrency(this.value); });
		</script>
		<div class="sidebar-price-widget bitcointheme-<?php echo $instance['theme'] ?> loading" id="sidebar-price-widget"></div>
		<?php
	}

	/**
	 * Outputs the options form on admin
	 *
	 * @param array $instance The widget options
	 */
	public function form( $instance ) {
		// outputs the options form on admin
		if( isset( $instance['currency'] ) )
			$currency = $instance['currency'];
		
		if( isset( $instance['theme'] ) )
			$theme = $instance['theme'];
		
		if( isset( $instance['chart_url'] ) )
			$chart_url = $instance['chart_url'];
		
		?>
		<p>
			URL of Chart:
			<input type="text" id="<?php echo $this->get_field_id('chart-url'); ?>" name="<?php echo $this->get_field_name('chart_url'); ?>" value="<?php echo $chart_url; ?>" />
		</p>
		<p>
			Theme:
			<select id="<?php echo $this->get_field_id('theme'); ?>" name="<?php echo $this->get_field_name('theme'); ?>" class="bitcoin-theme-selection">
				<option value="light" <?php echo $theme == 'light' ? 'selected' : ''; ?>>Light</option>
				<option value="dark"  <?php echo $theme == 'dark' ? 'selected' : ''; ?>>Dark</option>
			</select>
		</p>
		<p>
			<label for="">Currency:</label>
			<select name="<?php echo $this->get_field_name('currency'); ?>"><?php echo bitcoinchart_currencies_options($instance['currency']); ?></select>
		</p>
		<?php
	}

	/**
	 * Processing widget options on save
	 *
	 * @param array $new_instance The new options
	 * @param array $old_instance The previous options
	 *
	 * @return array
	 */
	public function update( $new_instance, $old_instance ) {
		// processes widget options to be saved
		$instance = array('currency' => 'USD', 'theme' => 'dark', 'chart_url' => 'https://www.bitcoinnews.ch/bitcoin-kurs/');
		
		if( isset($new_instance['currency']) )
			$instance['currency'] = strip_tags($new_instance['currency']);
		
		if( isset($new_instance['theme']) )
			$instance['theme'] = strip_tags($new_instance['theme']);
		
		if( isset($new_instance['chart_url']) )
			$instance['chart_url'] = strip_tags($new_instance['chart_url']);
			
		return $instance;
	}
}

add_action( 'wp_enqueue_scripts', 'bitcoinchart_scripts' );
add_action( 'wp_enqueue_scripts', 'bitcoinchart_styles' );
add_action( 'wp_footer', 'bitcoinchart_footer' );
add_shortcode('bitcoinchart', 'bitcoinchart_shortcode');
add_action('widgets_init',
	create_function('', 'return register_widget("BitCoinChart_Widget");')
);