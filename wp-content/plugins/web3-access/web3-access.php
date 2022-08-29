<?php
/*
Plugin Name: Web3 Access
Plugin URI:  https://metapress.ca
Description: Web3 Access (formerly MetaPress) is a web3 wallet plugin for WordPress that allows you to accept cryptocurrency payments via MetaMask or other browser wallets for access to content on your WordPress website. Restrict specific content or entire Pages, Posts and custom content types to NFT owners, specific cryptocurrency holders OR visitors that make a transaction via a web3 browser wallet.
Author:      Rogue Web Design
Author URI:  https://www.roguewebdesign.ca
Version:     1.3.7
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Domain Path: /languages
Text Domain: wp-metapress
*/

if(!defined('METAPRESS_PLUGIN_BASE_URL')) {
	define('METAPRESS_PLUGIN_BASE_URL', plugin_dir_url(__FILE__));
}
if(!defined('METAPRESS_PLUGIN_BASE_DIR')) {
	define('METAPRESS_PLUGIN_BASE_DIR', dirname(__FILE__));
}

global $wp_metapress_version;
global $wp_metapress_textdomain;
global $wp_metapress_text_settings;
$wp_metapress_version = get_option('wp_metapress_plugin_version');
$wp_metapress_textdomain = 'wp-metapress';
$wp_metapress_text_settings = get_option('metapress_text_settings', array(
	'restricted_text' => __('Sorry, this content is restricted', $wp_metapress_textdomain),
	'product_purchase_text' => __('Please purchase one of the following products to access this content', $wp_metapress_textdomain),
	'ownership_verification_text' => __('Verify your ownership of one of these tokens to access this content', $wp_metapress_textdomain),
	'checkout_purchasing_text' => __('You are purchasing ', $wp_metapress_textdomain) . '{product_title}',
	'checkout_product_access_text' => __('This product includes NFT and token access. If you own any of the following tokens, you may already have access to this products contents', $wp_metapress_textdomain)
));


if( ! defined('INSTALLED_METAPRESS_PLUGIN_VERSION') ) {
    define('INSTALLED_METAPRESS_PLUGIN_VERSION', '1.3.7');
}

function wp_metapress_add_query_vars_filter( $vars ) {
  $vars[] = "mpp";
  return $vars;
}
add_filter( 'query_vars', 'wp_metapress_add_query_vars_filter' );

function metapress_plugin_activation() {
  if (version_compare(PHP_VERSION, '5.5') < 0) {
      $upgrade_message = 'You need to upgrade to at least PHP version 5.5 to use the Web3 Access plugin. <br><a href="'.admin_url('plugins.php').'">&laquo; Return to Plugins</a>';
      wp_die($upgrade_message, 'PHP Version Update Required');
  }
	require_once('includes/create-tables.php');
	if( ! get_option('metapress_pages_created') ) {
			$metapress_checkout_page_content = array(
		    'post_type' => 'page',
		    'post_title'    => 'Checkout',
		    'post_content' => '<!-- wp:shortcode -->[metapress-checkout]<!-- /wp:shortcode -->',
		    'post_status'   => 'publish'
		  );

			$metapress_transactions_page_content = array(
		    'post_type' => 'page',
		    'post_title'    => 'Transactions',
		    'post_content' => '<!-- wp:shortcode -->[metapress-transactions]<!-- /wp:shortcode -->',
		    'post_status'   => 'publish'
		  );
		  $metapress_checkout_page_id = wp_insert_post( $metapress_checkout_page_content );
		  $metapress_transactions_page_id = wp_insert_post( $metapress_transactions_page_content );
		  update_option('metapress_checkout_page', $metapress_checkout_page_id);
			update_option('metapress_transactions_page', $metapress_transactions_page_id);
			update_option('metapress_pages_created', true);
	}
	update_option('metapress_update_request_key', 'c9d5613fd30c851f276ef20e08079edd9a9d5bd85e1a7800813fd10c6666eb57');
}
register_activation_hook( __FILE__, 'metapress_plugin_activation' );

function metapress_plugin_deactivation() {}
register_deactivation_hook( __FILE__, 'metapress_plugin_deactivation' );

require_once('custom/setup.php');

require_once('convert/ratios.php');

// LOAD CLASSES
require_once('includes/metapress-access-tokens.php');
require_once('includes/metapress-payments.php');

// LOAD SCRIPTS
require_once('includes/scripts.php');

require_once('includes/payment-options.php');

// CUSTOM BLOCKS
require_once('blocks/index.php');

// CONTENT FILTER
require_once('includes/content-filter.php');

require_once('includes/rest-api.php');

require_once('includes/woocommerce-filter.php');

if( is_admin() ) {
	require_once('admin/pages.php');
	require_once('admin/admin-ajax.php');
	require_once('updates/automatic-updates.php');
}
