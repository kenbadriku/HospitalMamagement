import AdminPageShell from '../components/admin-page-shell';
import EntityManager, { type ColumnConfig, type FieldConfig } from '../components/entity-manager';

const appointmentFields: FieldConfig[] = [
  { key: 'patientId', label: 'Patient ID', required: true },
  { key: 'doctorId', label: 'Doctor ID', required: true },
  { key: 'department', label: 'Department', required: true },
  { key: 'date', label: 'Date', type: 'date', required: true },
  { key: 'time', label: 'Time', required: true },
  { key: 'status', label: 'Status', type: 'select', options: ['SCHEDULED', 'CHECKED_IN', 'COMPLETED', 'CANCELLED'], required: true },
  { key: 'notes', label: 'Notes', type: 'textarea' },
];

const appointmentColumns: ColumnConfig[] = [
  { key: 'department', label: 'Department' },
  { key: 'date', label: 'Date' },
  { key: 'time', label: 'Time' },
  { key: 'status', label: 'Status' },
];

export default function AppointmentsPage() {
  return (
    <AdminPageShell title="Appointments" description="Coordinate care schedules, capture booking notes, and track the visit lifecycle.">
      <EntityManager title="Appointment queue" description="Manage booking details, time slots, and care notes." endpoint="/api/appointments" columns={appointmentColumns} fields={appointmentFields} />
    </AdminPageShell>
  );
}
