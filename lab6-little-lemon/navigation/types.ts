export type StackParamList = {
  Login: undefined;
  Welcome: { email: string };
  RemoteMenu: undefined;
  Preferences: undefined;
  Customers: undefined;
};

export type TabParamList = {
  Login: undefined;
  Welcome: { email?: string } | undefined;
};

export type DrawerParamList = {
  Login: undefined;
  Welcome: { email?: string } | undefined;
};
