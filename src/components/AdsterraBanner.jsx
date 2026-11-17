
import { useEffect, useRef } from "react";

export default function AdsterraBanner() {
  const adRef = useRef(null);

  useEffect(() => {
    const container = adRef.current;
    if (!container) return;

    window.atOptions = {
      key: "2f226d644e29724196eef3f690bf9532",
      format: "iframe",
      height: 90,
      width: 728,
      params: {},
    };

    const script = document.createElement("script");
    script.src =
      "https://bauval.org/22/2f226d644e29724196eef3f690bf9532";
    script.async = true;

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <div style={{ width: "100%", textAlign: "center", margin: "25px auto" }}>
      <div style={{ fontSize: "11px", color: "#888", marginBottom: "5px" }}>
        Advertisement
      </div>

      <div
        ref={adRef}
        style={{
          width: "100%",
          maxWidth: "728px",
          minHeight: "90px",
          margin: "0 auto",
          overflowX: "auto",
        }}
      />
    </div>
  );
}
