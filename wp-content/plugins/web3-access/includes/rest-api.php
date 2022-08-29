<?php

class MetaPress_Plugin_Rest_Api_Manager extends WP_REST_Controller {
    public $current_time;
    public function __construct() {
        $this->current_time = current_time('timestamp', 1);
        $this->request_key_match = get_option('metapress_api_request_match');
        add_action( 'rest_api_init', array($this, 'register_metapress_plugin_api_endpoint_routes') );
    }

    public function register_metapress_plugin_api_endpoint_routes() {

        register_rest_route( 'metapress/v2', '/transactions/', array(
                'methods'  => 'GET',
                'callback' => array($this, 'list_user_transactions'),
                'permission_callback' => array($this, 'metapress_permissions_check' ),
            )
        );

        register_rest_route( 'metapress/v2', '/productdata/', array(
                'methods'  => 'GET',
                'callback' => array($this, 'list_product_content'),
                'permission_callback' => array($this, 'metapress_permissions_check' ),
            )
        );

        register_rest_route( 'metapress/v2', '/productprice/', array(
                'methods'  => 'GET',
                'callback' => array($this, 'verify_metapress_product_price'),
                'permission_callback' => array($this, 'metapress_permissions_check' ),
            )
        );

        register_rest_route( 'metapress/v2', '/productaccess/', array(
                'methods'  => 'GET',
                'callback' => array($this, 'metapress_check_products_access'),
                'permission_callback' => array($this, 'metapress_permissions_check' ),
            )
        );

        register_rest_route( 'metapress/v2', '/nfttoken/', array(
                'methods'  => 'POST',
                'callback' => array($this, 'metapress_create_nft_access_token'),
                'permission_callback' => array($this, 'metapress_permissions_check' ),
            )
        );

        register_rest_route( 'metapress/v2', '/newtransaction/', array(
                'methods'  => 'POST',
                'callback' => array($this, 'create_metapress_transaction'),
                'permission_callback' => array($this, 'metapress_permissions_check' ),
            )
        );

        register_rest_route( 'metapress/v2', '/paytransaction/', array(
                'methods'  => 'POST',
                'callback' => array($this, 'metapress_mark_transaction_as_paid'),
                'permission_callback' => array($this, 'metapress_permissions_check' ),
            )
        );

        register_rest_route( 'metapress/v2', '/updatetransaction/', array(
                'methods'  => 'POST',
                'callback' => array($this, 'update_metapress_transaction'),
                'permission_callback' => array($this, 'metapress_permissions_check' ),
            )
        );

        register_rest_route( 'metapress/v2', '/deletetransaction/', array(
                'methods'  => 'POST',
                'callback' => array($this, 'metapress_remove_transaction'),
                'permission_callback' => array($this, 'metapress_permissions_check' ),
            )
        );

    }

    private function verify_request_key($mp_request_key) {
        if( $mp_request_key != $this->request_key_match ) {
            return false;
        } else {
            return true;
        }
    }

    public function metapress_permissions_check( $request ) {
        $api_key = $request->get_param('request_key');
        return $this->verify_request_key($api_key);
    }

    public function list_user_transactions($request) {
        $wallet_address = $request->get_param('mpwalletaddress');
        if( empty($wallet_address) ) {
            return $this->handle_error( __('Invalid request', 'rogue-themes') );
        }

        $offset = 0;
        $token = null;
        $payment_status = null;
        $filters = array();
        if( isset($_GET["offset"]) ) {
            $offset = intval($_GET["offset"]);
        }

        if( isset($_GET["token"]) && ! empty($_GET["token"]) ) {
            $filters['token'] = sanitize_key($_GET["token"]);
        }

        if( isset($_GET["status"]) && ! empty($_GET["status"]) ) {
            $filters['status'] = sanitize_text_field($_GET["status"]);
        }

        $metapress_payments_manager = new METAPRESS_PAYMENTS_MANAGER();
        $payments = $metapress_payments_manager->get_wallet_address_payments($wallet_address, $offset, $filters);
        $count_payments = 0;
        $found_payments = array();
        if( ! empty($payments) ) {
            $count_payments = count($payments);
            foreach($payments as $payment) {
                $view_transaction_url = $metapress_payments_manager->find_network_explorer_url($payment->network);
                if (substr($view_transaction_url, -1) !== '/') {
                    $view_transaction_url .= '/';
                }
                $view_transaction_url .= 'tx/'.$payment->transaction_hash;
                $product_name = get_the_title($payment->product_id);
                $add_payment = array(
                    'id' => $payment->id,
                    'token'  => $payment->token,
                    'sent_amount'  => number_format($payment->sent_amount, 8),
                    'transaction_time' => wp_date('F j, Y', $payment->transaction_time),
                    'network' => $payment->network,
                    'transaction_hash' => $payment->transaction_hash,
                    'transaction_status' => $payment->transaction_status,
                    'view_url' => $view_transaction_url,
                    'product_name' => $product_name,
                    'product_id' => $payment->product_id,
                );
                $found_payments[] = $add_payment;
            }
        }
        return new WP_REST_Response(array('count' => $count_payments, 'payments' => $found_payments), 200);
    }

