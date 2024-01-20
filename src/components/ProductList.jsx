import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get('http://localhost:5000/products');
    setProducts(response.data);
  };

  const deleteProduct = async (uuid) => {
    await axios.delete(`http://localhost:5000/products/${uuid}`);
    getProducts();
  };

  return (
    <div>
      <h1 className='title'>Products</h1>
      <h2 className='subtitle'>List of Products</h2>
      <Link to='/products/add' className='button is-primary mb-2'>
        Add New
      </Link>
      <div className='table-container'>
        <table className='table is-striped is-fullwidth'>
          <thead>
            <tr>
              <th>No</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Created By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.uuid}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.user.name}</td>
                <td>
                  <div className='is-flex-mobile'>
                    <Link to={`/products/edit/${product.uuid}`} className='button is-small is-info mr-2'>
                      Edit
                    </Link>
                    <button onClick={() => deleteProduct(product.uuid)} className='button is-small is-danger'>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
