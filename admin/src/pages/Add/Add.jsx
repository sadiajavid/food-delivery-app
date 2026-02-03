import React, { useEffect, useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const Add = ({ url }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const editItem = location.state || null;
  const isEdit = !!editItem;

  const [image, setImage] = useState(null);

  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Salad',
  });

  // =============================
  // PREFILL DATA FOR EDIT
  // =============================
  useEffect(() => {
    if (editItem) {
      setData({
        name: editItem.name,
        description: editItem.description,
        price: editItem.price,
        category: editItem.category,
      });
    }
  }, [editItem]);

  // =============================
  // INPUT HANDLER
  // =============================
  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // =============================
  // SUBMIT HANDLER
  // =============================
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price));
    formData.append('category', data.category);

    if (image) {
      formData.append('image', image);
    }

    try {
      let response;

      if (isEdit) {
        formData.append('id', editItem._id);
        response = await axios.post(`${url}/api/food/update`, formData);
      } else {
        response = await axios.post(`${url}/api/food/add`, formData);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/list');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        
        {/* IMAGE UPLOAD */}
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : editItem?.image
                  ? `${url}/images/${editItem.image}`
                  : assets.upload_area
              }
              alt=""
            />
          </label>
          <input
            type="file"
            id="image"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
            required={!isEdit}
          />
        </div>

        {/* NAME */}
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={onChangeHandler}
            placeholder="Type here"
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            name="description"
            value={data.description}
            onChange={onChangeHandler}
            rows="6"
            placeholder="Write content here"
            required
          />
        </div>

        {/* CATEGORY & PRICE */}
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={onChangeHandler}
              placeholder="$20"
              required
            />
          </div>
        </div>

        {/* BUTTON */}
        <button type="submit" className="add-btn">
          {isEdit ? 'UPDATE' : 'ADD'}
        </button>
      </form>
    </div>
  );
};

export default Add;
