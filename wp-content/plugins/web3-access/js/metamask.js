
class MetaPress_MetaMask_Loading_Manager {
    constructor() {
      this.mm_account_provider = null;
      this.mm_account_provider_name = null;
      this.metapress_transaction_viewing_url = '';
      this.metapress_web3 = null;
      this.currentMMAccount = null;
      this.metapress_contract = null;
      this.token_ratio = 0;
      this.send_to_address = metapressmetamaskjsdata.send_to_address;
      if( metapressmetamaskjsdata.allowed_test_address && metapressmetamaskjsdata.allowed_test_address != "" ) {
        this.allowed_mm_test_address = metapressmetamaskjsdata.allowed_test_address.toLowerCase();
      } else {
        this.allowed_mm_test_address = null;
      }
    }

    async metapressCheckEthereumProvider() {
        this.mm_account_provider = await detectEthereumProvider();
        this.mm_account_provider.on('accountsChanged', (accounts) => {
            this.metapress_remove_token_param();
        });

        this.mm_account_provider.on('chainChanged', (chainId) => {
            if( metapressmetamaskjsdata.live_mode != 1 ) {
                if( this.currentMMAccount != this.allowed_mm_test_address ) {
                    this.currentMMAccount = null;
                    this.metapress_remove_token_param();
                }
            }
            document.location.reload();
        });
    }

    async handleConnect() {
        const mm_accounts = await this.mm_account_provider.request({ method: 'eth_requestAccounts' });
        this.currentMMAccount = mm_accounts[0];
        this.complete_account_connection();
    }

    async metapressGetUserMetaMaskAccount() {
        if( this.mm_account_provider && this.mm_account_provider != null ) {
            if( ! this.currentMMAccount  ) {
                const mm_accounts = await this.mm_account_provider.request({ method: 'eth_accounts' });
                if( mm_accounts.length > 0 ) {
                    this.currentMMAccount = mm_accounts[0];
                    this.complete_account_connection();
                }
            }

            if( this.metapress_web3 == null ) {
                this.metapress_web3 = new Web3(this.mm_account_provider);
                var metapress_manager = this;
                jQuery.getJSON(metapressmetamaskjsdata.abi, function() {}).done(function(abi) {
                  metapress_manager.contract_abi = abi;
                }).fail(function() {
                  metapress_manager.contract_abi = null;
                })

                jQuery.getJSON(metapressmetamaskjsdata.erc20_abi, function() {}).done(function(abi) {
                  metapress_manager.erc20_abi = abi;
                }).fail(function() {
                  metapress_manager.erc20_abi = null;
                })

                jQuery.getJSON(metapressmetamaskjsdata.erc721_abi, function() {}).done(function(abi) {
                  metapress_manager.erc721_abi = abi;
                }).fail(function() {
                  metapress_manager.erc721_abi = null;
                })

                jQuery.getJSON(metapressmetamaskjsdata.erc1155_abi, function() {}).done(function(abi) {
                  metapress_manager.erc1155_abi = abi;
                }).fail(function() {
                  metapress_manager.erc1155_abi = null;
                })
            }

        }
    }

    prepare_transaction(network_slug, explorer_url) {
        this.metapress_transaction_viewing_url = explorer_url;
        this.mm_account_provider_name = network_slug;
    }

    complete_account_connection() {
        if( metapressmetamaskjsdata.live_mode != 1 ) {
            if( this.currentMMAccount != this.allowed_mm_test_address ) {
                this.currentMMAccount = null;
                alert('Please change to a Mainnet Network to use this site.');
            }
        }

        if( this.currentMMAccount && this.currentMMAccount != null ) {
          jQuery('.metapress-access-buttons').addClass('show');
          jQuery('.metapress-login-notice').remove();
          jQuery(document).trigger('metapressMetaMaskAccountReady');
        }
    }

    set_contract(network) {
        let metapress_contract_address = metapressmetamaskjsdata.contract_address[network];
        this.metapress_contract = new this.metapress_web3.eth.Contract(this.contract_abi, metapress_contract_address);
    }

    set_approval_contract(contract_address) {
        return new this.metapress_web3.eth.Contract(this.erc20_abi, contract_address);
    }

    set_721_nft_contract(contract_address) {
        return new this.metapress_web3.eth.Contract(this.erc721_abi, contract_address);
    }

