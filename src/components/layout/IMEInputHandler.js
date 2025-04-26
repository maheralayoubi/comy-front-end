import { useEffect } from "react";

export default function IMEInputHandler() {
  useEffect(() => {
    const setupIMEHandling = () => {
      setTimeout(() => {
        const textareas = document.querySelectorAll('.copilotKitInput textarea');
        textareas.forEach(textarea => {
          let isComposing = false;

          textarea.addEventListener('compositionstart', () => {
            isComposing = true;
          });

          textarea.addEventListener('compositionend', () => {
            isComposing = false;
          });

          textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey && isComposing) {
              e.stopPropagation();
            }
          }, true);
        });
      }, 500);
    };

    setupIMEHandling();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          setupIMEHandling();
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
