/*
Allow multiple accounts to be created
Each account can have many transactions
Allow withdrawals and deposits into accounts
Allow us to retrieve the transaction history of an account (all withdrawals and deposits)
Allow us to retrieve the current balance of the account at any time
Don't allow withdrawals that exceed the remaining balance of the account
*/

class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    let balance = 0;
    for (let t of this.transactions) {
      balance += t.value;
    }
    // calculate the balance using transaction objects
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (!this.isAllowed())
      return false;
    // keep track of the time of transaction
    this.time = new Date();
    // add the transaction to the account
    this.account.addTransaction(this);
    return true;
  }
}

class Deposit extends Transaction {

  get value() {
    return this.amount
  }

  isAllowed() {
    // deposits always allowed
    return true
  }
}

class Withdrawal extends Transaction {
  // update the balance in the account
  // commit() {
  //   this.account.balance -= this.amount;
  // }
  get value() {
    return -this.amount
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("kk");
console.log(`Starting balance: ${myAccount.balance}`);

t1 = new Withdrawal(1.25, myAccount);
console.log('Commit result:', t1.commit());
console.log('Account balance:', myAccount.balance);

t2 = new Deposit(20.00, myAccount);
console.log('Commit result:', t2.commit());
console.log('Account balance:', myAccount.balance);

t3 = new Withdrawal(15.00, myAccount);
console.log('Commit result:', t3.commit());
console.log('Account balance:', myAccount.balance);

console.log(`Ending balance: ${myAccount.balance}`);
console.log('Transaction History:', myAccount.transactions);

