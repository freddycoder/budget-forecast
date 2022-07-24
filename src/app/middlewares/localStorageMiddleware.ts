export const localStorageMiddleware = (store:any) => (next:any) => (action:any) => {
    const result = next(action);
    localStorage.setItem('simulation', JSON.stringify(store.getState().simulation));
    return result;
  };