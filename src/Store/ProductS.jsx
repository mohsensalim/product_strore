

export default function ProductS({product})
{
    

    return(

        
            
                <tr >
                    <td className="fw-bold fs-4">{product.id}</td>
                    <td>{product.title}</td>
                    <td> <span className="text text-success fw-bold" >{product.price}</span></td>
                    <td>{product.description}</td>
                    <td>{product.category}</td>
                    <td><img src={product.image} alt={product.image} className="w-75" /></td>
                    <td><span className="text text-white p-1 bg-danger rounded">{product.rating.rate}⭐</span></td>
                  
                </tr>
           


                

    )




}