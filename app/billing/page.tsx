import AdminPageShell from '../components/admin-page-shell';
import EntityManager, { type ColumnConfig, type FieldConfig } from '../components/entity-manager';

const billingFields: FieldConfig[] = [
  { key: 'billNumber', label: 'Bill Number', required: true },
  { key: 'patientId', label: 'Patient ID', required: true },
  { key: 'appointmentId', label: 'Appointment ID' },
  { key: 'totalAmount', label: 'Total Amount', type: 'number', required: true },
  { key: 'paidAmount', label: 'Paid Amount', type: 'number' },
  { key: 'status', label: 'Status', type: 'select', options: ['UNPAID', 'PARTIAL', 'PAID'], required: true },
  { key: 'paymentMethod', label: 'Payment Method', type: 'select', options: ['Cash', 'Card', 'Insurance', 'Online'] },
];

const billingColumns: ColumnConfig[] = [
  { key: 'billNumber', label: 'Bill Number' },
  { key: 'status', label: 'Status' },
  { key: 'paymentMethod', label: 'Payment Method' },
  { key: 'totalAmount', label: 'Total Amount' },
];

export default function BillingPage() {
  return (
    <AdminPageShell title="Billing" description="Track invoices, payments, and outstanding balances across the hospital.">
      <EntityManager title="Accounts overview" description="Track billing records, payments, and payment methods." endpoint="/api/billing" columns={billingColumns} fields={billingFields} />
    </AdminPageShell>
  );
}
