import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { useActionData } from "react-router-dom";
import "./FoodSearch.css";

export const Action = async ({ request }) => {
  const formData = await request.formData();
  const search = formData.get("search");
  const encodedSearch = encodeURIComponent(search);
  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodedSearch}&tagtype_0=categories&tag_contains_0=contains&tag_0=dog%20food&json=true`
    );
    const data = await response.json();
    const products = data.products;
    return products;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

const FoodSearch = () => {
  const actionData = useActionData();
  const [searchResults, setSearchResults] = useState(actionData || null);
  console.log(searchResults);
  useEffect(() => {
    setSearchResults(actionData);
  }, [actionData]);
  return (
    <>
      <Form method="post">
        <input
          required
          placeholder="Search for brand"
          type="text"
          name="search"
        />
        <button>Search</button>
      </Form>
      {searchResults && (
        <div>
          Results:
          {searchResults.map((product, index) => {
            return (
              <div className="result--card" key={index}>
                <img src={product.image_url} />
                <h5>{product.product_name}</h5>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default FoodSearch;
