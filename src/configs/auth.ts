export default {
  meEndpoint: "/auth/me",
  loginEndpoint: "/login",
  forgotPasswordEndpoint: "/request-password-reset",
  resetPasswordEndpoint: "/reset-password",
  registerEndpoint: "/register",
  storageTokenKeyName: "accessToken",
  storageUserDataKeyName: "userData",
  storageAbilitiesDataKeyName: "abilities",

  onTokenExpiration: "logout", // logout | refreshToken
};
