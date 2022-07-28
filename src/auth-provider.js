import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";

export const Auth0ProviderCustom = ({ children }) => {


  const domain = 'dev-mg6fdv6o.auth0.com';
  const clientId = "4xXgQ0eXJRefhenfBYuWECatmv46oiJL";
  const redirectUri = window.location.origin;
  const audience = 'http://localhost:5001';

  if (!(domain && clientId && audience)) {
    return null;
  }
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={redirectUri}
      audience={audience}
    >
      {children}
    </Auth0Provider>
  );

}
