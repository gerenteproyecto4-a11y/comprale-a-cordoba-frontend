import Image from 'next/image';
import './Footer.css';

/**
 * ✅ Enabled logos (requested)
 * - El Titular
 * - RP Latam
 * - FundAcción
 * - Gobernación de Córdoba
 *
 * 🔁 To enable more logos later, just uncomment them below.
 */
const SUPPORT_LOGOS = [
  { src: '/brand/gobernacion-cordoba.png', alt: 'Gobernación de Córdoba' },
  { src: '/brand/fundaccion.png', alt: 'FundAcción' },

  // { src: '/brand/desarrollo-economico.svg', alt: 'Secretaría de Desarrollo Económico y Agroindustrial' },
  // { src: '/brand/alcaldia-monteria.svg', alt: 'Alcaldía de Montería' },
  // { src: '/brand/camara-comercio.svg', alt: 'Cámara de Comercio' },
];

const MEDIA_LOGOS = [
  { src: '/brand/el-titular.png', alt: 'El Titular' },
  { src: '/brand/rp-latam.png', alt: 'RP Latam' },

  // { src: '/brand/el-tiempo.png', alt: 'El Tiempo' },
  // { src: '/brand/Caracol.svg', alt: 'Caracol' },
  // { src: '/brand/ultima-hora.svg', alt: 'Última Hora' },
  // { src: '/brand/accion-interna.svg', alt: 'Acción Interna' },
  // { src: '/brand/Forbes.svg', alt: 'Forbes' },
];

function Footer({ sponsors }) {
  const showSupport = SUPPORT_LOGOS.length > 0 || (sponsors?.length ?? 0) > 0;
  const showMedia = MEDIA_LOGOS.length > 0;

  return (
    <footer className="footer" aria-label="Pie de página">
      <div className="footer__rule" />

      <div className="footer__container">
        <div className="footer__organizer">
          <span className="footer__organizer-label">Organiza:</span>
          <Image
            src="/brand/interrapidisimo.svg"
            alt="Inter Rapidísimo"
            className="footer__organizer-logo"
            width={190}
            height={48}
            priority={false}
          />
        </div>
      </div>

      <div className="footer__rule" />

      <div className="footer__row footer__row--bleed" aria-label="Aliados y medios">
        <div className="footer__row-inner">
          {showSupport ? <span className="footer__row-label">Apoya:</span> : null}

          <div className="footer__row-logos" aria-label="Logos">
            {SUPPORT_LOGOS.map((logo) => (
              <div className="footer__logo" key={logo.src} title={logo.alt}>
                <img src={logo.src} alt={logo.alt} className="footer__logo-img" loading="lazy" />
              </div>
            ))}

            {sponsors?.length > 0
              ? sponsors.map((s) => (
                  <div className="footer__logo" key={s.id} title={s.name}>
                    <img src={s.logo} alt={s.name} className="footer__logo-img" loading="lazy" />
                  </div>
                ))
              : null}

            {showSupport && showMedia ? (
              <span className="footer__row-label footer__row-label--inline">Medios aliados:</span>
            ) : null}

            {MEDIA_LOGOS.map((logo) => (
              <div className="footer__logo" key={logo.src} title={logo.alt}>
                <img src={logo.src} alt={logo.alt} className="footer__logo-img" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="footer__container">
        <p className="footer__copyright">
          © {new Date().getFullYear()} Cómprale a Córdoba · Todos los derechos reservados · Inter Rapidísimo
        </p>
      </div>
    </footer>
  );
}

export default Footer;