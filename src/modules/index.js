const getProductModule = async () => {
    const dataCore = process.env.DATACORE;
    if(dataCore == "FIREBASE"){
        const ModelSource = await import("../daos/products/firebase.service.js");
        return ModelSource.default;
    }else if(dataCore == "FS"){
        const ModelSource = await import("../daos/products/fsProducts.service.js");
        return ModelSource.default; 
    }else if(dataCore == "MONGO"){
        const ModelSource = await import("../daos/products/mongoProducts.service.js");
        return ModelSource.default;
    }else{
        throw new Error("No Data Core selected");
    }
}

const ProductsService = async () => {
    const ProductsClass = await getProductModule();
    const productService = new ProductsClass();
    console.log(productService.getAllProducts());
}

export default ProductsService;