    set_1155_nft_contract(contract_address) {
        return new this.metapress_web3.eth.Contract(this.erc1155_abi, contract_address);
    }

    async verify_erc20_owner(contract_address, product_id, minimum_balance) {
        let nft_contract = this.set_approval_contract(contract_address);
        const metapress_manager = this;
        await nft_contract.methods.balanceOf(this.currentMMAccount).call({from: this.currentMMAccount}, function(error, balance) {
            if( error ) {
                jQuery('.metapress-access-buttons').addClass('show');
                jQuery('.metapress-notice-box').html('<p>'+error.message+'</p>').show();
                metapress_show_ajax_error(error.message);
                return {
                    'status': 'error',
                    'hash': null
                };
            }
            let from_wei_balance = metapress_manager.metapress_web3.utils.fromWei(balance, 'ether');
            if( from_wei_balance >= minimum_balance ) {
                metapress_manager.metapress_create_nft_access_token(product_id);
            } else {
                metapress_show_ajax_error('Verification failed');
            }
        });

    }

    async verify_721_nft_collection_owner(contract_address, product_id, collection_slug, minimum_balance) {
        let nft_contract = this.set_721_nft_contract(contract_address);
        const metapress_manager = this;
        if( collection_slug && collection_slug.length > 0 ) {
            if( typeof(metapress_opensea_api_manager) != 'undefined' ) {
                metapress_opensea_api_manager.get_assets(contract_address, this.currentMMAccount, collection_slug).then( (token_data) => {
                    if( token_data.assets && token_data.assets.length >= minimum_balance ) {
                        metapress_manager.metapress_create_nft_access_token(product_id);
                    } else {
                        metapress_show_ajax_error('Verification failed');
                    }
                });
            } else {
                metapress_show_ajax_error('Missing OpenSea API Key to check collection balance.');
            }
        } else {
            await nft_contract.methods.balanceOf(this.currentMMAccount).call({from: this.currentMMAccount}, function(error, balance) {
                if( error ) {
                    jQuery('.metapress-access-buttons').addClass('show');
                    jQuery('.metapress-notice-box').html('<p>'+error.message+'</p>').show();
                    metapress_show_ajax_error(error.message);
                    return {
                        'status': 'error',
                        'hash': null
                    };
                }
                if( balance >= minimum_balance ) {
                    metapress_manager.metapress_create_nft_access_token(product_id);
                } else {
                    metapress_show_ajax_error('Verification failed');
                }
            });
        }


    }

    async verify_721_nft_owner(token_id, contract_address, product_id) {
        let nft_contract = this.set_721_nft_contract(contract_address);
        const metapress_manager = this;
        await nft_contract.methods.ownerOf(token_id).call({from: this.currentMMAccount}, function(error, owner) {
            if( error ) {
                jQuery('.metapress-access-buttons').addClass('show');
                jQuery('.metapress-notice-box').html('<p>'+error.message+'</p>').show();
                metapress_show_ajax_error(error.message);
                return {
                    'status': 'error',
                    'hash': null
                };
            }
            if( owner.toLowerCase() === metapress_manager.currentMMAccount.toLowerCase() ) {
                metapress_manager.metapress_create_nft_access_token(product_id);
            } else {
                metapress_show_ajax_error('Verification failed');
            }
        });
    }

    async verify_1155_nft_owner(token_id, contract_address, product_id, collection_slug) {
        let nft_contract = this.set_1155_nft_contract(contract_address);
        const metapress_manager = this;

        if( token_id === "" ) {
            if( typeof(metapress_opensea_api_manager) != 'undefined' ) {
                metapress_opensea_api_manager.get_assets(contract_address, this.currentMMAccount, collection_slug).then( (token_data) => {
                    if( token_data.assets && token_data.assets.length > 1 ) {
                        metapress_manager.metapress_create_nft_access_token(product_id);
                    } else {
                        metapress_show_ajax_error('Verification failed');
                    }
                });
            } else {
                metapress_show_ajax_error('Missing OpenSea API Key to check ERC-1155 collection balance.');
            }

        } else {
            await nft_contract.methods.balanceOf(this.currentMMAccount, token_id).call({from: this.currentMMAccount}, function(error, balance) {
                if( error ) {
                    jQuery('.metapress-access-buttons').addClass('show');
                    jQuery('.metapress-notice-box').html('<p>'+error.message+'</p>').show();
                    metapress_show_ajax_error(error.message);
                    return {
                        'status': 'error',
                        'hash': null
                    };
                }
                if( balance > 0 ) {
                    metapress_manager.metapress_create_nft_access_token(product_id);
                } else {
                    metapress_show_ajax_error('Verification failed');
                }
            });
        }
    }

