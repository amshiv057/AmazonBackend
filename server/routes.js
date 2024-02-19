import productContent from "./api/v1/controllers/product/routes";
import userContent from "./api/v1/controllers/user/routes";
import cartContent from "./api/v1/controllers/cart/routes";


export default function routes(app) {
    app.use('/api/v1/products', productContent)
    app.use('/api/v1/user', userContent)
    app.use("/api/v1/cart", cartContent)
    return app;
}