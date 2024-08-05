import productModel from "../models/productModel.mjs";
const getProduct= async (req,res)=>{
    try {
    const products=await productModel.find();
    console.log(products);
    return res.status(200).send({status:"ok",data:products});
    } catch (error) {
        return res.status(500).send({status:"failed",message:error.message})
    }
}
const createProduct= async (req,res)=>{
   try {
    const data= req.body;
    console.log(data);
    const productdata= await productModel.create(data);
    return res.status(201).send({status:"ok",message:productdata});
   } catch (error) {
     return res.status(500).send({status:"failed",message:error.message})
   }
}
const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productModel.findByIdAndUpdate(id, req.body, { new: true });
    
    return res.status(200).send({ status: "ok", message: product });
  } catch (error) {
    return res.status(500).send({ status: "failed", message: error.message });
  }
}

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productModel.findByIdAndDelete(id);
   
    return res.status(200).send({ status: "ok", message: product });
  } catch (error) {
    return res.status(500).send({ status: "failed", message: error.message });
  }
}
const getFeaturedProducts = async (req, res) => {
  try {
    const products = await productModel.find({ featured: true });
    return res.status(200).send({ status: "ok", message: products });
  } catch (error) {
    return res.status(500).send({ status: "failed", message: error.message });
  }
}
const getProductsByPrice = async (req, res) => {
  const { maxPrice } = req.params;
  try {
    const products = await productModel.find({ price: { $gt: maxPrice } });
    return res.status(200).send({ status: "ok", message: products });
  } catch (error) {
    return res.status(500).send({ status: "failed", message: error.message });
  }
}
const getProductsByRating = async (req, res) => {
  const { minRating } = req.params;
  try {
    const products = await productModel.find({ rating: { $gte: minRating } });
    return res.status(200).send({ status: "ok", message: products });
  } catch (error) {
    return res.status(500).send({ status: "failed", message: error.message });
  }
}


export {getProduct,createProduct,updateProduct,deleteProduct,getFeaturedProducts,getProductsByPrice,getProductsByRating};