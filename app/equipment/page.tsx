import AdminPageShell from '../components/admin-page-shell';
import EntityManager, { type ColumnConfig, type FieldConfig } from '../components/entity-manager';

const equipmentFields: FieldConfig[] = [
  { key: 'name', label: 'Name', required: true },
  { key: 'department', label: 'Department', required: true },
  { key: 'status', label: 'Status', type: 'select', options: ['Operational', 'Under Maintenance', 'Decommissioned'], required: true },
  { key: 'lastMaintenance', label: 'Last Maintenance', type: 'date' },
  { key: 'nextMaintenance', label: 'Next Maintenance', type: 'date' },
  { key: 'description', label: 'Description', type: 'textarea' },
];

const equipmentColumns: ColumnConfig[] = [
  { key: 'name', label: 'Name' },
  { key: 'department', label: 'Department' },
  { key: 'status', label: 'Status' },
  { key: 'nextMaintenance', label: 'Next Maintenance' },
];

export default function EquipmentPage() {
  return (
    <AdminPageShell title="Equipment" description="Monitor critical equipment, maintenance schedules, and availability.">
      <EntityManager title="Equipment maintenance" description="Track the status and service schedule of critical equipment." endpoint="/api/equipment" columns={equipmentColumns} fields={equipmentFields} />
    </AdminPageShell>
  );
}
