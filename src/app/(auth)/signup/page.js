import RootLayout from '@/app/layout';
import styles from './Signup.module.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400'],
});

export default function SignUpPage() {
  return (
    <RootLayout>
      <main className={styles.main}>
        <div className={styles.left}>
          <div className={styles.text}>
            <h1 className={styles.h1}>Hey There!</h1>
            <p>Welcome to TelentFlow.</p>
            <p>You are just one step away to your feed.</p>
            <p className={styles.bottom}>Already have an account?</p>
            <button>Sign in</button>
          </div>
        </div>
        <div className={styles.right}>
          <h2>Create an account</h2>
          <p>Access your Results, Notes, Assignments, and Courses anytime, anywhere and keep everything flowing in one place.</p>
          <form>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <input type="password" placeholder="Confirm Password" required />
            <button type="submit">Sign Up</button>
            <p>Or use social media to sign up</p>
            <button>Sign up with Google</button>
            <button>Sign up with Linkedin</button>
          </form>
        </div>
      </main>
    </RootLayout>
  );
}
