const orderStates = ["initial", "inWork", "buyingSupplies", "producing", "fullfilled"] as const;

type OrderState = typeof orderStates[number];
type UserOrderState = Exclude<OrderState, "buyingSupplies" | "producing">;

export const getUserOrderStates = (orderStates: OrderState[]): UserOrderState[] => {
  return orderStates.filter((state): state is UserOrderState => state !== "buyingSupplies" && state !== "producing");
};
