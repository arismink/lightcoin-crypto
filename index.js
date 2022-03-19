class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let x of this.transactions) {
      balance += x.value;
    }
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
    if (this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
      return true
    }
    return false;
  }
}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    if (this.amount + this.account.balance >= 0) return true;
    return false;
  }
}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    if (this.account.balance - this.amount < 0) return false;
    return true;
  }

}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");

console.log('Starting balance: ', myAccount.balance);

const t1 = new Deposit(120, myAccount);
t1.commit();

const t2 = new Withdrawal(50, myAccount);
t2.commit();

const t3 = new Withdrawal(100, myAccount);
t3.commit();


console.log('Ending Balance: ', myAccount.balance)
