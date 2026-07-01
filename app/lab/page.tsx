import AdminPageShell from '../components/admin-page-shell';
import EntityManager, { type ColumnConfig, type FieldConfig } from '../components/entity-manager';

const labFields: FieldConfig[] = [
  { key: 'orderNumber', label: 'Order Number', required: true },
  { key: 'patientId', label: 'Patient ID', required: true },
  { key: 'doctorId', label: 'Doctor ID' },
  { key: 'status', label: 'Status', type: 'select', options: ['ORDERED', 'COLLECTED', 'PROCESSING', 'COMPLETED', 'CANCELLED'], required: true },
  { key: 'priority', label: 'Priority', type: 'select', options: ['ROUTINE', 'URGENT', 'STAT'] },
];

const labColumns: ColumnConfig[] = [
  { key: 'orderNumber', label: 'Order Number' },
  { key: 'status', label: 'Status' },
  { key: 'priority', label: 'Priority' },
];

export default function LabPage() {
  return (
    <AdminPageShell title="Laboratory" description="Track sample requests, test priorities, and diagnostic progress.">
      <EntityManager title="Lab orders" description="Coordinate diagnostic requests and pending test status." endpoint="/api/lab" columns={labColumns} fields={labFields} />
    </AdminPageShell>
  );
}
