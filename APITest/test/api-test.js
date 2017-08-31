//Assertion and API testing frameworks
var chai = require('chai');
var chakram = require('chakram');
	expect = chakram.expect;
//Modules for using external parametres from config.js file	
var params = require('../config.js').params;
var endpoints = require('../config.js').endpoints;
var newTransactionPost, transactionKey, getTransactionResponse;

describe("New transaction creation", function() {
    
    before("Initializing new transaction", function () {
        newTransactionPost = chakram.post(endpoints.storeTransaction, params.initialTransactionData);
        return newTransactionPost.then(function(response) {
        	console.log('Following transaction is created: ' + JSON.stringify(params.initialTransactionData));
        	console.log('Following response is received for new transaction storage: ' + JSON.stringify(response.body));
        	return chakram.wait();
        });
    });

    it("should succeed", function () {
        expect(newTransactionPost).to.have.status(200);
        return chakram.wait();
    });

    it("should have correct headers", function () {
        expect(newTransactionPost).to.have.header('content-type', /json/);
        return chakram.wait();
    });

    it("should respond with correct custom ID", function () {
    	expect(newTransactionPost).to.have.json('transaction.transaction_lines[0].custom_id', params.initialTransactionData.transaction.transaction_lines[0].custom_id);
    	return chakram.wait();
    });
    
    it("should respond with correct amount", function () {
        expect(newTransactionPost).to.have.json('transaction.amount', params.initialTransactionData.transaction.transaction_lines[0].amount);
        return chakram.wait();
    });
    
    it("should respond with correct currency", function () {
        expect(newTransactionPost).to.have.json('transaction.currency_code', params.initialTransactionData.transaction.currency_code);
        return chakram.wait();
    });
    
    it("should respond with correct country code", function () {
        expect(newTransactionPost).to.have.json('transaction.billing_country_code', params.initialTransactionData.transaction.billing_country_code);
        return chakram.wait();
    });
    
    it("should respond with correct credit card number", function () {
        expect(newTransactionPost).to.have.json('transaction.buyer_credit_card_prefix', params.initialTransactionData.transaction.buyer_credit_card_prefix);
        return chakram.wait();
    });

    it("should respond with data matching the transaction schema", function () {
        expect(newTransactionPost).to.have.schema(params.expectedStoreTransactionScheme);
        return chakram.wait();
    });
});
describe("Getting created transaction", function() {
  
    before("Initializing new transaction", function () {
        newTransactionPost.then(function(response) {
        	transactionKey = response.body.transaction.key;
        	return getTransactionResponse = chakram.get(endpoints.getTransaction(transactionKey));
      	})
      	.then(function(newResponse) {
      		console.log('Following reponse was recieved at attempt to get created transaction: ' + JSON.stringify(newResponse.body));
      		return chakram.wait();
      	});
    });

    it("should succeed", function () {
        expect(getTransactionResponse).to.have.status(200);
        return chakram.wait();
    });

    it("should have correct headers", function () {
        expect(getTransactionResponse).to.have.header('content-type', /json/);
        return chakram.wait();
    });

    it("should respond with correct custom ID", function () {
    	expect(getTransactionResponse).to.have.json('transaction.transaction_lines[0].custom_id', params.initialTransactionData.transaction.transaction_lines[0].custom_id);
    	return chakram.wait();
    });
    
    it("should respond with correct amount", function () {
        expect(getTransactionResponse).to.have.json('transaction.amount', params.initialTransactionData.transaction.transaction_lines[0].amount);
        return chakram.wait();
    });
    
    it("should respond with correct currency", function () {
        expect(getTransactionResponse).to.have.json('transaction.currency_code', params.initialTransactionData.transaction.currency_code);
        return chakram.wait();
    });
    
    it("should respond with correct country code", function () {
        expect(getTransactionResponse).to.have.json('transaction.billing_country_code', params.initialTransactionData.transaction.billing_country_code);
        return chakram.wait();
    });
    
    it("should respond with correct creadit card number", function () {
        expect(getTransactionResponse).to.have.json('transaction.buyer_credit_card_prefix', params.initialTransactionData.transaction.buyer_credit_card_prefix);
        return chakram.wait();
    });

    it("should respond with data matching the transaction schema", function () {
		expect(getTransactionResponse).to.have.schema(params.expectedStoreTransactionScheme);
		return chakram.wait();
    });
});

