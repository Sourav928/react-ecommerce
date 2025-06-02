import AdminProductDetail from "../features/admin/AdminProductDetail";
import Navbar from "../features/navbar/Navbar";

function AdminProductDetailPage() {
    return (
        <div>
            <Navbar>
                <AdminProductDetail></AdminProductDetail>
            </Navbar>
        </div>
      );
}

export default AdminProductDetailPage;