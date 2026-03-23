import { useEffect, useRef } from 'react';

export default function AdUnit({
  slot,
  format = "auto",
  responsive = "true",
  style = {}
}) {
  const adRef = useRef(null);

  useEffect(() => {
    try {
      if (!adRef.current) return;

      // ✅ منع التكرار
      if (adRef.current.getAttribute("data-adsbygoogle-status")) {
        return;
      }

      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense Error", e);
    }
  }, []);

  return (
    <div className="ad-container my-8 w-full flex justify-center text-center overflow-hidden bg-slate-50/50 rounded-lg p-2">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", minWidth: "250px", ...style }}
        data-ad-client="ca-pub-9939500626060842"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}