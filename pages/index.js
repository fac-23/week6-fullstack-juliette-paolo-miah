import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { getProducts } from "../src/database/model";
import Layout from "../components/layout";
import CategoryFilter from "../components/Category.filter";
import React from "react";

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
  const [category, setCategory] = React.useState("all");

  console.log(allProducts);

  return (
    <div>
      <Layout home>
        <main>
          <section>
            <form>
              <CategoryFilter category={category} setCategory={setCategory} />
            </form>
          </section>

          <section className="products">
            <ul className="product-grid">
              {allProducts
                .filter((product) => {
                  if (category === "all") {
                    return true;
                  }
                  return product.type === category;
                })
                .map((product) => (
                  <Link href={`/products/${product.id}`} key={product.id}>
                    <a className="product-link">
                      <li className="product-card">
                        <h2>{product.title}</h2>
                        <p>Colour:{product.color}</p>
                        <p>Price: £{product.price}</p>
                        <img src={product.img} />
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
