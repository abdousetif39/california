import { useEffect } from 'react';

export default function AdUnit({ slot, format = "auto", responsive = "true", style = {} }) {
    useEffect(() => {
        try {
            // Check to avoid pushing multiple times in React Strict Mode (Development)
            const adsbygoogle = window.adsbygoogle || [];
            // دفع الإعلان فقط إذا لم يتم تهيئته مسبقاً في هذه العقدة
            adsbygoogle.push({});
        } catch (e) {
            console.error("AdSense Error", e);
        }
    }, []);

    return (
        <div className="ad-container my-8 w-full flex justify-center text-center overflow-hidden bg-slate-50/50 rounded-lg p-2">
            <ins
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