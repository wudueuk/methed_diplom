export const balance = (from, account) =>
  (from === account ? -1 : 1);

export const mathUserBalance = data => {
  let positive = 0;
  let negative = 0;

  data.map(item => {
    balance(item.from) > 0 ?
      positive += item.amount : negative -= item.amount;
  }
  );

  return [positive, negative];
};
