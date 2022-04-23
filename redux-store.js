//action
const newOrdering = (name, amount) => {
  return {
    type: "NEW_ORDERING",
    payload: {
      name,
      amount,
    },
  };
};
const cancelOrdering = (name, refundAmount) => {
  return {
    type: "CANCEL_ORDERING",
    payload: {
      name,
      refundAmount,
    },
  };
};

//Reducers
const orderHistory = (oldOrderingList = [], action) => {
  if (action.type === "NEW_ORDERING") {
    return [...oldOrderingList, action.payload];
  } else if (action.type === "CANCEL_ORDERING") {
    return oldOrderingList.filter((record) => {
      return record.name !== action.payload.name;
    });
  }
  return oldOrderingList;
};

const cancellationHistory = (oldcancellationList = [], action) => {
  if (action.type === "CANCEL_ORDERING") {
    return [...oldcancellationList, action.payload];
  }
  return oldcancellationList;
};

const accounting = (totalMoney = 400, action) => {
  if (action.type === "NEW_ORDERING") {
    return totalMoney + action.payload.amount;
  } else if (action.type === "CANCEL_ORDERING") {
    return totalMoney - action.payload.refundAmount;
  }
  return totalMoney;
};

//Redux store
const { createStore, combineReducers } = Redux;

const centreStore = combineReducers({
  accounting: accounting,
  orderHistory: orderHistory,
  cancellationHistory: cancellationHistory,
});

const store = createStore(centreStore);

const action = newOrdering("Lekan", 40);
store.dispatch(action);

store.dispatch(newOrdering("Lekan", 40));
store.dispatch(newOrdering("Ifeoluwa", 27));
store.dispatch(newOrdering("Esther", 30));
store.dispatch(cancelOrdering("Esther", 25));

console.log(store.getState());
