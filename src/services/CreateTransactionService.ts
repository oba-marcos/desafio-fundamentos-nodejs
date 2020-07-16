import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Transaction): Transaction {
    const balance = this.transactionsRepository.getBalance();
    if (type === 'outcome' && balance.total < value) {
      throw Error('Saldo insuficiente.');
    }
    const newTransaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return newTransaction;
  }
}

export default CreateTransactionService;
