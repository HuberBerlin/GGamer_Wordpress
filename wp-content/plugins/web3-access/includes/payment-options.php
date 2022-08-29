<?php

class METAPRESS_PAYMENT_OPTIONS_GEN {

	private $supported_networks;
    private $custom_tokens = array();
	protected $live_mode;

	public function __construct() {
		$metapress_live_mode = get_option('metapress_live_mode', 0);
        if( $metapress_live_mode ) {
			$this->live_mode = true;
			$this->supported_networks = get_option('metapress_supported_networks');
        } else {
			$this->live_mode = false;
			$this->supported_networks = get_option('metapress_supported_test_networks');
        }
		$this->custom_tokens = get_option('metapress_custom_tokens_list', array());
	}

	public function generate_payment_options_html($product_id) {
		global $wp_metapress_textdomain;
		global $wp_metapress_text_settings;
		$metapress_payment_options = "";
		if( ! empty($product_id) ) {
			$product_price = get_post_meta( $product_id, 'product_price', true );
			$metapress_payment_options = '<div class="metapress-access-buttons">';
			if( ! empty($product_price) && $product_price > 0 ) {
				if( ! empty($this->supported_networks) ) {
					foreach($this->supported_networks as $network_button) {
						if( isset($network_button['enabled']) ) {
							$network_pay_with_text = sanitize_text_field(__('Pay with ', $wp_metapress_textdomain).$network_button['symbol']);
							$metapress_payment_options .= '<div class="metapress-payment-button" data-product-id="'.$product_id.'" data-token="'.$network_button['symbol'].'" data-network="'.$network_button['slug'].'" data-networkname="'.$network_button['name'].'" data-chainid="'.$network_button['chainid'].'"';

							$metapress_payment_options .= ' data-wallet="'.$network_button['receiving_address'].'" data-explorer="'.$network_button['explorer'].'"><img src="'.$network_button['icon'].'" alt="'.$network_pay_with_text.'" /> <span class="metapress-payment-button-text">'.$network_pay_with_text.'</span><span class="metapress-payment-button-amount"></span></div> ';
						}
					}
				}

				// ADD CUSTOM TOKENS
                if( ! empty($this->custom_tokens) ) {
                    foreach($this->custom_tokens as $custom_token) {
						if( isset($custom_token['enabled']) ) {
                            $pay_with_text = sanitize_text_field(__('Pay with ', $wp_metapress_textdomain).$custom_token['name']);
							if( $this->live_mode ) {
                                $token_network = sanitize_text_field($custom_token['network']);
                                $token_network_name = sanitize_text_field($custom_token['networkname']);
                                $token_network_chainid = sanitize_text_field($custom_token['chainid']);
								$token_network_explorer = sanitize_url($custom_token['explorer']);
                                $add_test_token_class = "";
                            } else {
                                $token_network = sanitize_text_field($custom_token['test_network']);
                                $token_network_name = sanitize_text_field($custom_token['test_networkname']);
                                $token_network_chainid = sanitize_text_field($custom_token['test_chainid']);
								$token_network_explorer = sanitize_url($custom_token['test_explorer']);
                                $add_test_token_class = " test-token";
                            }
							$metapress_payment_options .= '<div class="metapress-payment-button'.$add_test_token_class.'" data-product-id="'.$product_id.'" data-token="'.$custom_token['currency_symbol'].'" data-network="'.$token_network.'" data-address="'.$custom_token['contract_address'].'"  data-test-address="'.$custom_token['test_contract_address'].'"';

                            $metapress_payment_options .= ' data-explorer="'.$token_network_explorer.'" data-networkname="'.$token_network_name.'" data-chainid="'.$token_network_chainid.'"><img src="'.$custom_token['icon'].'" alt="'.$pay_with_text.'" /> <span class="metapress-payment-button-text">'.$pay_with_text.'</span><span class="metapress-payment-button-amount"></span></div> ';
						}
                    }
                }
				// END CUSTOM TOKENS
			}

			// CHECK FOR NFT ACCESS
			$product_nft_access_list = get_post_meta($product_id, 'product_nft_access_list', true );

			if( ! empty($product_nft_access_list) ) {
				$nft_access_nonce = strtotime('+1 hour', current_time('timestamp', 1));
				$metapress_payment_options .= '<div id="metapress-nft-verification-text" data-noncetimestamp="'.$nft_access_nonce.'"><p>'.$wp_metapress_text_settings['ownership_verification_text'].'.</p></div>';
	            foreach($product_nft_access_list as $nft_token) {
					if( ! isset($nft_token['minimum_balance']) ) {
						$nft_token['minimum_balance'] = 1;
					}
					$nft_token_data = $this->sanitize_nft_array($nft_token);
					$nft_collection_slug = "";
					$nft_minimum_balance = 1;
					if( isset($nft_token_data['token_image']) && ! empty($nft_token_data['token_image']) ) {
						$nft_asset_image = $nft_token_data['token_image'];
					} else {
						$nft_asset_image = METAPRESS_PLUGIN_BASE_URL.'images/metapress-logo-icon.png';
					}

					if( isset($nft_token_data['collection_slug']) && ! empty($nft_token_data['collection_slug']) ) {
						$nft_collection_slug = $nft_token_data['collection_slug'];
					}

					if( ! empty($nft_token_data['minimum_balance']) ) {
						$nft_minimum_balance = $nft_token_data['minimum_balance'];
						if( $nft_minimum_balance < 1 ) {
							$nft_minimum_balance = 1;
						}
					}

					$metapress_payment_options .= '<div class="metapress-verify-nft-owner"
					data-token="'.$nft_token_data['token_id'].'"
					data-contract-address="'.$nft_token_data['contract_address'].'"
					data-token-type="'.$nft_token_data['token_type'].'"
					data-network="'.$nft_token_data['network'].'"
					data-networkname="'.$nft_token_data['networkname'].'"
					data-chainid="'.$nft_token_data['chainid'].'"
					data-product-id="'.$product_id.'"
					data-minimum="'.$nft_minimum_balance.'"
					data-collection="'.$nft_collection_slug.'">';

					$metapress_payment_options .= '<img src="'.$nft_asset_image.'" alt="'.$nft_token_data['token_name'].'" /> <span class="nft-name">'.$nft_token_data['token_name'].'</span>';
					$metapress_payment_options .= '<div class="metapress-verify-buttons"><div class="metapress-verify-button"><span class="verify-text">'.__('Confirm Ownership', $wp_metapress_textdomain).'</span></div><div class="metapress-verify-link"><a class="nft-link" href="'.$nft_token_data['token_url'].'" target="_blank" title="'.__('View NFT', $wp_metapress_textdomain).'">'.__('View', $wp_metapress_textdomain).' <span class="dashicons dashicons-external"></span></a></div></div></div>';
				}
			}
			$metapress_payment_options .= '</div>';
		}
		return $metapress_payment_options;
	}

	protected function sanitize_nft_array($array_data) {
		if( ! empty($array_data) && is_array($array_data) ) {
			$array_data['name'] = sanitize_text_field($array_data['name']);
			$array_data['contract_address'] = sanitize_key($array_data['contract_address']);
			$array_data['token_id'] = sanitize_text_field($array_data['token_id']);
			$array_data['token_name'] = sanitize_text_field($array_data['token_name']);
			$array_data['token_image'] = sanitize_url($array_data['token_image']);
			$array_data['token_url'] = sanitize_url($array_data['token_url']);
			$array_data['collection_slug'] = sanitize_text_field($array_data['collection_slug']);
			$array_data['token_type'] = sanitize_text_field($array_data['token_type']);
			$array_data['network'] = sanitize_text_field($array_data['network']);
			$array_data['networkname'] = sanitize_text_field($array_data['networkname']);
			$array_data['chainid'] = sanitize_key($array_data['chainid']);
			$array_data['minimum_balance'] = intval($array_data['minimum_balance']);
		} else {
			$array_data = array();
		}
		return $array_data;
	}
}
