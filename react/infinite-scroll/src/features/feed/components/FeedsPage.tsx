/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ProductService,
  type Product,
} from "../../../shared/utils/product.service";
import Card from "./Card";
import LastFeed from "./LastFeed";
import Loading from "./Loading";
// import SentlineObserver from "./SentlineObserver";

function FeedsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isloading, setIsloading] = useState<boolean>(false);
  const skipRef = useRef(0);
  const isFetchingRef = useRef(false);
  const limit = 20;
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const fetchProducts =useCallback(async () => {
    if (isFetchingRef.current || !hasMore) return;
    try {
      setIsloading(true);
      isFetchingRef.current = true;
      const response = await ProductService.getProducts(skipRef.current, limit);
      setProducts((prevProducts) => [...prevProducts, ...response.products]);
      skipRef.current += limit;
      if (skipRef.current >= response.total) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsloading(false);
      isFetchingRef.current = false;
    }
  },[hasMore]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        fetchProducts();
      }
    });
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="w-full h-full bg-gray-100">
      {products.map((product) => (
        <Card
          key={product.id}
          title={product.title}
          category={product.category}
          thumbnail_image={product.thumbnail}
          price={product.price}
        />
      ))}
      {isloading && <Loading />}
      {!hasMore && <LastFeed/>}
      <div ref={sentinelRef} className="h-2" />
    </section>
  );
}

export default FeedsPage;