    public function list_product_content($request) {
        $wallet_address = $request->get_param('mpwalletaddress');
        $product_id = $request->get_param('productid');

        if( empty($wallet_address) ) {
            return $this->handle_error( __('Invalid request', 'rogue-themes') );
        }

        $has_access = false;
        $product_content = array();

        $metapress_payments_manager = new METAPRESS_PAYMENTS_MANAGER();
        $existing_payment = $metapress_payments_manager->find_payment_for_product($product_id, $wallet_address);

        if( ! empty($existing_payment) ) {
            $has_access = true;
            $existing_payment->product_id;
            $product_content = $this->get_pages_with_product($existing_payment->product_id);
        }
        return new WP_REST_Response(array('has_access' => $has_access, 'content' => $product_content), 200);
    }

    private function get_pages_with_product($product_id) {
      $found_pages = array();
      $metapress_supported_post_types = get_option('metapress_supported_post_types');
      if( empty($metapress_supported_post_types) ) {
        $metapress_supported_post_types = array('post', 'page');
      }
      $page_args = array(
        'post_type' => $metapress_supported_post_types,
        'post_status' => 'publish',
        'numberposts' => -1,
        'fields' => 'ids',
        'meta_query' => array(
          array(
            'key' => 'metapress_required_products',
            'value' => $product_id,
            'compare' =>  'LIKE'
          ),
        ),
      );
      $pages_with_restrictions = get_posts($page_args);
      if( ! empty($pages_with_restrictions) ) {
        foreach($pages_with_restrictions as $restricted_page_id) {
          $found_pages[] =  array(
            'id' => $restricted_page_id,
            'name' => get_the_title($restricted_page_id),
            'link' => get_the_permalink($restricted_page_id),
            'type' => 'page',
          );
        }
      }
      return $found_pages;
    }

    public function verify_metapress_product_price($request) {

        $wallet_address = sanitize_key($request->get_param('mpwalletaddress'));
        $product_id = intval($request->get_param('productid'));

        if( empty($wallet_address) || empty($product_id) ) {
            return $this->handle_error( __('Invalid request', 'rogue-themes') );
        }

        $product_access_data = array('has_access' => false);

        $product_price = get_post_meta($product_id, 'product_price', true);

        // CHECK IF VALID ACCESS TOKEN FOR WALLET EXISTS
        $metapress_access_token_manager = new METAPRESS_ACCESS_TOKENS_MANAGER();
        $token_exists = $metapress_access_token_manager->token_exists($product_id, $wallet_address);
        if( ! empty($token_exists) ) {
            if( isset($token_exists->expires) && ( $token_exists->expires > current_time('timestamp') ) ) {
                $product_access_data = array('has_access' => true, 'access_token' => $token_exists->token);
            } else {
                $metapress_access_token_manager->delete_access_token($token_exists->id);
            }
        }

        if( ! $product_access_data['has_access'] ) {
            // CHECK IF SPENDER HAS ALREADY PAID
            $metapress_payments_manager = new METAPRESS_PAYMENTS_MANAGER();
            $existing_payment = $metapress_payments_manager->find_payment_for_product($product_id, $wallet_address);

            // EXISTING PAID PAYMENT FOR PRODUCT EXISTS
            if( ! empty($existing_payment) ) {
                // ADDRESS HAS PAID TRANSACTION SO CREATE NEW ACCESS TOKEN
                $new_access_token = $metapress_access_token_manager->create_access_token(array('product_id' => $product_id, 'payment_owner' => $wallet_address));
                if( ! empty($new_access_token) ) {
                    $product_access_data = array('has_access' => true, 'access_token' => $new_access_token);
                }
            } else {
                //EXISTING PENDING PAYMENT FOR PRODUCT
                $existing_payment = $metapress_payments_manager->find_pending_payment_for_product($product_id, $wallet_address);
                if( ! empty($existing_payment) ) {
                    $product_access_data = (array) $existing_payment;
                    $view_transaction_url = $metapress_payments_manager->find_network_explorer_url($existing_payment->network);
                    $product_access_data['transaction_url'] = $view_transaction_url;
                }
            }
        }

        if( ! empty($product_price) ) {
            $product_access_data['price'] = $product_price;
        }
        return new WP_REST_Response($product_access_data, 200);
    }

