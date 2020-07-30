type DefaultProps<T> = React.ComponentType<T>["defaultProps"];

export const getDefaultProps = <T>(component: React.ComponentType<T>): DefaultProps<T> => {
  return component.defaultProps;
};
