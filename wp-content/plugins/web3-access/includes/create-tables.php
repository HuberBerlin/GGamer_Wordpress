<?php

class METAPRESS_DB_TABLES_MANAGER {
  public function __construct() {}

  public function create_metapress_db_tables() {
      global $wpdb;
      $metapress_payment_tables = null;
      $metapress_test_payment_tables = null;
      $metapress_access_token_tables = null;
      $table_creation_required = false;
      $charset_collate = $wpdb->get_charset_collate();
      if( ! $this->table_exists('metapress_payments') ) {
          $new_table_name = $wpdb->prefix . 'metapress_payments';
          $metapress_payment_tables = "CREATE TABLE $new_table_name (
            id int NOT NULL AUTO_INCREMENT,
            product_id int NOT NULL,
            payment_owner tinytext NOT NULL,
            token tinytext NOT NULL,
            token_amount DECIMAL(36,18) NOT NULL,
            sent_amount DECIMAL(36,18) NOT NULL,
            network tinytext NOT NULL,
            transaction_time int NOT NULL,
            transaction_hash tinytext NOT NULL,
            transaction_status tinytext NOT NULL,
            contract_address tinytext,
            PRIMARY KEY  (id)
          ) $charset_collate;";
          $table_creation_required = true;
      }

      if( ! $this->table_exists('metapress_test_payments') ) {
          $new_test_table_name = $wpdb->prefix . 'metapress_test_payments';
          $metapress_test_payment_tables = "CREATE TABLE $new_test_table_name (
            id int NOT NULL AUTO_INCREMENT,
            product_id int NOT NULL,
            payment_owner tinytext NOT NULL,
            token tinytext NOT NULL,
            token_amount DECIMAL(36,18) NOT NULL,
            sent_amount DECIMAL(36,18) NOT NULL,
            network tinytext NOT NULL,
            transaction_time int NOT NULL,
            transaction_hash tinytext NOT NULL,
            transaction_status tinytext NOT NULL,
            contract_address tinytext,
            PRIMARY KEY  (id)
          ) $charset_collate;";
          $table_creation_required = true;
      }

      if( ! $this->table_exists('metapress_access_tokens') ) {
          $new_table_name = $wpdb->prefix . 'metapress_access_tokens';
          $charset_collate = $wpdb->get_charset_collate();

          $metapress_access_token_tables = "CREATE TABLE $new_table_name (
            id int NOT NULL AUTO_INCREMENT,
            product_id int NOT NULL,
            payment_owner tinytext NOT NULL,
            token tinytext NOT NULL,
            expires int NOT NULL,
            PRIMARY KEY  (id)
          ) $charset_collate;";
          $table_creation_required = true;
      }

      if($table_creation_required) {
        require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
        if( ! empty($metapress_payment_tables) ) {
            dbDelta( $metapress_payment_tables );
        }
        if( ! empty($metapress_test_payment_tables) ) {
            dbDelta( $metapress_test_payment_tables );
        }
        if( ! empty($metapress_access_token_tables) ) {
            dbDelta( $metapress_access_token_tables );
        }
    } else {
        $this->update_table_data();
    }
  }

  public function table_exists($table_name) {
      global $wpdb;
      $table_exists = true;
      $find_table_name = $wpdb->prefix . $table_name;
      if($wpdb->get_var("SHOW TABLES LIKE '$find_table_name'") != $find_table_name) {
           $table_exists = false;
      }
      return $table_exists;
  }

  protected function update_table_data() {
      global $wpdb;
      global $wp_metapress_version;
      if( ! empty($wp_metapress_version) ) {
          $current_version_number = intval(str_replace(".","",$wp_metapress_version));
          if($current_version_number < 102) {
              if( $this->table_exists('metapress_payments') ) {
                  $table_name = $wpdb->prefix . 'metapress_payments';
                  $wpdb->query("ALTER TABLE $table_name ADD contract_address tinytext AFTER transaction_status");
              }

              if( $this->table_exists('metapress_test_payments') ) {
                  $test_table_name = $wpdb->prefix . 'metapress_test_payments';
                  $wpdb->query("ALTER TABLE $test_table_name ADD contract_address tinytext AFTER transaction_status");
              }
          }
      }
  }
}
$metapress_db_tables_manager = new METAPRESS_DB_TABLES_MANAGER();
$metapress_db_tables_manager->create_metapress_db_tables();
