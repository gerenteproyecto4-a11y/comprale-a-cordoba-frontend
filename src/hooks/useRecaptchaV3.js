'use client';

import { useCallback, useEffect, useState } from 'react';

const BASE = 'https://recaptcha.google.com/recaptcha/api.js?render=';
const SCRIPT_ATTR = 'data-recaptcha-v3';

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function getScriptSrc(siteKey) {
  return `${BASE}${encodeURIComponent(siteKey)}`;
}

/**
 * Ensures the reCAPTCHA script exists and is fully loaded.
 * Handles cases where the script tag exists but hasn't fired onload yet
 * (common with Fast Refresh / repeated mounts).
 */
function ensureScriptLoaded(siteKey) {
  const src = getScriptSrc(siteKey);

  return new Promise((resolve, reject) => {
    let s = document.querySelector(`script[${SCRIPT_ATTR}="true"][src="${src}"]`);

    if (s) {
      const loaded = s.getAttribute('data-loaded') === 'true';
      if (loaded) {
        return resolve(src);
      }

      const onLoad = () => {
        s.setAttribute('data-loaded', 'true');
        cleanup();
        resolve(src);
      };
      const onError = (e) => {
        cleanup();
        reject(e);
      };
      const cleanup = () => {
        s.removeEventListener('load', onLoad);
        s.removeEventListener('error', onError);
      };

      s.addEventListener('load', onLoad);
      s.addEventListener('error', onError);
      return;
    }

    s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.defer = true;
    s.setAttribute(SCRIPT_ATTR, 'true');

    s.onload = () => {
      s.setAttribute('data-loaded', 'true');
      resolve(src);
    };

    s.onerror = (e) => {
      console.error('[recaptcha] script failed to load (new)', e);
      reject(e);
    };

    document.head.appendChild(s);
  });
}

/**
 * Wait until window.grecaptcha.ready exists (it may appear slightly after script load).
 */
async function waitForGrecaptchaReady({ timeoutMs = 4000, stepMs = 50 } = {}) {
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs) {
    if (window.grecaptcha?.ready && window.grecaptcha?.execute) return true;
    await sleep(stepMs);
  }
  return false;
}

export function useRecaptchaV3(siteKey) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setReady(false);

      if (!siteKey) {
        console.warn('[recaptcha] missing siteKey');
        return;
      }

      try {
        await ensureScriptLoaded(siteKey);
        if (cancelled) return;

        const ok = await waitForGrecaptchaReady({ timeoutMs: 6000, stepMs: 50 });

        if (!ok) {
          console.warn('[recaptcha] grecaptcha not available after timeout');
          return;
        }

        window.grecaptcha.ready(() => {
          if (cancelled) return;
          setReady(true);
        });
      } catch {
        if (!cancelled) setReady(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [siteKey]);

  const getToken = useCallback(
    async (action) => {
      if (!siteKey) throw new Error('Missing NEXT_PUBLIC_RECAPTCHA_SITE_KEY');
      if (!window.grecaptcha?.execute) throw new Error('grecaptcha.execute not available');
      return await window.grecaptcha.execute(siteKey, { action });
    },
    [siteKey]
  );

  return { ready, getToken };
}