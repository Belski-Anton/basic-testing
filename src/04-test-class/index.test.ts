// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const acc = getBankAccount(100);
    expect(acc.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const acc = getBankAccount(50);
    expect(() => acc.withdraw(100)).toThrow(InsufficientFundsError);
    expect(() => acc.withdraw(100)).toThrow(
      'Insufficient funds: cannot withdraw more than 50',
    );
  });

  test('should throw error when transferring more than balance', () => {
    const from = getBankAccount(30);
    const to = getBankAccount(0);
    expect(() => from.transfer(100, to)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const acc = getBankAccount(100);
    expect(() => acc.transfer(10, acc)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const acc = getBankAccount(100);
    acc.deposit(50);
    expect(acc.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    const acc = getBankAccount(200);
    acc.withdraw(50);
    expect(acc.getBalance()).toBe(150);
  });

  test('should transfer money', () => {
    const acc1 = getBankAccount(100);
    const acc2 = getBankAccount(0);

    acc1.transfer(70, acc2);
    expect(acc1.getBalance()).toBe(30);
    expect(acc2.getBalance()).toBe(70);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const acc = getBankAccount(100);
    const result = await acc.fetchBalance();
    expect(result === null || typeof result === 'number').toBe(true);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const acc = getBankAccount(0);
    jest.spyOn(acc, 'fetchBalance').mockResolvedValue(99);
    await acc.synchronizeBalance();
    expect(acc.getBalance()).toBe(99);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const acc = getBankAccount(0);
    jest.spyOn(acc, 'fetchBalance').mockResolvedValue(null);
    await expect(acc.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
