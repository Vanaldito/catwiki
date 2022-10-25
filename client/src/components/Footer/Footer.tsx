import { Logo } from "../Logo";

import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <Logo color="white" />
      <div className="footer__bottom">
        <span className="footer__copy">&copy;</span> created by
        <a
          className="footer__author"
          target="_blank"
          rel="noreferrer"
          href="https://github.com/vanaldito"
        >
          Vanaldito
        </a>
        - devCallenge.io 2021
      </div>
    </footer>
  );
}
