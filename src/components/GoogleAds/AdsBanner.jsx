import { useEffect, useRef } from "react";

export default function AdBanner({ adSlot = "1234567890" }) {
  const insRef = useRef(null);

  useEffect(() => {
    const ins = insRef.current;
    if (!ins) return;

    // Agar ad allaqachon joylangan bo'lsa (AdSense odatda shu atributni qo'yadi)
    if (ins.getAttribute("data-adsbygoogle-status") === "done") return;

    const pushAd = () => {
      try {
        // yana bir tekshiruv — agar allaqachon to'ldirilgan bo'lsa chiqish
        if (ins.getAttribute("data-adsbygoogle-status") === "done") return;
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        // Bu yerni loglash foydali — ammo productionda konsolni tozalab qo'yishingiz mumkin
        console.warn("AdSense push failed:", err);
      }
    };

    // Agar element hozir kenglik olgan bo'lsa, darhol yuklaymiz
    const width = ins.getBoundingClientRect().width || ins.clientWidth;
    if (width > 0) {
      pushAd();
      return;
    }

    // Aks holda ResizeObserver bilan kutamiz (yo'q bo'lsa window.resize fallback)
    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver((entries) => {
        const w = entries[0].contentRect.width;
        if (w > 0) {
          pushAd();
          ro.disconnect();
        }
      });
      ro.observe(ins);
    } else {
      // Fallback: window resize
      const onResize = () => {
        const w = ins.getBoundingClientRect().width;
        if (w > 0) {
          pushAd();
          window.removeEventListener("resize", onResize);
        }
      };
      window.addEventListener("resize", onResize);
    }

    // Cleanup
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", () => {});
    };
  }, [adSlot]);

  // style: kenglikni 100% qilamiz va minimal balandlik beramiz
  return (
    <ins
      ref={insRef}
      className="adsbygoogle"
      style={{ display: "block", width: "100%", minHeight: 60 }}
      data-ad-client="ca-pub-9265714249739161"
      data-ad-slot={adSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
