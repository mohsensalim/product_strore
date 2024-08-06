
import { useState, useEffect, useRef } from "react";
import ProductS from "./ProductS";

export default function ProductList()
{

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [inputSearch, setinputSearch] = useState('');
    const [categoryVal,setCategoryVal] = useState('');
    const inputRef = useRef();

    const getProducts = () =>{
        fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(response => setProducts(response));
    }

    const getCategories = () =>{
        fetch('https://fakestoreapi.com/products/categories')
        .then(response => response.json())
        .then(response => setCategories(response));
    }


    const displayProducts = () => {
        
        
        if(products.length > 0 )
        {
            
            const productTemp = products.filter(product => {
                return (inputSearch === '' || 
                    product.title.toLowerCase().includes(inputSearch.toLowerCase()) || 
                    product.id.toString().includes(inputSearch) || 
                    product.description.toLowerCase().includes(inputSearch.toLowerCase())) 
                && (categoryVal === '' || product.category === categoryVal)
                 
            })

            

            
            return productTemp.map((product) =>{
                            
                return <ProductS product={product} />
            })
        }
        else{
            return <tr>
            <td colSpan={7}>No products found</td>
        </tr>
        
        }
       
    }


    const displayCategories = () => {
        
        
        if(categories.length > 0)
        {
            

            return categories.map((category) =>{
                            
                return <button className="btn btn-info  text text-white fw-bold col-2 mx-4 my-4" value={category} onClick={handlClickCategory} > 
                {category} </button>   
               
            })
        }
        else{
            return <tr>
            <td colSpan={7}>No products found</td>
        </tr>
        
        }
       
    }


    
    useEffect(()=>{
        getProducts();
        getCategories();
        
    },[]);

    const handlClick = (e) =>{
        e.preventDefault();

        setinputSearch(inputRef.current.value);

    }

    const handlClickCategory = (e) =>{
        e.preventDefault();
       
        setCategoryVal(e.target.value);
        
        

    }
    

    return (
        <div className="container-fluix mx-auto w-75">
            <h2>Search : </h2>
            <form action="">
                <div className="form-group d-flex">
                    
                    <input ref={inputRef} className="mx-1 form-control w-50" type="text" id="search" placeholder="Search"  />
                    <input type="submit" value="Search" className="mx-1 btn btn-primary" onClick={handlClick}/>
                </div>
               
            </form>


            <h1>Product List</h1>
            <div className="row g-3 align-items-center">
                {displayCategories()}
            </div>
            <table className="table">
            
                <thead>
                    <tr key="">
                        <th>#ID</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        displayProducts()


                    }

                </tbody>

            </table>
        </div>
    )
}