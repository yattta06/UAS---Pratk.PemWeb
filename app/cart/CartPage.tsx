"use client";

import styles from "./CartPage.module.css";
import Link from "next/link";

type CartItem = {
  id: number;
  title: string;
  author: string;
  price: number;
  cover: string;
  qty: number;
};

export default function CartPage() {
  const cartItems: CartItem[] = []; 
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <div className={styles.container}>
      {/* LEFT */}
      <div className={styles.left}>
        <div className={styles.iconWrapper}>
          <span className={`material-symbols-outlined ${styles.bigIcon}`}>
            CART
          </span>
        </div>

        <h1 className={styles.title}>Your cart is feeling a bit light</h1>
        <p className={styles.subtitle}>
          Explore our library and find your next great story.
        </p>

        <Link href="/" className={styles.browseBtn}>
          <span>Start Browsing</span>
          <span className="material-symbols-outlined">auto_stories</span>
        </Link>
      </div>

      {/* RIGHT */}
      <div className={styles.right}>
        <div className={styles.summary}>
          <h2>Order Summary</h2>

          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>—</span>
          </div>

          <div className={styles.divider} />

          <div className={styles.totalRow}>
            <span>Total</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>

          <p className={styles.note}>Add items to proceed to checkout</p>
        </div>

        <div className={styles.recommend}>
          <h4>You might also like</h4>

          <div className={styles.recommendItem}>
  <div
    className={styles.bookCover}
    style={{
      backgroundImage: "url('/images/koko_guntur.jpeg')" ,
    }}
  />
  <div>
    <p className={styles.bookTitle}>GUNTUR THE LEGEND OF UNU</p>
    <p className={styles.bookMeta}>UCUP NINUNINU • Rp300.000</p>
  </div>
  <span className={`material-symbols-outlined ${styles.addIcon}`}>
    add_circle
  </span>
</div>
          </div>
        </div>
      </div>
  );
}
