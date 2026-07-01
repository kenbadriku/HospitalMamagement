import AdminPageShell from '../components/admin-page-shell';
import EntityManager, { type ColumnConfig, type FieldConfig } from '../components/entity-manager';

const staffFields: FieldConfig[] = [
  { key: 'firstName', label: 'First Name', required: true },
  { key: 'lastName', label: 'Last Name', required: true },
  { key: 'email', label: 'Email', required: true },
  { key: 'phone', label: 'Phone', required: true },
  { key: 'department', label: 'Department', required: true },
  { key: 'role', label: 'Role', required: true },
  { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive', 'On Leave'], required: true },
];

const staffColumns: ColumnConfig[] = [
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'department', label: 'Department' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
];

export default function StaffPage() {
  return (
    <AdminPageShell title="Staff" description="Manage care team members, departments, and staffing status.">
      <EntityManager title="Staff directory" description="Maintain staffing records, departments, and team roles." endpoint="/api/staff" columns={staffColumns} fields={staffFields} />
    </AdminPageShell>
  );
}
