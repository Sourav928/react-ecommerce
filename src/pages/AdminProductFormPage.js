import ProductForm from "../features/admin/ProductForm";
import Navbar from "../features/navbar/Navbar";

function AdminProductFormPage() {
    return (
        <>
            <Navbar>
                <ProductForm></ProductForm>
            </Navbar>
        </>
    );
}

export default AdminProductFormPage;