    /*
    *
    * CREATES A NEW TRANSACTION
    */
    public function create_metapress_transaction($request) {

        $product_id = intval($request->get_param('productid'));
        $token_used = sanitize_text_field($request->get_param('token'));
        $sent_amount = sanitize_text_field($request->get_param('token_amount'));
        $token_network = sanitize_text_field($request->get_param('network'));
        $transaction_hash = sanitize_text_field($request->get_param('transaction_hash'));
        $wallet_address = sanitize_key($request->get_param('mpwalletaddress'));
        $wallet_address = strtolower($wallet_address);

        if( empty($product_id) ) {
            return $this->handle_error( __('Missing Product ID', 'rogue-themes') );
        }

        if( empty($transaction_hash) ) {
            return $this->handle_error( __('Missing transaction', 'rogue-themes') );
        }

        if( empty($wallet_address) ) {
            return $this->handle_error( __('Missing wallet address', 'rogue-themes') );
        }

        if( empty($token_used) ) {
            return $this->handle_error( __('Missing token that was used to pay', 'rogue-themes') );
        }

        if( empty($sent_amount) ) {
            return $this->handle_error( __('Missing payment amount', 'rogue-themes') );
        }

        if( empty($token_network) ) {
            return $this->handle_error( __('Missing network provider', 'rogue-themes') );
        }

        if( $request->has_param('txn_status') && $request->get_param('txn_status') == 'approval' ) {
            $transaction_status = 'approval';
        } else {
            $transaction_status = 'pending';
        }

        if(  $request->has_param('contract_address') && ! empty($request->get_param('contract_address')) ) {
            $contract_address = sanitize_key($request->get_param('contract_address'));
        } else {
            $contract_address = null;
        }

        $transaction_fee = bcmul($sent_amount, 0.01, 18);
        $token_amount = bcsub($sent_amount, $transaction_fee, 18);

        $new_payment = array(
            'product_id' => $product_id,
            'payment_owner' => $wallet_address,
            'token' => $token_used,
            'token_amount' => $token_amount,
            'sent_amount' => $sent_amount,
            'network' => $token_network,
            'transaction_time' => current_time('timestamp'),
            'transaction_hash' => $transaction_hash,
            'transaction_status' => $transaction_status,
            'contract_address' => $contract_address,
        );

        $metapress_payments_manager = new METAPRESS_PAYMENTS_MANAGER();
        $new_payment_id = $metapress_payments_manager->create_payment($new_payment);
        if( ! empty($new_payment_id) ) {
            return new WP_REST_Response(array('success' => true), 200);
        } else {
            return $this->handle_error( __('Transaction creation failed', 'rogue-themes') );
        }
    }

    public function metapress_mark_transaction_as_paid($request) {

        $product_id = intval($request->get_param('productid'));
        $transaction_hash = sanitize_text_field($request->get_param('transaction_hash'));
        $wallet_address = sanitize_key($request->get_param('mpwalletaddress'));
        $wallet_address = strtolower($wallet_address);

        if( empty($product_id) ) {
            return $this->handle_error( __('Missing Product ID', 'rogue-themes') );
        }

        if( empty($transaction_hash) ) {
            return $this->handle_error( __('Missing transaction hash', 'rogue-themes') );
        }

        if( empty($wallet_address) ) {
            return $this->handle_error( __('Missing wallet address', 'rogue-themes') );
        }

        $payment_updated = false;

        $metapress_payments_manager = new METAPRESS_PAYMENTS_MANAGER();
        $existing_payment = $metapress_payments_manager->find_payment_with_hash($product_id, $wallet_address, $transaction_hash);
        if( ! empty($existing_payment) ) {
            if( $existing_payment->transaction_status == 'paid' ) {
              $payment_updated = true;
            } else {
              $payment_updated = $metapress_payments_manager->update_payment($existing_payment->id, array('transaction_status' => 'paid'));
            }
        }
        if( $payment_updated ) {
            $metapress_access_token_manager = new METAPRESS_ACCESS_TOKENS_MANAGER();
            $new_access_token = $metapress_access_token_manager->create_access_token(array('product_id' => $product_id, 'payment_owner' => $wallet_address));
            return new WP_REST_Response(array('success' => true, 'access_token' => $new_access_token), 200);
        } else {
            return $this->handle_error( __('Transaction failed to update transaction', 'rogue-themes') );
        }
    }

