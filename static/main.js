class Profile {
	constructor({username, name: {firstName, lastName}, password}) {
		this.username = username;
		this.name = {
			firstName,
			lastName
		};
		this.psssword = password;
	}

	newUser(callback) {
		return ApiConnector.createUser(
			{username: this.username, name: this.name, password: this.password},
			(error, data) => {console.log(`Craeting new user ${this.username}`);
			callback(error, data);}
		);
	}

	loginUser(callback) {
		return ApiConnector.performLogin(
			{username: this.username, password: this.password},
			(error, data) => {console.log(`Login user ${this.username}`);
			callback(error, data);}
		);

	}

	addMoney({currency, amount}, callback) {
		return ApiConnector.addMoney({currency, amount},
			(error, data) => {console.log(`Adding ${amount} of ${currency} to ${this.username}`);
			callback(error, data);}
		);
	}

	convertMoney({fromCurrency, targetCurrency, targetAmount}, callback) {
		return ApiConnector.convertMoney({fromCurrency, targetCurrency, targetAmount},
			(error, data) => {console.log(`Converting ${fromCurrency} to ${targetAmount} ${targetCurrency}`);
			callback(error, data);}
		);
	}

	transferMoney({to, amount}, callback) {
        return ApiConnector.transferMoney({to, amount}, 
            (error, data) => {console.log(`Transfering ${amount} Netcoins to ${to}`); 
            callback(error, data);}
		);
    }
}

function getStocks (callback) {
	return ApiConnector.getStocks((error, data) => {console.log(`Getting stocks info`);
		callback(error, data);}
	);
}

let course = getStocks((error, data) => {
	if (!error) {
		course = data[10]
	} 

	console.log(course);
})

const money = {
	currency: 'USD',
	amount: 1000
}

const convert = {

}

function main() {
	const Ivan = new Profile({
                    username: 'ivan',
                    name: { firstName: 'Ivan', lastName: 'Chernyshev' },
                    password: 'ivanspass',
                });
	const Test = new Profile({
                    username: 'testUser',
                    name: { firstName: 'test', lastName: 'user' },
                    password: 'testTest',
                });
	Ivan.newUser((error, data) => {
		if (error) {
			console.log(`Error Ivan.newUser`);
		} else {
			console.log(`New user ${Ivan.username}`);
			Ivan.loginUser((error, data) => {
				if (error) {
					console.log(`Error Ivan.loginUser`);
				} else {
					console.log(`Login user ${Ivan.username}`);
					Ivan.addMoney(money, (error, data) => {
						if (error) {
							console.log(`Error Ivan.addMoney`);
						} else {
							console.log(`Add ${money.amount} - ${money.currency}`);
							const convert = {
								fromCurrency: 'USD',
								targetCurrency: 'NETCOIN',
								targetAmount: money.amount * course.USD_NETCOIN
							}
							console.log(convert);
							Ivan.convertMoney(convert, (error, data) => {
								if (error) {
									console.log(`Error Ivan.convertMoney`);
								} else {
									console.log('Money converted');
									Test.newUser((error, data) => {
										if (error) {
											console.log(`Error Test.newUser`);
										} else {
											console.log(`New user ${Test.username}`);
											const testTransfer = {
												to: 'testUser',
												amount: 10
											}
											Ivan.transferMoney(testTransfer, (error, data) => {
												if (error) {
													console.log(`Error Ivan.transferMoney`);
												} else {
													console.log(`Transfering`);
												}
											})
										}
									})
								}
							})
						}
					})

				}
			})

		}
	})
}

main();