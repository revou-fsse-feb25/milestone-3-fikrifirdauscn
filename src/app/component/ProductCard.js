export default function ProductCard({ product }){

    const rawImageUrl = product.images?.[0] || '';
    const imageUrl = rawImageUrl.startsWith('http') 
    ? rawImageUrl.replace(/^hhttps/, 'https') 
    : `https://${rawImageUrl}`;

    return (
        <div className="border p-4 rounded"> 
            <img src={imageUrl} alt={product.title} className="w-full h-48 object-cover mb-2" />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
        </div>
    )
}