describe("Update created transaction", function() {
  
    before("Initializing new transaction", function () {
        newTransactionPost.then(function(response) {
        	transactionKey = response.body.transaction.key;
        	return updateTransactionResponse = chakram.put(endpoints.updateTransaction(transactionKey), params.updatedTransactionData);
      	})
      	.then(function(newResponse) {
      		console.log('Following new data was used for updating transaction request:' + JSON.stringify(params.updatedTransactionData));
			console.log('Following reponse was recieved at attempt to update created transaction: ' + JSON.stringify(newResponse.body));
			return chakram.wait();
      	});
    });

    it("should succeed", function () {
        expect(updateTransactionResponse).to.have.status(200);
        return chakram.wait();
    });

    it("should have correct headers", function () {
        expect(updateTransactionResponse).to.have.header('content-type', /json/);
        return chakram.wait();
    });

    it("should respond with correct custom ID", function () {
    	expect(updateTransactionResponse).to.have.json('transaction.transaction_lines[0].custom_id', params.updatedTransactionData.transaction.transaction_lines[0].custom_id);
    	return chakram.wait();
    });
    
    it("should respond with correct amount", function () {
        expect(updateTransactionResponse).to.have.json('transaction.amount', params.updatedTransactionData.transaction.transaction_lines[0].amount);
        return chakram.wait();
    });
    
    it("should respond with correct currency", function () {
        expect(updateTransactionResponse).to.have.json('transaction.currency_code', params.updatedTransactionData.transaction.currency_code);
        return chakram.wait();
    });
    
    it("should respond with correct country code", function () {
        expect(updateTransactionResponse).to.have.json('transaction.billing_country_code', params.updatedTransactionData.transaction.billing_country_code);
        return chakram.wait();
    });
    
    it("should respond with correct creadit card number", function () {
        expect(updateTransactionResponse).to.have.json('transaction.buyer_credit_card_prefix', params.updatedTransactionData.transaction.buyer_credit_card_prefix);
        return chakram.wait();
    });

    it("should respond with data matching the transaction schema", function () {
        expect(updateTransactionResponse).to.have.schema(params.expectedStoreTransactionScheme);
        return chakram.wait();
    });
});

describe("Confirm created transaction", function() {
  
    before("Initializing new transaction", function () {
        newTransactionPost.then(function(response) {
        	transactionKey = response.body.transaction.key;
        	return confirmTransactionResponse = chakram.post(endpoints.confirmTransaction(transactionKey));
      	})
      	.then(function(newResponse) {
			console.log('Following reponse was recieved at attempt to confirm created transaction: ' + JSON.stringify(newResponse.body));
			return chakram.wait();
      	});
    });

    it("should succeed", function () {
        expect(confirmTransactionResponse).to.have.status(200);
        return chakram.wait();
    });
    it("should have correct headers", function () {
        expect(confirmTransactionResponse).to.have.header('content-type', /json/);
        return chakram.wait();
    });

    it("should respond with proper status", function () {
    	expect(confirmTransactionResponse).to.have.json('transaction.status', 'C');
    	return chakram.wait();
    });

    it("should respond with data matching the transaction schema", function () {
		expect(confirmTransactionResponse).to.have.schema(params.expectedStoreTransactionScheme);
		return chakram.wait();
    });
});

describe("Un-confirm created transaction", function() {
  
    before("Initializing new transaction", function () {
        newTransactionPost.then(confirmTransactionResponse).then(function(response) {
        	transactionKey = response.body.transaction.key;
        	return unconfirmTransactionResponse = chakram.post(endpoints.unconfirmTransaction(transactionKey));
      	})
      	.then(function(newResponse) {
			console.log('Following reponse was recieved at attempt to unconfirm created and confirmed transaction: ' + JSON.stringify(newResponse.body));
			return chakram.wait();
      	});
    });

    it("should succeed", function () {
        expect(unconfirmTransactionResponse).to.have.status(200);
        return chakram.wait();
    });
    it("should have correct headers", function () {
        expect(unconfirmTransactionResponse).to.have.header('content-type', /json/);
        return chakram.wait();
    });

    it("should respond with proper status", function () {
    	expect(unconfirmTransactionResponse).to.have.json('transaction.status', 'N');
    	return chakram.wait();
    });

    it("should respond with data matching the transaction schema", function () {
        expect(unconfirmTransactionResponse).to.have.schema(params.expectedStoreTransactionScheme);
        return chakram.wait();
    });
});

describe("Delete created transaction", function() {
  
    before("Initializing new transaction", function () {
        newTransactionPost.then(function(response) {
        	transactionKey = response.body.transaction.key;
        	return deleteTransactionResponse = chakram.delete(endpoints.getTransaction(transactionKey));
      	})
      	.then(function(newResponse) {
			console.log('Following reponse was recieved at attempt to delete created transaction: ' + JSON.stringify(newResponse.body));
			return chakram.wait();
      	});
    });

    it("should succeed", function () {
        expect(deleteTransactionResponse).to.have.status(200);
        expect(deleteTransactionResponse).to.have.json('success', true);
        return chakram.wait();
    });

    it("should have correct headers", function () {
        expect(deleteTransactionResponse).to.have.header('content-type', /json/);
        return chakram.wait();
    });

});