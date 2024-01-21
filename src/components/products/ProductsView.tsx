


export const ProductsView = ({ type }: { type: string }) => {

    const products = [
        {
            name: "Balenciaga T-Shirt",
            category: "T-Shirts",
            price: 100,
            image: "https://images.unsplash.com/photo-1593642532452-8d0f8ae7b3e8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dCUyMHRzaGlydHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
        },
        {
            name: "Balenciaga Hoodie",
            category: "Hoodies",
            price: 100,
            image: "https://images.unsplash.com/photo-1593642532452-8d0f8ae7b3e8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dCUyMHRzaGlydHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
        },
        {
            name: "Balenciaga Bottoms",
            category: "Bottoms",
            price: 100,
            image: "https://images.unsplash.com/photo-1593642532452-8d0f8ae7b3e8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dCUyMHRzaGlydHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
        },
        {
            name: "Balenciaga Headwear",
            category: "Headwear",
            price: 100,
            image: "https://images.unsplash.com/photo-1593642532452-8d0f8ae7b3e8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dCUyMHRzaGlydHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
        },
    ]

    return (
        <div className="grid grid-cols-4 gap-8 w-max">
            {type === "all" && products.map((product) => (
                <div className="flex flex-col gap-4" key={product.name}>
                    <img src={product.image} alt="" className="w-48
                        h-48 object-cover" />
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-bold">{product.name}</h3>
                        <span className="text-sm font-semibold">{product.category}</span>
                        <span className="text-sm font-semibold">{product.price}</span>
                    </div>
                </div>
            ))}
            {/* show only products with category of T-Shirts */}
            {type === "t-shirts" && products.filter((product) => product.category === "T-Shirts").map((product) => (
                <div className="flex flex-col gap-4" key={product.name}>
                    <img src={product.image} alt="" className="w-48
                        h-48 object-cover" />
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-bold">{product.name}</h3>
                        <span className="text-sm font-semibold">{product.category}</span>
                        <span className="text-sm font-semibold">{product.price}</span>
                    </div>
                </div>
            ))}
            {/* show only products with category of Hoodies */}
            {type === "hoodies" && products.filter((product) => product.category === "Hoodies").map((product) => (
                <div className="flex flex-col gap-4" key={product.name}>
                    <img src={product.image} alt="" className="w-48
                        h-48 object-cover" />
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-bold">{product.name}</h3>
                        <span className="text-sm font-semibold">{product.category}</span>
                        <span className="text-sm font-semibold">{product.price}</span>
                    </div>
                </div>
            ))}
            {/* show only products with category of Bottoms */}
            {type === "bottoms" && products.filter((product) => product.category === "Bottoms").map((product) => (
                <div className="flex flex-col gap-4" key={product.name}>
                    <img src={product.image} alt="" className="w-48
                        h-48 object-cover" />
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-bold">{product.name}</h3>
                        <span className="text-sm font-semibold">{product.category}</span>
                        <span className="text-sm font-semibold">{product.price}</span>
                    </div>
                </div>
            ))}
            {/* show only products with category of Headwear */}
            {type === "headwears" && products.filter((product) => product.category === "Headwear").map((product) => (
                <div className="flex flex-col gap-4" key={product.name}>
                    <img src={product.image} alt="" className="w-48
                        h-48 object-cover" />
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-bold">{product.name}</h3>
                        <span className="text-sm font-semibold">{product.category}</span>
                        <span className="text-sm font-semibold">{product.price}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}