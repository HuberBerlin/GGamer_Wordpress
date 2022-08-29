<?php

function metapress_plugin_update_version_check() {
    global $wp_metapress_version;
    if(INSTALLED_METAPRESS_PLUGIN_VERSION !== $wp_metapress_version) {
        run_metapress_plugin_automatic_updates();
    }
}
add_action( 'plugins_loaded', 'metapress_plugin_update_version_check' );

function run_metapress_plugin_automatic_updates() {
    global $wp_metapress_version;
    $needs_update = false;
    if(!empty($wp_metapress_version)) {
        $current_version_number = intval(str_replace(".","",$wp_metapress_version));
    } else {
        $current_version_number = 0;
    }
    if($current_version_number < 132) {
        require_once('custom-tokens-132.php');
    }

    update_option('wp_metapress_plugin_version', '1.3.7');
}