    async makeContractPayment(product_id, product_price, token, contract_address) {
        var token_price = (product_price * this.token_ratio);
        token_price = token_price.toFixed(18).toString();
        var wei_amount = this.metapress_web3.utils.toWei(token_price, 'ether');
        this.set_contract(this.mm_account_provider_name);
        if( this.send_to_address ) {
            if( metapress_metamask_loading_manager.currentMMAccount && this.metapress_contract && this.mm_account_provider_name && this.token_ratio > 0 ) {
                // DIRECT TRANSACTION VIA SMART CONTRACT ON NETWORK
                if( token == 'ETH' || token == 'MATIC' || token == 'BNB' || token == 'AVAX' || token == 'FTM' ) {
                    await this.metapress_contract.methods.smartTransfer(this.send_to_address).send({from: this.currentMMAccount, value: wei_amount}).on('transactionHash', (hash) => {
                        this.metapress_create_new_metamask_transaction(product_id, token, token_price, hash, 'pending', null);
                    }).on('error', (error) => {
                        jQuery('.metapress-access-buttons').addClass('show');
                        return {
                            success: false,
                            error: error
                        }
                    });
                } else {
                    // MUST REQUEST SPENDING ALLOWANCE
                    this.get_contract_approval(product_id, token, token_price, contract_address, wei_amount);
                }
            } else {
                jQuery('.metapress-access-buttons').addClass('show');
            }
        } else {
            metapress_show_ajax_error('Missing receiving wallet address.');
            jQuery('.metapress-access-buttons').addClass('show');
        }

     }

     async get_contract_allowance(contract_address) {
         let approval_contract = this.set_approval_contract(contract_address);
         let metapress_contract_address = metapressmetamaskjsdata.contract_address[this.mm_account_provider_name];
         let token_allowance = await approval_contract.methods.allowance(this.currentMMAccount, metapress_contract_address).call({from: this.currentMMAccount}, function(error, result) {
             if( error ) {
                 jQuery('.metapress-access-buttons').addClass('show');
                 jQuery('.metapress-notice-box').html('<p>'+error.message+'</p>').show();
                 metapress_show_ajax_error(error.message);
                 return {
                     'status': 'error',
                     'hash': null
                 };
             }
         });
         return parseInt(token_allowance);
     }

    async get_contract_approval(product_id, token, token_price, contract_address, wei_amount) {
        let approval_contract = this.set_approval_contract(contract_address);
        let metapress_contract_address = metapressmetamaskjsdata.contract_address[this.mm_account_provider_name];
        const metapress_manager = this;
        let token_allowance = await this.get_contract_allowance(contract_address);

        if( token_allowance < wei_amount ) {
            if( token_allowance > 0 ) {
              console.log('need to set allowance to 0');
              await approval_contract.methods.approve(metapress_contract_address, 0).send({from: this.currentMMAccount}).on('error', function(error, receipt) {
                  jQuery('.metapress-access-buttons').addClass('show');
                  jQuery('.metapress-notice-box').html('<p>'+error.message+'</p>').show();
                  metapress_show_ajax_error(error.message);
              }).on('transactionHash', function(hash) {
                  jQuery('.metapress-access-buttons').addClass('show');
                  jQuery('.metapress-notice-box').html('<p>Please try again after your transaction '+hash+' is complete!</p>').show();
              });
            } else {
                  console.log('setting allowance');
                  await approval_contract.methods.approve(metapress_contract_address, wei_amount).send({from: this.currentMMAccount}).on('error', function(error, receipt) {
                      jQuery('.metapress-access-buttons').addClass('show');
                      jQuery('.metapress-notice-box').html('<p>'+error.message+'</p>').show();
                      metapress_show_ajax_error(error.message);
                  }).on('transactionHash', function(hash){
                      metapress_manager.metapress_create_new_metamask_transaction(product_id, token, token_price, hash, 'approval', contract_address);
                  });
              }
        } else {
            await metapress_manager.confirmContractPayment(product_id, token, token_price, contract_address, null);
        }
    }

