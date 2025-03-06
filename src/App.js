import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  async function fetchProduct() {
    const response = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await response.json();
    console.log(data);
    if (data && data.products) {
      setProductList(data.products);
      setTotalPages(Math.floor(data.total / 10));
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [page]);

  const selectedPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };

  return (
    <div>
      {productList.length > 0 && (
        <div className="products">
          {productList.map((product) => (
            <span className="products__single" key={product.id}>
              <img src={product.thumbnail} alt="product thumbnail" />
              <span>{product.title}</span>
            </span>
          ))}
        </div>
      )}
      {productList.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => selectedPageHandler(page - 1)}
            className={page > 1 ? "" : "pagination__disable"}
          >
            ◀️
          </span>
          {[...Array(totalPages)].map((_, i) => (
            <span
              className={page === i + 1 ? "pagination__selected" : ""}
              onClick={() => selectedPageHandler(i + 1)}
              key={i}
            >
              {i + 1}
            </span>
          ))}

          <span
            onClick={() => selectedPageHandler(page + 1)}
            className={page < totalPages ? "" : "pagination__disable"}
          >
            ▶️
          </span>
        </div>
      )}
    </div>
  );
}
