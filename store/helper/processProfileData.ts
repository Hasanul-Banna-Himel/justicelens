export function processProfileData(data: object | any) {
  let obj = JSON.parse(JSON.stringify(data));

  delete obj["accessToken"];
  delete obj["auth"];
  delete obj["metadata"];
  delete obj["proactiveRefresh"];
  delete obj["providerData"];
  delete obj["providerId"];
  delete obj["reloadUserInfo"];
  delete obj["stsTokenManager"];
  delete obj["tenantId"];
  delete obj["userType"];

  return obj;
}