    async confirmContractPayment(product_id, token, token_price, contract_address, transaction_id) {
        this.set_contract(this.mm_account_provider_name);
        let token_allowance = await this.get_contract_allowance(contract_address);
        if( token_allowance > 0 ) {
            if( this.send_to_address ) {
                if( metapress_metamask_loading_manager.currentMMAccount && this.metapress_contract && this.mm_account_provider_name ) {

                    var wei_amount = this.metapress_web3.utils.toWei(token_price, 'ether');

                    // DIRECT TRANSACTION VIA SMART CONTRACT ON NETWORK
                    await this.metapress_contract.methods.smartTokenTransfer(contract_address, this.send_to_address, wei_amount).send({from: this.currentMMAccount}).on('transactionHash', (hash) => {
                        if( transaction_id != null ) {
                            this.update_approval_metamask_transaction(product_id, hash, transaction_id);
                        } else {
                            this.metapress_create_new_metamask_transaction(product_id, token, token_price, hash, 'pending', contract_address);
                        }
                    }).on('error', (error) => {
                        metapress_show_ajax_error(error);
                    });
                }
            } else {
                metapress_show_ajax_error('Missing receiving wallet address.');
            }
        } else {
            metapress_show_ajax_error('Allowance for this contract is 0');
        }
     }

     metapress_create_new_metamask_transaction(product_id, token, token_price, hash, status, contract_address) {
         if( product_id && this.currentMMAccount ) {
             metapress_show_ajax_updating('Creating transaction...');
             var metapress_manager = this;

             let metapress_new_transaction_endpoint = metapressmetamaskjsdata.newtransaction;
             metapress_new_transaction_endpoint = this.set_request_param(metapress_new_transaction_endpoint, 'mpwalletaddress', this.currentMMAccount);
             metapress_new_transaction_endpoint = this.set_request_param(metapress_new_transaction_endpoint, 'productid', product_id);
             metapress_new_transaction_endpoint = this.set_request_param(metapress_new_transaction_endpoint, 'transaction_hash', hash);
             metapress_new_transaction_endpoint = this.set_request_param(metapress_new_transaction_endpoint, 'token', token);
             metapress_new_transaction_endpoint = this.set_request_param(metapress_new_transaction_endpoint, 'token_amount', token_price);
             metapress_new_transaction_endpoint = this.set_request_param(metapress_new_transaction_endpoint, 'network', this.mm_account_provider_name);
             metapress_new_transaction_endpoint = this.set_request_param(metapress_new_transaction_endpoint, 'txn_status', status);
             metapress_new_transaction_endpoint = this.set_request_param(metapress_new_transaction_endpoint, 'contract_address', contract_address);
             metapress_new_transaction_endpoint = this.set_request_param(metapress_new_transaction_endpoint, 'request_key', metapressmanagerrequests.api.request_key);

             jQuery.ajax({
                 url: metapress_new_transaction_endpoint,
                 type: 'POST',
                 success: function(response) {
                     jQuery('#metapress-updating-box').removeClass('show-overlay-box');
                     var transaction_response = response;
                     if( transaction_response && transaction_response.success ) {
                       var transaction_viewing_url = metapress_manager.metapress_transaction_viewing_url + 'tx/' + hash;
                       var pending_transaction_notice = '<p>Thank You! Your <a href="'+transaction_viewing_url+'" target="_blank">transaction is currently pending</a>. Please check again once your transaction is complete.</p>';
                       jQuery('.metapress-notice-box').html(pending_transaction_notice).show();
                     }
                 },
                 error: function(error) {
                     metapress_show_ajax_error(error.responseText);
                 }
             });
         }
     }

