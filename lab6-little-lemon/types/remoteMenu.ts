export type RemoteMenuItem = {
  id: string;
  title: string;
  price: number;
  category: string;
};

export type MenuLoadState =
  | { status: 'loading' }
  | { status: 'success'; data: RemoteMenuItem[] }
  | { status: 'error'; message: string };
