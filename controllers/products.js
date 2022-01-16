const Product=require('../models/product');

exports.getAddProduct=(req,res,next)=>{
    res.render('add-product',{
        docTitle: 'Add Product', 
        path: '/admin/add-product',
        productCSS: true,
        activeAddProduct: true
    });
}

exports.postAddProduct=(req,res,next)=>{
    const title=req.body.title;
    const imageUrl=req.body.imageUrl;
    const price=req.body.price;
    const description=req.body.description;
    const product=new Product(null,title,imageUrl,description,price);
    product.save()
      .then(()=>{
        res.redirect('/');
      })
      .catch(err=>console.log(err));
}

exports.getProducts=(req, res, next) => {
  Product.fetchAll()
    .then(([rows,fieldData])=>{
      res.render("shop",{
        prods: rows,
        docTitle: 'Shop', 
        path: '/', 
        hasProducts: rows.length >0,
        activeShop: true,
        productCSS: true
      });
    })
    .catch(err=> console.log(err));
}
