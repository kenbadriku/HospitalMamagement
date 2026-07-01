import AdminPageShell from '../components/admin-page-shell';
import EntityManager, { type ColumnConfig, type FieldConfig } from '../components/entity-manager';

const pharmacyFields: FieldConfig[] = [
  { key: 'name', label: 'Name', required: true },
  { key: 'category', label: 'Category', required: true },
  { key: 'quantity', label: 'Quantity', type: 'number', required: true },
  { key: 'price', label: 'Price', type: 'number', required: true },
  { key: 'supplier', label: 'Supplier', required: true },
  { key: 'expiryDate', label: 'Expiry Date', type: 'date' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'status', label: 'Status', type: 'select', options: ['In Stock', 'Low Stock', 'Out of Stock'], required: true },
];

const pharmacyColumns: ColumnConfig[] = [
  { key: 'name', label: 'Name' },
  { key: 'category', label: 'Category' },
  { key: 'quantity', label: 'Quantity' },
  { key: 'status', label: 'Status' },
];

export default function PharmacyPage() {
  return (
    <AdminPageShell title="Pharmacy" description="Track stock levels, expiry dates, and medicine availability.">
      <EntityManager title="Pharmacy inventory" description="Monitor medicines, suppliers, and stock movement." endpoint="/api/pharmacy" columns={pharmacyColumns} fields={pharmacyFields} />
    </AdminPageShell>
  );
}
