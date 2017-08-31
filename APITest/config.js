var params = {
    	baseUrl: 'https://api.taxamo.com/api/v1/transactions',
    	publicToken: 'SamplePublicTestKey1',
    	privateToken: 'SamplePrivateTestKey1',
    	initialTransactionData: {
            "transaction": {
          		"transaction_lines": [
              		{
                  		"custom_id": 'line1',
                  		"amount": 100
              		}
          		],
          		"currency_code": 'EUR',
          		"billing_country_code": 'BE',
          		"buyer_credit_card_prefix": '424242424'
      		}
    	},
    	updatedTransactionData: {
            "transaction": {
          		"transaction_lines": [
              		{
                  		"custom_id": 'line2',
                  		"amount": 200
              		}
          		],
          		"currency_code": 'USD',
          		"billing_country_code": 'UK',
          		"buyer_credit_card_prefix": '123456789'
      		}
    	},
    	expectedStoreTransactionScheme: {
            type: "object",
            properties: {
                storage_required_fields: {type: "array"},
                tax_required_fields: {type: "array"},
                transaction: {type: "object"}
            }
        }
};

var endpoints = {
	storeTransaction: params.baseUrl+'?public_token='+params.publicToken,
	getTransaction: function(newTransactionKey) {
		return params.baseUrl+'/'+newTransactionKey+'?private_token='+params.privateToken;
	},
	updateTransaction: function(newTransactionKey) {
		return params.baseUrl+'/'+newTransactionKey+'?private_token='+params.privateToken;
	},
	confirmTransaction: function(newTransactionKey) {
		return params.baseUrl+'/'+newTransactionKey+'/confirm?private_token='+params.privateToken;
	},
	unconfirmTransaction: function(newTransactionKey) {
		return params.baseUrl+'/'+newTransactionKey+'/unconfirm?private_token='+params.privateToken;
	},
};
 
module.exports = {
	params: params,
	endpoints: endpoints
};