    public function update_metapress_transaction($request) {
        $product_id = intval($request->get_param('productid'));
        $transaction_hash = sanitize_text_field($request->get_param('transaction_hash'));
        $transaction_id = sanitize_text_field($request->get_param('transaction_id'));
        $wallet_address = sanitize_key($request->get_param('mpwalletaddress'));
        $wallet_address = strtolower($wallet_address);

        if( empty($product_id) ) {
            return $this->handle_error( __('Missing Product ID', 'rogue-themes') );
        }

        if( empty($transaction_hash) ) {
            return $this->handle_error( __('Missing transaction hash', 'rogue-themes') );
        }

        if( empty($transaction_id) ) {
            return $this->handle_error( __('Missing transaction ID', 'rogue-themes') );
        }

        if( empty($wallet_address) ) {
            return $this->handle_error( __('Missing wallet address', 'rogue-themes') );
        }

        $update_payment = array(
            'transaction_time' => current_time('timestamp'),
            'transaction_hash' => $transaction_hash,
            'transaction_status' => 'pending',
        );

        $metapress_payments_manager = new METAPRESS_PAYMENTS_MANAGER();
        $existing_payment = $metapress_payments_manager->get_payment($transaction_id);
        if( ! empty($existing_payment) && $existing_payment->payment_owner == $wallet_address) {
            $payment_updated = $metapress_payments_manager->update_payment($transaction_id, $update_payment);
        } else {
            $payment_updated = false;
        }

        if( ! empty($payment_updated) ) {
            return new WP_REST_Response(array('updated' => true), 200);
        } else {
            return $this->handle_error( __('Could not update approval transaction', 'rogue-themes') );
        }
    }

    public function metapress_remove_transaction($request) {

        $product_id = intval($request->get_param('productid'));
        $transaction_hash = sanitize_text_field($request->get_param('transaction_hash'));
        $wallet_address = sanitize_key($request->get_param('mpwalletaddress'));
        $wallet_address = strtolower($wallet_address);

        if( empty($product_id) ) {
            return $this->handle_error( __('Missing Product ID', 'rogue-themes') );
        }

        if( empty($transaction_hash) ) {
            return $this->handle_error( __('Missing transaction hash', 'rogue-themes') );
        }

        if( empty($wallet_address) ) {
            return $this->handle_error( __('Missing wallet address', 'rogue-themes') );
        }

        $payment_deleted = false;

        $metapress_payments_manager = new METAPRESS_PAYMENTS_MANAGER();
        $existing_payment = $metapress_payments_manager->find_payment_with_hash($product_id, $wallet_address, $transaction_hash);
        if( ! empty($existing_payment) && $existing_payment->transaction_status != 'paid' ) {
            $payment_deleted = $metapress_payments_manager->delete_payment($existing_payment->id);
        }
        if( $payment_deleted ) {
            return new WP_REST_Response(array('success' => true), 200);
        } else {
            return $this->handle_error( __('Transaction was not deleted', 'rogue-themes') );
        }
    }

