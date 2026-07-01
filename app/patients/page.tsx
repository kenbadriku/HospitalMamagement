import AdminPageShell from '../components/admin-page-shell';
import EntityManager, { type ColumnConfig, type FieldConfig } from '../components/entity-manager';

const patientFields: FieldConfig[] = [
  { key: 'patientNumber', label: 'Patient Number', required: true },
  { key: 'firstName', label: 'First Name', required: true },
  { key: 'lastName', label: 'Last Name', required: true },
  { key: 'email', label: 'Email', type: 'text' },
  { key: 'phone', label: 'Phone', required: true },
  { key: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'], required: true },
  { key: 'bloodGroup', label: 'Blood Group', type: 'select', options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
  { key: 'address', label: 'Address', required: true },
  { key: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
  { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive', 'On Leave'], required: true },
];

const patientColumns: ColumnConfig[] = [
  { key: 'patientNumber', label: 'Patient No.' },
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'phone', label: 'Phone' },
  { key: 'status', label: 'Status' },
];

export default function PatientsPage() {
  return (
    <AdminPageShell title="Patients" description="Manage outpatient records, contact details, and active care status from one workspace.">
      <EntityManager title="Patient records" description="Search, review, and maintain outpatient records." endpoint="/api/patients" columns={patientColumns} fields={patientFields} />
    </AdminPageShell>
  );
}
