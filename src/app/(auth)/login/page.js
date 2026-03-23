import RootLayout from '@/app/layout';
import styles from './Login.module.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400'],
});

export default function LoginPage() {
  return (
    <RootLayout>
      <main className={styles.main}>
        <div className={styles.left}>
          <div className={styles.text}>
            <h1 className={styles.h1}>Hey There!</h1>
            <p>Welcome Back.</p>
            <p>You are just one step away to your feed.</p>
            <p className={styles.bottom}>Don't have an account?</p>
             <a href="./signup"><button>Sign up</button></a>
          </div>
        </div>
        <div className={styles.right}>
          <h2>Sign in</h2>
          <p className={styles.info}>Sign into your Dashboard</p>
          <form>
            <input type="text" placeholder="Username" id='username' name='username' required />
            <input type="email" placeholder="Email" id='email' name='email' required />
            <div className={styles.passwordContainer}>
              <input type="password" placeholder="Password" id='password' name='password' required />
              <i className={[styles.eyeIcon, "fa-regular fa-eye"].join(' ')}></i>
            </div>
            <div className={styles.remContainer}>
              <div className={styles.remBox}>
                <input type="checkbox" id="rememberMe" name='rememberMe' />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <a href="#" className={styles.forgotPassword}>Forgot password?</a>
            </div>
            <button className={styles.signIn}>Sign in</button>
            <p className={styles.more}>Or use social media to sign in</p>              
              <button className={styles.button}>
                <i className={[styles.google, styles.moreIcon, "fa-brands fa-google"].join(' ')}></i>
                Continue with Google
              </button>
              <button className={styles.button}>
                <i className={[styles.linkedin, styles.moreIcon, "fa-brands fa-square-linkedin"].join(' ')}></i>
                Continue with Linkedin
              </button>
          </form>
        </div>
      </main>
    </RootLayout>
  );
}