    public function metapress_check_products_access($request) {

        if( ! $request->has_param('products') ) {
            return $this->handle_error( __('Missing Products', 'rogue-themes') );
        }

        if( ! $request->has_param('mpwalletaddress') ) {
            return $this->handle_error( __('Missing wallet address', 'rogue-themes') );
        }
        $product_ids = urldecode($request->get_param('products'));
        $product_ids = explode(',', $product_ids);
        $product_ids =  is_array( $product_ids ) ? array_map( 'intval', $product_ids ) : array();
        $wallet_address = sanitize_key($request->get_param('mpwalletaddress'));
        $wallet_address = strtolower($wallet_address);
        $product_access_data = array('has_access' => false);

        if( ! empty($product_ids) ) {

            // CHECK IF SPENDER HAS ALREADY PAID
            $metapress_payments_manager = new METAPRESS_PAYMENTS_MANAGER();

            foreach($product_ids as $product_id) {
                $product_id = sanitize_key($product_id);
                $product_id = intval($product_id);

                $metapress_access_token_manager = new METAPRESS_ACCESS_TOKENS_MANAGER();
                $token_exists = $metapress_access_token_manager->token_exists($product_id, $wallet_address);
                if( ! empty($token_exists) ) {
                    if( isset($token_exists->expires) && ($token_exists->expires > current_time('timestamp') ) ) {
                        $product_access_data = array('has_access' => true, 'access_token' => $token_exists->token, 'product_id' => $product_id);
                        break;
                    } else {
                        $metapress_access_token_manager->delete_access_token($token_exists->id);
                    }
                }

                if( ! $product_access_data['has_access'] ) {
                    $existing_payment = $metapress_payments_manager->find_payment_for_product($product_id, $wallet_address);
                    // EXISTING PAID PAYMENT FOR PRODUCT EXISTS
                    if( ! empty($existing_payment) ) {
                        // ADDRESS HAS PAID TRANSACTION SO CREATE NEW ACCESS TOKEN
                        $new_access_token = $metapress_access_token_manager->create_access_token(array('product_id' => $product_id, 'payment_owner' => $wallet_address));
                        if( ! empty($new_access_token) ) {
                            $product_access_data = array('has_access' => true, 'access_token' => $new_access_token, 'product_id' => $product_id);
                            break;
                        }
                    } else {
                        //EXISTING PENDING PAYMENT FOR PRODUCT
                        $existing_payment = $metapress_payments_manager->find_pending_payment_for_product($product_id, $wallet_address);
                        if( ! empty($existing_payment) ) {
                            $product_access_data = (array) $existing_payment;
                            $view_transaction_url = $metapress_payments_manager->find_network_explorer_url($existing_payment->network);
                            $product_access_data['transaction_url'] = $view_transaction_url;
                            break;
                        }
                    }
                }
            }
        } else {
            return $this->handle_error( __('Missing product IDs', 'rogue-themes') );
        }
        return new WP_REST_Response($product_access_data, 200);
    }

    public function metapress_create_nft_access_token($request) {

        $product_id = intval($request->get_param('productid'));
        $wallet_address = sanitize_key($request->get_param('mpwalletaddress'));
        $wallet_address = strtolower($wallet_address);

        if( empty($product_id) ) {
            return $this->handle_error( __('Missing Product ID', 'rogue-themes') );
        }

        if( empty($wallet_address) ) {
            return $this->handle_error( __('Missing wallet address', 'rogue-themes') );
        }

        if( ! $request->has_param('nft_owner_verification_timestamp') ) {
            return $this->handle_error( __('NFT nonce verification missing', 'rogue-themes') );
        }

        if( $request->has_param('mpredirect') ) {
            $mp_redirect_url = sanitize_url($request->get_param('mpredirect'));
        } else {
            $mp_redirect_url = null;
        }

        $nft_nonce_timestamp = intval($request->get_param('nft_owner_verification_timestamp'));
        $request_current_time = current_time('timestamp', 1);

        if( $nft_nonce_timestamp >= $request_current_time ) {

            $product_access_data = array('success' => false);

            $metapress_access_token_manager = new METAPRESS_ACCESS_TOKENS_MANAGER();

            $token_exists = $metapress_access_token_manager->token_exists($product_id, $wallet_address);
            if( ! empty($token_exists) ) {
                if( isset($token_exists->expires) && ( $token_exists->expires > current_time('timestamp') ) ) {
                    $product_access_data = array('success' => true, 'access_token' => $token_exists->token);
                    $new_access_token = $token_exists->token;
                } else {
                    $metapress_access_token_manager->delete_access_token($token_exists->id);
                }
            }

            if( ! $product_access_data['success'] ) {
                $new_access_token = $metapress_access_token_manager->create_access_token(array('product_id' => $product_id, 'payment_owner' => $wallet_address));
                if( ! empty($new_access_token) ) {
                    $product_access_data = array('success' => true, 'access_token' => $new_access_token);
                }
            }

            if( ! empty($mp_redirect_url) ) {
                $product_access_data['redirect'] = $mp_redirect_url.'?mpatok='.$new_access_token;
            }
            return new WP_REST_Response($product_access_data, 200);
        } else {
            return $this->handle_error( __('Invalid request. Please refresh the page and try again.', 'rogue-themes') );
        }
    }

    public function handle_error( $error_message ) {
        return new WP_REST_Response(array(
            'error' => $error_message,
        ), 400);
    }

}
$metaPress_plugin_rest_api_manager = new MetaPress_Plugin_Rest_Api_Manager();
