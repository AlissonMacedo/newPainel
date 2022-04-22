export type ToastMessage = {
  id: string;
  type: 'success' | 'error' | 'info' | 'alert';
  title: string;
  description?: string | undefined;
};
