/**
 * Google Consent Mode v2 bootstrap.
 *
 * Rendered FIRST in <head> (before GoogleAnalytics / GoogleTagManager) so it runs
 * synchronously during HTML parse, ahead of the afterInteractive analytics scripts.
 * Defaults every ad/analytics storage type to "denied" — so no tracking cookies land
 * before the visitor chooses — then re-applies their saved choice from localStorage
 * so returning users keep their state without being re-prompted.
 *
 * This is the gating that MUST be in place before the GA4/GTM env vars are enabled
 * (otherwise every visitor is tracked without consent — a DPDP Act 2023 breach).
 */
const BOOTSTRAP = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 1000
});
try {
  var s = localStorage.getItem('cts-consent');
  if (s) {
    var c = JSON.parse(s);
    gtag('consent', 'update', {
      ad_storage: c.ad_storage === 'granted' ? 'granted' : 'denied',
      ad_user_data: c.ad_user_data === 'granted' ? 'granted' : 'denied',
      ad_personalization: c.ad_personalization === 'granted' ? 'granted' : 'denied',
      analytics_storage: c.analytics_storage === 'granted' ? 'granted' : 'denied'
    });
  }
} catch (e) {}
window.gtag = gtag;
`;

export function ConsentDefault() {
  return <script dangerouslySetInnerHTML={{ __html: BOOTSTRAP }} />;
}
