import "dotenv/config";
import { AppointmentStatus, BillStatus, Prisma, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

const toDecimal = (value: string | number) => new Prisma.Decimal(String(value));

async function main() {
  const passwordHash = await bcrypt.hash("ChangeMe123!", 12);

  await prisma.user.upsert({
    where: { email: "admin@hospital.ug" },
    update: {},
    create: {
      email: "admin@hospital.ug",
      passwordHash,
      name: "System Administrator",
      role: Role.ADMIN,
    },
  });

  const patients = [
    { patientNumber: "P-1001", firstName: "Amina", lastName: "Nabirye", gender: "Female", dateOfBirth: new Date("1991-04-12"), phone: "+256774001001", email: "amina@example.com", address: "Kampala", bloodGroup: "O+", allergies: "Penicillin", emergencyContact: "+256700000001", status: "Active" },
    { patientNumber: "P-1002", firstName: "Daniel", lastName: "Ssekitoleko", gender: "Male", dateOfBirth: new Date("1988-09-21"), phone: "+256774001002", email: "daniel@example.com", address: "Mukono", bloodGroup: "A+", allergies: "None", emergencyContact: "+256700000002", status: "Active" },
    { patientNumber: "P-1003", firstName: "Sarah", lastName: "Muwonge", gender: "Female", dateOfBirth: new Date("1994-02-03"), phone: "+256774001003", email: "sarah@example.com", address: "Jinja", bloodGroup: "B+", allergies: "Latex", emergencyContact: "+256700000003", status: "Inactive" },
    { patientNumber: "P-1004", firstName: "Joseph", lastName: "Otim", gender: "Male", dateOfBirth: new Date("1979-11-15"), phone: "+256774001004", email: "joseph@example.com", address: "Gulu", bloodGroup: "AB+", allergies: "None", emergencyContact: "+256700000004", status: "Active" },
    { patientNumber: "P-1005", firstName: "Miriam", lastName: "Katusiime", gender: "Female", dateOfBirth: new Date("1996-06-27"), phone: "+256774001005", email: "miriam@example.com", address: "Mbarara", bloodGroup: "O-", allergies: "Sulphur", emergencyContact: "+256700000005", status: "Active" },
    { patientNumber: "P-1006", firstName: "Chris", lastName: "Kibirango", gender: "Male", dateOfBirth: new Date("1985-07-18"), phone: "+256774001006", email: "chris@example.com", address: "Mbale", bloodGroup: "A-", allergies: "None", emergencyContact: "+256700000006", status: "On Leave" },
  ];

  for (const patient of patients) {
    await prisma.patient.upsert({
      where: { patientNumber: patient.patientNumber },
      update: {},
      create: patient,
    });
  }

  const doctors = [
    { firstName: "Dr. Grace", lastName: "Kawuma", department: "Cardiology", specialty: "Interventional Cardiology", qualification: "MD, FACC", experienceYears: 14, email: "grace@example.com", phone: "+256774002001", registrationNumber: "DOC-001", consultationFee: 250000, availableDays: "Mon-Fri", availableFrom: "08:00", availableTo: "16:00", status: "Active" },
    { firstName: "Dr. Henry", lastName: "Mugisha", department: "Neurology", specialty: "Stroke Care", qualification: "MBBS, MSc", experienceYears: 11, email: "henry@example.com", phone: "+256774002002", registrationNumber: "DOC-002", consultationFee: 220000, availableDays: "Mon-Thu", availableFrom: "09:00", availableTo: "17:00", status: "Active" },
    { firstName: "Dr. Lydia", lastName: "Busingye", department: "Pediatrics", specialty: "Neonatal Care", qualification: "MD, Pediatrics", experienceYears: 9, email: "lydia@example.com", phone: "+256774002003", registrationNumber: "DOC-003", consultationFee: 200000, availableDays: "Mon-Fri", availableFrom: "08:30", availableTo: "15:30", status: "Active" },
    { firstName: "Dr. Ivan", lastName: "Muwanga", department: "Orthopedics", specialty: "Joint Replacement", qualification: "MBChB, FRCS", experienceYears: 16, email: "ivan@example.com", phone: "+256774002004", registrationNumber: "DOC-004", consultationFee: 260000, availableDays: "Tue-Sat", availableFrom: "10:00", availableTo: "18:00", status: "Active" },
    { firstName: "Dr. Natalie", lastName: "Aine", department: "General", specialty: "Family Medicine", qualification: "MBChB", experienceYears: 7, email: "natalie@example.com", phone: "+256774002005", registrationNumber: "DOC-005", consultationFee: 180000, availableDays: "Mon-Sat", availableFrom: "07:30", availableTo: "14:30", status: "Active" },
  ];

  for (const doctor of doctors) {
    const email = `${doctor.firstName.toLowerCase().replace(/\s+/g, ".")}@hospital.ug`;
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        passwordHash,
        name: `${doctor.firstName} ${doctor.lastName}`,
        role: Role.DOCTOR,
      },
    });

    await prisma.doctor.upsert({
      where: { registrationNumber: doctor.registrationNumber },
      update: {},
      create: {
        ...doctor,
        userId: user.id,
        consultationFee: toDecimal(doctor.consultationFee),
      },
    });
  }

  const staff = [
    { firstName: "Lilian", lastName: "Kakembo", email: "lilian@hospital.ug", phone: "+256774003001", department: "Nursing", role: "Nurse", status: "Active" },
    { firstName: "Moses", lastName: "Bbaale", email: "moses@hospital.ug", phone: "+256774003002", department: "Diagnostics", role: "Lab Tech", status: "Active" },
    { firstName: "Joy", lastName: "Kiggundu", email: "joy@hospital.ug", phone: "+256774003003", department: "Front Desk", role: "Receptionist", status: "Active" },
    { firstName: "Ronald", lastName: "Nabukeera", email: "ronald@hospital.ug", phone: "+256774003004", department: "Pharmacy", role: "Pharmacist", status: "Active" },
    { firstName: "Sarah", lastName: "Namutebi", email: "sarahn@hospital.ug", phone: "+256774003005", department: "Operations", role: "Admin", status: "Active" },
  ];

  for (const person of staff) {
    await prisma.staff.upsert({
      where: { email: person.email },
      update: {},
      create: person,
    });
  }

  const createdPatients = await prisma.patient.findMany({ take: 6 });
  const createdDoctors = await prisma.doctor.findMany({ take: 5 });

  const appointments = [
    { patientId: createdPatients[0].id, doctorId: createdDoctors[0].id, department: "Cardiology", date: new Date("2026-07-02"), time: "09:00", status: AppointmentStatus.CHECKED_IN, reason: "Chest pain review", notes: "Bring previous ECG" },
    { patientId: createdPatients[1].id, doctorId: createdDoctors[1].id, department: "Neurology", date: new Date("2026-07-03"), time: "11:30", status: AppointmentStatus.SCHEDULED, reason: "Headache and dizziness", notes: "Neurology referral" },
    { patientId: createdPatients[2].id, doctorId: createdDoctors[2].id, department: "Pediatrics", date: new Date("2026-07-04"), time: "14:00", status: AppointmentStatus.COMPLETED, reason: "Vaccination follow-up", notes: "All good" },
    { patientId: createdPatients[3].id, doctorId: createdDoctors[3].id, department: "Orthopedics", date: new Date("2026-07-05"), time: "10:00", status: AppointmentStatus.SCHEDULED, reason: "Knee pain", notes: "Bring X-ray" },
    { patientId: createdPatients[4].id, doctorId: createdDoctors[4].id, department: "General", date: new Date("2026-07-06"), time: "13:00", status: AppointmentStatus.CHECKED_IN, reason: "Annual checkup", notes: "Blood pressure monitoring" },
    { patientId: createdPatients[5].id, doctorId: createdDoctors[0].id, department: "Cardiology", date: new Date("2026-07-07"), time: "15:30", status: AppointmentStatus.SCHEDULED, reason: "Follow-up", notes: "Keep hydrated" },
  ];

  for (const appointment of appointments) {
    await prisma.appointment.create({ data: appointment });
  }

  const pharmacyItems = [
    { name: "Paracetamol", category: "Pain Relief", quantity: 200, price: 2500, supplier: "Medplus", expiryDate: new Date("2027-12-31"), description: "Fever and pain relief", status: "In Stock" },
    { name: "Amoxicillin", category: "Antibiotics", quantity: 120, price: 4500, supplier: "Healthline", expiryDate: new Date("2027-10-15"), description: "Broad-spectrum antibiotic", status: "In Stock" },
    { name: "Insulin", category: "Diabetes", quantity: 40, price: 18000, supplier: "CureLab", expiryDate: new Date("2027-03-02"), description: "Diabetes management", status: "Low Stock" },
    { name: "Vitamin C", category: "Supplements", quantity: 75, price: 12000, supplier: "Nutrivita", expiryDate: new Date("2028-01-05"), description: "Immune support", status: "In Stock" },
    { name: "Aspirin", category: "Pain Relief", quantity: 90, price: 1800, supplier: "Medplus", expiryDate: new Date("2026-09-20"), description: "Cardiovascular support", status: "In Stock" },
    { name: "Salbutamol", category: "Respiratory", quantity: 30, price: 6000, supplier: "Respira", expiryDate: new Date("2027-06-18"), description: "Asthma inhaler", status: "Low Stock" },
    { name: "Glucose Test Strips", category: "Diagnostics", quantity: 55, price: 3400, supplier: "TestPro", expiryDate: new Date("2027-08-10"), description: "Blood sugar testing", status: "In Stock" },
    { name: "Hydration Salts", category: "Oral Rehydration", quantity: 150, price: 2200, supplier: "CureLab", expiryDate: new Date("2027-11-11"), description: "Rehydration sachets", status: "In Stock" },
  ];

  for (const item of pharmacyItems) {
    await prisma.pharmacyItem.upsert({
      where: { name: item.name },
      update: {},
      create: { ...item, price: toDecimal(item.price) },
    });
  }

  const labTests = [
    { code: "HB", name: "Hemoglobin", category: "Hematology", specimen: "Blood", price: 5000, referenceRange: "11.5-16.5 g/dL", unit: "g/dL" },
    { code: "CBC", name: "Complete Blood Count", category: "Hematology", specimen: "Blood", price: 15000, referenceRange: "Reference values vary", unit: "counts" },
    { code: "RDT", name: "Malaria Rapid Diagnostic Test", category: "Serology", specimen: "Blood", price: 8000, referenceRange: "Negative", unit: "result" },
    { code: "URINE", name: "Urinalysis", category: "Microbiology", specimen: "Urine", price: 5000, referenceRange: "Normal", unit: "result" },
    { code: "X-RAY", name: "Chest X-Ray", category: "Imaging", specimen: "Imaging", price: 25000, referenceRange: "No abnormalities", unit: "report" },
  ];

  for (const test of labTests) {
    await prisma.labTest.upsert({
      where: { code: test.code },
      update: {},
      create: { ...test, price: toDecimal(test.price) },
    });
  }

  const equipment = [
    { name: "MRI Scanner", department: "Radiology", status: "Operational", lastMaintenance: new Date("2026-05-14"), nextMaintenance: new Date("2026-08-14"), description: "Advanced imaging system" },
    { name: "Patient Monitor", department: "ICU", status: "Operational", lastMaintenance: new Date("2026-04-17"), nextMaintenance: new Date("2026-07-17"), description: "Vital signs monitoring" },
    { name: "Autoclave", department: "Sterilization", status: "Under Maintenance", lastMaintenance: new Date("2026-03-02"), nextMaintenance: new Date("2026-07-14"), description: "Sterilization chamber" },
    { name: "Ventilator", department: "ICU", status: "Operational", lastMaintenance: new Date("2026-05-10"), nextMaintenance: new Date("2026-08-10"), description: "Critical care support" },
    { name: "Defibrillator", department: "Emergency", status: "Operational", lastMaintenance: new Date("2026-06-07"), nextMaintenance: new Date("2026-09-07"), description: "Emergency cardiac care" },
    { name: "Blood Analyzer", department: "Lab", status: "Operational", lastMaintenance: new Date("2026-05-25"), nextMaintenance: new Date("2026-08-25"), description: "Hematology analyzer" },
  ];

  for (const item of equipment) {
    await prisma.equipment.upsert({
      where: { name: item.name },
      update: {},
      create: item,
    });
  }

  const bills = [
    { billNumber: "INV-1001", patientId: createdPatients[0].id, appointmentId: (await prisma.appointment.findFirst({ where: { patientId: createdPatients[0].id } }))!.id, totalAmount: toDecimal(250000), paidAmount: toDecimal(250000), status: BillStatus.PAID, paymentMethod: "Card" },
    { billNumber: "INV-1002", patientId: createdPatients[1].id, totalAmount: toDecimal(180000), paidAmount: toDecimal(90000), status: BillStatus.PARTIAL, paymentMethod: "Cash" },
    { billNumber: "INV-1003", patientId: createdPatients[2].id, totalAmount: toDecimal(150000), paidAmount: toDecimal(0), status: BillStatus.UNPAID, paymentMethod: "Insurance" },
    { billNumber: "INV-1004", patientId: createdPatients[3].id, totalAmount: toDecimal(320000), paidAmount: toDecimal(320000), status: BillStatus.PAID, paymentMethod: "Online" },
    { billNumber: "INV-1005", patientId: createdPatients[4].id, totalAmount: toDecimal(115000), paidAmount: toDecimal(0), status: BillStatus.UNPAID, paymentMethod: "Cash" },
  ];

  for (const bill of bills) {
    await prisma.bill.upsert({
      where: { billNumber: bill.billNumber },
      update: {},
      create: bill,
    });
  }

  console.log("Seed completed");
}

main().finally(() => prisma.$disconnect());
