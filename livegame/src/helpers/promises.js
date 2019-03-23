const neverReject = promise =>
  promise.catch(e => {
    const error = e instanceof Error ? e : new Error(e);
    return error;
  });

const neverRejectAll = promises => promises.map(neverReject);

const sorted = (raw = []) => {
  const arr = Array.isArray(raw) ? raw : [raw];
  const sortedArr = {
    success: [],
    errors: []
  };

  arr.forEach(i => {
    if (i instanceof Error) {
      sortedArr.errors.push(i);
    } else {
      sortedArr.success.push(i);
    }
  });

  return sortedArr;
};

module.exports = {
  neverReject,
  neverRejectAll,
  sorted
};
