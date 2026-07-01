import AdminPageShell from '../components/admin-page-shell';
import EntityManager, { type ColumnConfig, type FieldConfig } from '../components/entity-manager';

const doctorFields: FieldConfig[] = [
  { key: 'firstName', label: 'First Name', required: true },
  { key: 'lastName', label: 'Last Name', required: true },
  { key: 'department', label: 'Department', required: true },
  { key: 'specialty', label: 'Specialty', required: true },
  { key: 'qualification', label: 'Qualification', required: true },
  { key: 'experienceYears', label: 'Experience (years)', type: 'number', required: true },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone', required: true },
  { key: 'registrationNumber', label: 'Registration Number', required: true },
  { key: 'consultationFee', label: 'Consultation Fee', type: 'number', required: true },
  { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive', 'On Leave'], required: true },
];

const doctorColumns: ColumnConfig[] = [
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'department', label: 'Department' },
  { key: 'specialty', label: 'Specialty' },
  { key: 'status', label: 'Status' },
];

export default function DoctorsPage() {
  return (
    <AdminPageShell title="Doctors" description="Maintain the specialist roster, consultations, and availability information.">
      <EntityManager title="Specialist roster" description="Manage doctors, specialities, and consultation details." endpoint="/api/doctors" columns={doctorColumns} fields={doctorFields} />
    </AdminPageShell>
  );
}
