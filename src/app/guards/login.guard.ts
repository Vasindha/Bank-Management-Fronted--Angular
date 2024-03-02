import { CanActivateFn } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  if(token == null){
    return false;
  }
  return true;
};
