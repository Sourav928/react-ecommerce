import AdminOrders from "../features/admin/AdminOrders";
import { AdminProductList } from "../features/admin/AdminProductList";
import Navbar from "../features/navbar/Navbar";

function AdminOrdersPage() {
    return (
        <div>
            <Navbar>
                <AdminOrders></AdminOrders>
            </Navbar>
        </div>
      );
}

export default AdminOrdersPage;