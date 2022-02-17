import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { getProducts } from "../src/database/model";
import Layout from "../components/layout";

// Retrieves all products and returns it as props
export async function getServerSideProps() {
  const allProducts = await getProducts();
  return {
    props: {
      allProducts,
    },
  };
}

// Renders home and accepts props with parsedProducts key
export default function Home({ allProducts }) {
  return (
    <div>
      <Layout home>
        <main>
          <section className="products">
            <ul className="product-grid">
              {allProducts.map((product) => (
                <Link href={`/products/${product.id}`} key={product.id}>
                  <a className="product-link">
                    <li className="product-card">
                      <img src={product.img} className="product-image" />

                      <div className="procuct-details stack-sm">
                        <h2 className="product-title">{product.title}</h2>
                        <p className="product-color">Colour:{product.color}</p>
                        <p className="product-price">
                          Price: £{product.price.toFixed(2)}
                        </p>
                      </div>
                    </li>
                  </a>
                </Link>
              ))}
            </ul>
          </section>
        </main>
      </Layout>
    </div>
  );
}

// Retrieves all products and returns it as props
// export async function getServerSideProps() {
//   const allProducts = await getProducts();
//   const parsedProducts = JSON.stringify(allProducts);
//   return {
//     props: {
//       parsedProducts,
//     },
//   };
// }

// // Renders home and accepts props with parsedProducts key
// export default function Home({ parsedProducts }) {
//   const arrayProducts = JSON.parse(parsedProducts);
//   {
//     arrayProducts.map((product) => {
//       console.log(product.size);
//     });
//   }
//   return <div></div>;
// }
