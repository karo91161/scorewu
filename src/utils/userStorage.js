export const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };
  

  export const getUser = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = localStorage.getItem('user');
        resolve(user ? JSON.parse(user) : null);
      }, 0);
    });
  };
  
  export const removeUser = () => {
    localStorage.removeItem('user');
  };