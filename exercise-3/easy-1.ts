const orderStates = ["initial", "inWork", "buyingSupplies", "producing", "fullfilled"] as const;

type OrderState = typeof orderStates[number];
type FilteredState = Exclude<OrderState, "buyingSupplies" | "producing">;

export const getUserOrderStates = (orderStates: OrderState[]): FilteredState[] => {
  const filteredStates = [] as FilteredState[];
  orderStates.forEach((element) => {
    if (element !== "buyingSupplies" && element !== "producing") {
      filteredStates.push(element);
    }
  });
  return filteredStates;
};
