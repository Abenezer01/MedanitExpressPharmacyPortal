declare global {
    interface Window {
      __NEXT_GUARD_PROPS__?: {
        guestGuard: boolean;
        authGuard: boolean;
      };
    }
  }
  
  export {};