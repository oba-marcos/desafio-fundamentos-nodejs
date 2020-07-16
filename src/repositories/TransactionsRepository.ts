import { uuid } from 'uuidv4';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance: Balance = { income: 0, outcome: 0, total: 0 };
    this.transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        balance.income += transaction.value;
      }
      if (transaction.type === 'outcome') {
        balance.outcome += transaction.value;
      }
    });
    balance.total = balance.income - balance.outcome;
    return balance;
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const newTransaction = {
      id: uuid(),
      title,
      value,
      type,
    };
    this.transactions.push(newTransaction);
    return newTransaction;
  }
}

export default TransactionsRepository;
