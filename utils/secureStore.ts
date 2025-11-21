import * as Keychain from "react-native-keychain";

const STORAGE_KEY = "authData";

// Save all tokens + userId together
export const saveAuthData = async (data: any) => {
  await Keychain.setGenericPassword(STORAGE_KEY, JSON.stringify(data));
};

// Get all stored data
export const getAuthData = async () => {
  const result = await Keychain.getGenericPassword();
  return result ? JSON.parse(result.password) : null;
};

// Remove all
export const removeAuthData = async () => {
  await Keychain.resetGenericPassword();
};
