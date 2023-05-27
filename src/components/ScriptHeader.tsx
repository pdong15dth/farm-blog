import Script from "next/script";

export default function ScriptHeader() {

  return <>
    <Script strategy="afterInteractive" src="../../assets/bundles/libscripts.bundle.js" async></Script>
    <Script strategy="lazyOnload" src="../../assets/bundles/vendorscripts.bundle.js" async></Script>

    <Script strategy="lazyOnload" src="../../assets/bundles/knob.bundle.js" async></Script>

    <Script strategy="lazyOnload" src="../../assets/bundles/mainscripts.bundle.js" async></Script>
    <Script strategy="worker" src="../../assets/js/index.js" async></Script>
  </>
}