import styles from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Top Section */}
      <div className={styles.topSection}>
        {/* Column 1 - Logo + Tagline */}
        <div className={styles.brandColumn}>
          <div className={styles.logo}>
            <span className={styles.logoText}>TalentFlow</span>
          </div>
          <p className={styles.tagline}>
            Top learning experiences that create more talent in the world.
          </p>
        </div>

        {/* Column 2 - Product */}
        <div className={styles.linkColumn}>
          <h4 className={styles.columnHeading}>Product</h4>
          <ul className={styles.linkList}>
            <li>
              <Link href='#'>Overview</Link>
            </li>
            <li>
              <Link href='#'>Features</Link>
            </li>
            <li>
              <Link href='#'>Solutions</Link>
            </li>
            <li>
              <Link href='#'>Tutorials</Link>
            </li>
            <li>
              <Link href='#'>Pricing</Link>
            </li>
          </ul>
        </div>

        {/* Column 3 - Company */}
        <div className={styles.linkColumn}>
          <h4 className={styles.columnHeading}>Company</h4>
          <ul className={styles.linkList}>
            <li>
              <Link href='#'>About us</Link>
            </li>
            <li>
              <Link href='#'>Features</Link>
            </li>
            <li>
              <Link href='#'>News</Link>
            </li>
          </ul>
        </div>

        {/* Column 4 - Social */}
        <div className={styles.linkColumn}>
          <h4 className={styles.columnHeading}>Social</h4>
          <ul className={styles.linkList}>
            <li>
              <Link href='#'>Twitter</Link>
            </li>
            <li>
              <Link href='#'>LinkedIn</Link>
            </li>
            <li>
              <Link href='#'>GitHub</Link>
            </li>
            <li>
              <Link href='#'>Clickup</Link>
            </li>
          </ul>
        </div>

        {/* Column 5 - Legal */}
        <div className={styles.linkColumn}>
          <h4 className={styles.columnHeading}>Legal</h4>
          <ul className={styles.linkList}>
            <li>
              <Link href='#'>Terms</Link>
            </li>
            <li>
              <Link href='#'>Privacy</Link>
            </li>
            <li>
              <Link href='#'>Cookies</Link>
            </li>
            <li>
              <Link href='#'>Contact</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className={styles.divider}></div>

      {/* Bottom Section */}
      <div className={styles.bottomSection}>
        <p className={styles.copyright}>
          © 2026 Team Mike – UI/UX. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className={styles.socialIcons}>
          {/* Twitter / X */}
          <Link
            href='#'
            className={styles.iconLink}
            aria-label='Twitter'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
            </svg>
          </Link>

          {/* LinkedIn */}
          <Link
            href='#'
            className={styles.iconLink}
            aria-label='LinkedIn'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
            </svg>
          </Link>

          {/* Facebook */}
          <Link
            href='#'
            className={styles.iconLink}
            aria-label='Facebook'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
