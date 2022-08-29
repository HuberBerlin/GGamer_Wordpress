<div class="wrap">
    <?php include('metapress-admin-header.php'); ?>
    <div class="metapress-plugin-settings">
        <form method="post" action="options.php">
            <?php
              global $wp_metapress_textdomain;
              settings_fields( 'metapress-plugin-options' );
              $metapress_live_mode = get_option('metapress_live_mode', 0);
              $metapress_mode_notice = __('You are in Live Mode. This is the wallet address you will receive payments at', $wp_metapress_textdomain);
              $metapress_wallet_addresses = get_option('metapress_wallet_addresses');
              $metapress_test_wallet_addresses = get_option('metapress_test_wallet_addresses');
              $metapress_allowed_test_address = get_option('metapress_allowed_test_address');
              if( ! $metapress_live_mode ) {
                $metapress_mode_notice = __('You are in Test Mode. This is the wallet address you will receive payments at', $wp_metapress_textdomain);
              }
              $metapress_binance_cron = get_option('metapress_binance_cron', 1);
              $token_ratios_last_updated = get_option('metapress_token_ratios_updated_timestamp');
              $metapress_token_ratios = get_option('metapress_token_ratios', array());
              $metapress_supported_post_types = get_option('metapress_supported_post_types');
              $metapress_woocommerce_filters_enabled = get_option('metapress_woocommerce_filters_enabled');
              if( empty($metapress_supported_post_types) ) {
                $metapress_supported_post_types = array();
              }
              $metapress_site_post_types = get_post_types();
              $not_allowed_post_types = array(
                'metapress_product',
                'attachment',
                'revision',
                'nav_menu_item',
                'custom_css',
                'customize_changeset',
                'oembed_cache',
                'user_request',
                'wp_block',
                'wp_template',
              );
              $metapress_checkout_page = get_option('metapress_checkout_page');
        	  $metapress_transactions_page = get_option('metapress_transactions_page');
              $existing_pages = get_pages();
            ?>
            <div class="metapress-admin-section metapress-border-box">
              <h1><?php _e('Web3 Access Settings', $wp_metapress_textdomain); ?></h1>
              <div class="metapress-admin-settings metapress-border-box metapress-width-600">
                <div class="metapress-grid metapress-setting">
                  <div class="metapress-setting-title">
                    <?php _e('Live Mode', $wp_metapress_textdomain); ?>
                  </div>
                  <div class="metapress-setting-content metapress-align-right">
                    <input name="metapress_live_mode" type="checkbox" value="1" <?php checked(1, $metapress_live_mode); ?> />
                  </div>
                </div>
              </div>
              <div class="metapress-wallet-section metapress-border-box <?php if( $metapress_live_mode ) { echo 'hidden'; } ?>">
                <div class="metapress-admin-settings metapress-border-box metapress-width-600">
                   <div class="metapress-grid metapress-wallet metapress-setting">
                     <div class="metapress-setting-title">
                       <?php _e('Allowed Test Address', $wp_metapress_textdomain); ?>
                     </div>
                     <div class="metapress-setting-content">
                       <input class="regular-text" name="metapress_allowed_test_address" type="text" value="<?php echo esc_attr( $metapress_allowed_test_address ); ?>" />
                       <p><?php _e('An address for testing when in Test Mode. No other addresses will be allowed to make test payments.', $wp_metapress_textdomain); ?></p>
                     </div>
                   </div>
                 </div>
               </div>
            </div>

            <div class="metapress-admin-section metapress-border-box">
              <h3><?php _e('Receiving Wallet Address', $wp_metapress_textdomain); ?></h3>
              <p class="metapress-admin-notice"><?php echo esc_attr($metapress_mode_notice); ?>.</p>
              <div class="metapress-wallet-section metapress-border-box metapress-width-600 <?php if(! $metapress_live_mode) { echo 'hidden'; } ?>">
              <?php if( ! empty($metapress_wallet_addresses) ) {
                foreach($metapress_wallet_addresses as $key => $wallet_address) { ?>
                   <div class="metapress-admin-settings metapress-border-box">
                   <div class="metapress-grid metapress-wallet metapress-setting">
                     <div class="metapress-setting-title">
                       <?php _e('Name', $wp_metapress_textdomain); ?>
                     </div>
                     <div class="metapress-setting-content">
                       <input class="regular-text" name="metapress_wallet_addresses[<?php echo esc_attr( $key ); ?>][name]" type="text" value="<?php echo esc_attr( $wallet_address['name'] ); ?>" />
                     </div>
                   </div>
                   <div class="metapress-grid metapress-wallet metapress-setting">
                     <div class="metapress-setting-title">
                       <?php _e('Address', $wp_metapress_textdomain); ?>
                     </div>
                     <div class="metapress-setting-content">
                       <input class="regular-text" name="metapress_wallet_addresses[<?php echo esc_attr( $key ); ?>][address]" type="text" value="<?php echo esc_attr( $wallet_address['address'] ); ?>" />
                     </div>
                   </div>
                 </div>
               <?php } } ?>
              </div>
               <div class="metapress-wallet-section metapress-border-box <?php if($metapress_live_mode) { echo 'hidden'; } ?>">
                 <?php if( ! empty($metapress_test_wallet_addresses) ) {
                  foreach($metapress_test_wallet_addresses as $key => $test_wallet_address) { ?>
                   <div class="metapress-admin-settings metapress-border-box metapress-width-600">
                   <div class="metapress-grid metapress-wallet metapress-setting">
                     <div class="metapress-setting-title">
                       <?php _e('Name', $wp_metapress_textdomain); ?>
                     </div>
                     <div class="metapress-setting-content">
                       <input class="regular-text" name="metapress_test_wallet_addresses[<?php echo esc_attr( $key ); ?>][name]" type="text" value="<?php echo esc_attr( $test_wallet_address['name'] ); ?>" />
                     </div>
                   </div>
                   <div class="metapress-grid metapress-wallet metapress-setting">
                     <div class="metapress-setting-title">
                       <?php _e('Address', $wp_metapress_textdomain); ?>
                     </div>
                     <div class="metapress-setting-content">
                       <input class="regular-text" name="metapress_test_wallet_addresses[<?php echo esc_attr( $key ); ?>][address]" type="text" value="<?php echo esc_attr( $test_wallet_address['address'] ); ?>" />
                     </div>
                   </div>
                 </div>
               <?php } } ?>
             </div>
            </div>
            <div class="metapress-admin-section metapress-border-box">
              <h3><?php _e('Supported Networks', $wp_metapress_textdomain); ?></h3>
              <p class="metapress-admin-notice"><i><?php _e('Enable / Disable supported Networks on your site on the Networks admin page', $wp_metapress_textdomain); ?>.</i></p>
              <p class="metapress-admin-notice"><a class="button button-primary" href="<?php echo admin_url('admin.php?page=metapress-networks'); ?>"><?php _e('Manage Networks', $wp_metapress_textdomain); ?></a></p>
            </div>
            <div class="metapress-admin-section metapress-border-box">
              <h3><?php _e('API Token Ratios', $wp_metapress_textdomain); ?></h3>
              <div class="metapress-admin-settings metapress-border-box metapress-width-600">
                <div class="metapress-grid metapress-setting">
                  <div class="metapress-setting-title">
                    <?php _e('Auto Update Token Ratios', $wp_metapress_textdomain); ?>
                  </div>
                  <div class="metapress-setting-content metapress-align-right">
                    <input name="metapress_binance_cron" type="checkbox" value="1" <?php checked(1, $metapress_binance_cron); ?> />
                  </div>
                </div>
                <div class="metapress-grid metapress-setting">
                  <div class="metapress-setting-title">
                    <?php _e('What Is this', $wp_metapress_textdomain); ?>?
                  </div>
                  <div class="metapress-setting-content">
                    <p><?php _e('Keeps token currencies to USDT ratios up to date for USD to crypto currency conversion', $wp_metapress_textdomain); ?>. <?php _e('If your server does not allow cURL requests, DISABLE this option.', $wp_metapress_textdomain); ?></p>
                  </div>
                </div>
                <div class="metapress-grid metapress-setting">
                  <div class="metapress-setting-title">
                    <?php _e('Last Updated', $wp_metapress_textdomain); ?>
                  </div>
                  <div class="metapress-setting-content">
                    <p><?php if( empty($token_ratios_last_updated) ) {
                      _e('Never ran', $wp_metapress_textdomain);
                    } else {
                      echo wp_date('F j, Y H:i:s', $token_ratios_last_updated);
                    } ?></p>
                  </div>
                </div>
                <div class="metapress-grid metapress-setting">
                  <div class="metapress-setting-title">
                    <?php _e('Added Ratios', $wp_metapress_textdomain); ?>
                  </div>
                  <div class="metapress-setting-content">
                    <p><?php if( ! empty($metapress_token_ratios) ) {
                      $web3_access_ratio_list = "";
                      foreach($metapress_token_ratios as $key => $token_ratio) {
                        $web3_access_ratio_list .= '<strong>'.$key.'</strong>: '.$token_ratio.'<br>';
                      }
                      echo wp_kses_post($web3_access_ratio_list);
                    } else {
                      _e('No ratios added', $wp_metapress_textdomain);
                    } ?></p>
                  </div>
                </div>
              </div>
            </div>

            <div class="metapress-admin-section metapress-border-box">
              <h3><?php _e('Supported Post Types', $wp_metapress_textdomain); ?></h3>
              <p class="metapress-admin-notice"><?php _e('Sets the Post Types that can be restricted by Web3 Access Products. Note that the Web3 Access Restricted Content Gutenberg Block can be used on any Post Type that uses the Gutenberg Editor', $wp_metapress_textdomain); ?>.</p>
              <div class="metapress-admin-settings metapress-border-box metapress-width-600">
                <?php if( ! empty($metapress_site_post_types) ) {
                    foreach($metapress_site_post_types as $site_post_type) {
                        $post_type_title = ucfirst($site_post_type);
                        $post_type_title = str_replace('_', ' ', $post_type_title);
                        if( ! in_array($site_post_type, $not_allowed_post_types) ) { ?>
                          <div class="metapress-grid metapress-setting">
                            <div class="metapress-setting-title">
                              <?php echo esc_attr($post_type_title); ?>
                            </div>
                            <div class="metapress-setting-content metapress-align-right">
                              <input name="metapress_supported_post_types[]" type="checkbox" value="<?php echo esc_attr($site_post_type); ?>" <?php checked(in_array($site_post_type, $metapress_supported_post_types)); ?> />
                            </div>
                          </div>
                <?php } } } ?>
              </div>
            </div>

            <div class="metapress-admin-section metapress-border-box">
              <h3><?php _e('WooCommerce Filter', $wp_metapress_textdomain); ?></h3>
              <p class="metapress-admin-notice"><?php _e('Enabling the WooCommerce Filter will hide Add To Cart buttons for products that require a Web3 Access product', $wp_metapress_textdomain); ?>.</p>
              <div class="metapress-admin-settings metapress-border-box metapress-width-600">

                  <div class="metapress-grid metapress-setting">
                    <div class="metapress-setting-title">
                      <?php _e('Enable Filter', $wp_metapress_textdomain) ?>
                    </div>
                    <div class="metapress-setting-content metapress-align-right">
                      <input name="metapress_woocommerce_filters_enabled" type="checkbox" value="1" <?php checked(1, $metapress_woocommerce_filters_enabled); ?> />
                    </div>
                  </div>

              </div>
            </div>

            <div class="metapress-admin-section metapress-border-box">
              <h3><?php _e('Page Setup', $wp_metapress_textdomain); ?></h3>
              <p class="metapress-admin-notice"><?php _e('Set the pages for the Web3 Access Transactions and Checkout shortcodes', $wp_metapress_textdomain); ?>. <strong>[metapress-checkout]</strong> and <strong>[metapress-transactions]</strong> <?php _e('should be included on their respective pages', $wp_metapress_textdomain); ?>.</p>
              <div class="metapress-admin-settings metapress-border-box metapress-width-600">
                <div class="metapress-grid metapress-setting">
                  <div class="metapress-setting-title">
                    <?php _e('Checkout Page', $wp_metapress_textdomain); ?>
                  </div>
                  <div class="metapress-setting-content metapress-align-right">
                    <select name="metapress_checkout_page">
                      <option value=""><?php _e('None', $wp_metapress_textdomain); ?></option>
                      <?php if( ! empty($existing_pages) ) {
                          foreach($existing_pages as $set_page) { ?>
                            <option value="<?php echo esc_attr($set_page->ID); ?>" <?php selected($set_page->ID, $metapress_checkout_page); ?>><?php echo esc_attr($set_page->post_title); ?></option>
                      <?php } } ?>
                    </select>
                  </div>
                </div>
                <div class="metapress-grid metapress-setting">
                  <div class="metapress-setting-title">
                    <?php _e('Transactions Page', $wp_metapress_textdomain); ?>
                  </div>
                  <div class="metapress-setting-content metapress-align-right">
                    <select name="metapress_transactions_page">
                      <option value=""><?php _e('None', $wp_metapress_textdomain); ?></option>
                      <?php if( ! empty($existing_pages) ) {
                          foreach($existing_pages as $set_page) { ?>
                            <option value="<?php echo esc_attr($set_page->ID); ?>" <?php selected($set_page->ID, $metapress_transactions_page); ?>><?php echo esc_attr($set_page->post_title); ?></option>
                      <?php } } ?>
                    </select>
                  </div>
                </div>
                <div class="metapress-grid metapress-setting">
                  <div class="metapress-setting-title">
                    [metapress-checkout]
                  </div>
                  <div class="metapress-setting-content">
                    <p><?php _e('The Checkout Page and [metapress-checkout] shortcode displays checkout options when customers are purchasing individual products.', $wp_metapress_textdomain); ?>.</p>
                  </div>
                </div>
                <div class="metapress-grid metapress-setting">
                  <div class="metapress-setting-title">
                    [metapress-transactions]
                  </div>
                  <div class="metapress-setting-content">
                    <p><?php _e('The Transaction Page and [metapress-transactions] shortcode displays a customers previous transactions on a page. Transactions will correspond with customers browser wallet addresses', $wp_metapress_textdomain); ?>.</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="metapress-admin-section metapress-border-box">
                <?php submit_button(); ?>
            </div>
        </form>
    </div>
</div>
