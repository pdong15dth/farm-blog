import Script from "next/script";

export default function ScriptHeader() {

  return <>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js" integrity="sha512-3gJwYpMe3QewGELv8k/BX9vcqhryRdzRMxVfq6ngyWXwo03GFEzjsUm8Q7RZcHPHksttq7/GFoxjCVUjkjvPdw==" crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
  
    <Script strategy="afterInteractive" src="../../assets/bundles/libscripts.bundle.js" async></Script>
    <Script strategy="worker" src="../../assets/bundles/vendorscripts.bundle.js" async></Script>

    <Script strategy="worker" src="../../assets/bundles/knob.bundle.js" async></Script>

    <Script strategy="worker" src="../../assets/bundles/mainscripts.bundle.js" async></Script>
    <Script strategy="worker" src="../../assets/js/index.js" async></Script>
  </>
}