     update_approval_metamask_transaction(product_id, transaction_hash, transaction_id) {
         if( product_id && this.currentMMAccount ) {
             metapress_show_ajax_updating('Confirming transaction...');
             var metapress_manager = this;

             let metapress_update_transaction_endpoint = metapressmetamaskjsdata.updatetransaction;
             metapress_update_transaction_endpoint = this.set_request_param(metapress_update_transaction_endpoint, 'mpwalletaddress', this.currentMMAccount);
             metapress_update_transaction_endpoint = this.set_request_param(metapress_update_transaction_endpoint, 'productid', product_id);
             metapress_update_transaction_endpoint = this.set_request_param(metapress_update_transaction_endpoint, 'transaction_hash', transaction_hash);
             metapress_update_transaction_endpoint = this.set_request_param(metapress_update_transaction_endpoint, 'transaction_id', transaction_id);
             metapress_update_transaction_endpoint = this.set_request_param(metapress_update_transaction_endpoint, 'request_key', metapressmanagerrequests.api.request_key);

             jQuery.ajax({
                 url: metapress_update_transaction_endpoint,
                 type: 'POST',
                 success: function(response) {
                     jQuery('#metapress-updating-box').removeClass('show-overlay-box');
                     var transaction_response = response;
                     if( transaction_response && transaction_response.updated ) {
                       var transaction_viewing_url = metapress_manager.metapress_transaction_viewing_url + 'tx/' + transaction_hash;
                       var pending_transaction_notice = '<p>Thank You! Your <a href="'+transaction_viewing_url+'" target="_blank">transaction is currently pending</a>. Please check again once your transaction is complete.</p>';
                       jQuery('.metapress-notice-box').html(pending_transaction_notice).show();
                     }
                 },
                 error: function(error) {
                     metapress_show_ajax_error(error.responseText);
                 }
             });
         }
     }

     metapress_create_nft_access_token(product_id) {
         if( product_id && this.currentMMAccount ) {
             metapress_show_ajax_updating('Creating your access token...');
             var metapress_manager = this;

             let metapress_new_nft_access_token = metapressmetamaskjsdata.nfttoken;
             metapress_new_nft_access_token = this.set_request_param(metapress_new_nft_access_token, 'mpwalletaddress', this.currentMMAccount);
             metapress_new_nft_access_token = this.set_request_param(metapress_new_nft_access_token, 'productid', product_id);
             metapress_new_nft_access_token = this.set_request_param(metapress_new_nft_access_token, 'nft_owner_verification_timestamp', jQuery('#metapress-nft-verification-text').data('noncetimestamp'));
             if( jQuery('#metapress-nft-verification-text').data('redirect') ) {
                 metapress_new_nft_access_token = this.set_request_param(metapress_new_nft_access_token, 'mpredirect', jQuery('#metapress-nft-verification-text').data('redirect'));
             }
             metapress_new_nft_access_token = this.set_request_param(metapress_new_nft_access_token, 'request_key', metapressmanagerrequests.api.request_key);

             jQuery.ajax({
                 url: metapress_new_nft_access_token,
                 type: 'POST',
                 success: function(response) {
                     jQuery('#metapress-updating-box').removeClass('show-overlay-box');
                     var transaction_response = response;
                     if( transaction_response && transaction_response.success && transaction_response.access_token ) {
                         if( transaction_response.redirect ) {
                             window.location.href = transaction_response.redirect;
                         } else {
                             metapress_metamask_loading_manager.metapress_set_token_param(transaction_response.access_token);
                         }
                     }
                 },
                 error: function(error) {
                     metapress_show_ajax_error(error.responseText);
                 }
             });
         }
     }

    metapress_set_token_param(token) {
        var metapress_url = new URL(window.location.href);
        var metapress_redirect = metapress_url.searchParams.get('mpred');
        if( metapress_redirect ) {
            metapress_url.href = metapress_redirect;
        }
        metapress_url.searchParams.set('mpatok',token);
        window.location.href = metapress_url.href;
    }

    metapress_remove_token_param() {
        var metapress_url = new URL(window.location.href);
        metapress_url.searchParams.delete('mpatok');
        window.location.href = metapress_url.href;
    }

    set_request_param(uri, key, value) {
        var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        } else {
            return uri + separator + key + "=" + value;
        }
    }
}
let metapress_metamask_loading_manager = new MetaPress_MetaMask_Loading_Manager();
if ( typeof window.ethereum !== 'undefined' ) {
    metapress_metamask_loading_manager.metapressCheckEthereumProvider();
    jQuery('.metamask-connect-wallet').click( function() {
        metapress_metamask_loading_manager.handleConnect();
    });
}
