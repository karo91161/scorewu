export const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };
  
  export const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };
  
  export const removeUser = () => {
    console.log('remooove')
    localStorage.removeItem('user');
  };