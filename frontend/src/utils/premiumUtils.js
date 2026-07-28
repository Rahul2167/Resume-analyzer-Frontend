/**
 * premiumUtils.js
 * All premium status is scoped to the currently logged-in user's email.
 * Keys follow the pattern:  isPremium_<email>, premiumExpiry_<email>, paymentHistory_<email>
 * This prevents premium from leaking across different user accounts.
 */

export const getCurrentEmail = () =>
  localStorage.getItem("userEmail") || localStorage.getItem("tempEmail") || "";

const premiumKey   = (email) => `isPremium_${email}`;
const expiryKey    = (email) => `premiumExpiry_${email}`;
const historyKey   = (email) => `paymentHistory_${email}`;

/** Returns true only if the CURRENT logged-in user has valid (non-expired) premium */
export const checkUserPremium = () => {
  const email = getCurrentEmail();
  if (!email) return false;

  const isPrem = localStorage.getItem(premiumKey(email)) === "true";
  if (!isPrem) return false;

  const expiry = localStorage.getItem(expiryKey(email));
  if (!expiry) return true;

  const diffMs = new Date(expiry) - new Date();
  if (diffMs <= 0) {
    // Expired — clean up
    localStorage.removeItem(premiumKey(email));
    localStorage.removeItem(expiryKey(email));
    window.dispatchEvent(new Event("storage"));
    return false;
  }
  return true;
};

/** Returns days remaining for the current user, or 0 */
export const getPremiumDaysLeft = () => {
  const email = getCurrentEmail();
  if (!email) return 0;
  const expiry = localStorage.getItem(expiryKey(email));
  if (!expiry) return localStorage.getItem(premiumKey(email)) === "true" ? 30 : 0;
  const diffMs = new Date(expiry) - new Date();
  return diffMs > 0 ? Math.ceil(diffMs / (1000 * 60 * 60 * 24)) : 0;
};

/** Grant premium to the current user for `days` days */
export const grantPremium = (days = 30) => {
  const email = getCurrentEmail();
  if (!email) return;
  const expiry = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
  localStorage.setItem(premiumKey(email), "true");
  localStorage.setItem(expiryKey(email), expiry);
  localStorage.removeItem("isPremium"); // Remove legacy un-namespaced key
  window.dispatchEvent(new Event("storage"));
};

/** Revoke premium for the current user */
export const revokePremium = () => {
  const email = getCurrentEmail();
  if (!email) return;
  localStorage.removeItem(premiumKey(email));
  localStorage.removeItem(expiryKey(email));
  localStorage.removeItem("isPremium");
  window.dispatchEvent(new Event("storage"));
};

/** Add a payment record for the current user */
export const addPaymentRecord = (record) => {
  const email = getCurrentEmail();
  if (!email) return;
  const history = JSON.parse(localStorage.getItem(historyKey(email)) || "[]");
  history.unshift(record);
  localStorage.setItem(historyKey(email), JSON.stringify(history));
};

/** Get payment history for the current user */
export const getPaymentHistory = () => {
  const email = getCurrentEmail();
  if (!email) return [];
  return JSON.parse(localStorage.getItem(historyKey(email)) || "[]");
};
