'use client';

import { useEffect, useMemo, useState } from 'react';

export type FieldConfig = {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'date' | 'select' | 'textarea';
  options?: string[];
  placeholder?: string;
  required?: boolean;
};

export type ColumnConfig = {
  key: string;
  label: string;
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
};

type EntityManagerProps = {
  title: string;
  description: string;
  endpoint: string;
  columns: ColumnConfig[];
  fields: FieldConfig[];
  emptyText?: string;
};

export default function EntityManager({ title, description, endpoint, columns, fields, emptyText = 'No records found yet.' }: EntityManagerProps) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  const filteredItems = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return items;

    return items.filter((item) =>
      Object.values(item).some((value) => String(value ?? '').toLowerCase().includes(term)),
    );
  }, [items, searchTerm]);

  useEffect(() => {
    let cancelled = false;

    const loadItems = async () => {
      const response = await fetch(`${endpoint}?search=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) return;
      const data = await response.json();
      if (!cancelled) {
        setItems(Array.isArray(data) ? data : []);
      }
    };

    void loadItems();

    return () => {
      cancelled = true;
    };
  }, [endpoint, refreshKey, searchTerm]);

  const resetForm = () => {
    setEditingId(null);
    setFormData({});
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const payload = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value]),
    );

    if (editingId) {
      payload.id = editingId;
    }

    const response = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setMessage('Unable to save the record right now.');
      return;
    }

    setMessage(editingId ? 'Record updated.' : 'Record created.');
    setRefreshKey((value) => value + 1);
    resetForm();
  };

  const handleEdit = (row: Record<string, unknown>) => {
    setEditingId(String(row.id));
    const nextData: Record<string, string> = {};
    fields.forEach((field) => {
      const value = row[field.key];
      nextData[field.key] = value == null ? '' : String(value);
    });
    setFormData(nextData);
    setMessage('');
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this record?')) return;
    const response = await fetch(`${endpoint}?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    if (!response.ok) {
      setMessage('Unable to delete the record right now.');
      return;
    }

    setMessage('Record deleted.');
    setRefreshKey((value) => value + 1);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
            <p className="text-sm text-slate-500">{description}</p>
          </div>
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search records"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm outline-none focus:border-teal-500"
          />
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                {columns.map((column) => (
                  <th key={column.key} className="px-3 py-3 font-medium">
                    {column.label}
                  </th>
                ))}
                <th className="px-3 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-3 py-6 text-center text-slate-500">
                    {emptyText}
                  </td>
                </tr>
              ) : (
                filteredItems.map((row) => (
                  <tr key={String(row.id)} className="hover:bg-slate-50">
                    {columns.map((column) => (
                      <td key={column.key} className="px-3 py-3 text-slate-700">
                        {column.render ? column.render(row[column.key], row) : String(row[column.key] ?? '')}
                      </td>
                    ))}
                    <td className="px-3 py-3">
                      <div className="flex gap-2">
                        <button className="rounded-full bg-teal-600 px-3 py-1.5 text-sm font-medium text-white" onClick={() => handleEdit(row as Record<string, unknown>)}>
                          Edit
                        </button>
                        <button className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700" onClick={() => void handleDelete(String(row.id))}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">{editingId ? 'Edit record' : 'Add record'}</h2>
            <p className="text-sm text-slate-500">Capture changes quickly and keep records current.</p>
          </div>
          {editingId ? <button className="text-sm font-medium text-teal-600" onClick={resetForm}>Cancel</button> : null}
        </div>

        <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
          {fields.map((field) => {
            if (field.type === 'select') {
              return (
                <label key={field.key} className="block text-sm">
                  <span className="mb-1 block font-medium text-slate-700">{field.label}</span>
                  <select
                    value={formData[field.key] ?? ''}
                    onChange={(event) => setFormData((current) => ({ ...current, [field.key]: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2 outline-none focus:border-teal-500"
                    required={field.required}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              );
            }

            if (field.type === 'textarea') {
              return (
                <label key={field.key} className="block text-sm">
                  <span className="mb-1 block font-medium text-slate-700">{field.label}</span>
                  <textarea
                    value={formData[field.key] ?? ''}
                    onChange={(event) => setFormData((current) => ({ ...current, [field.key]: event.target.value }))}
                    placeholder={field.placeholder}
                    className="min-h-24 w-full rounded-2xl border border-slate-200 px-3 py-2 outline-none focus:border-teal-500"
                  />
                </label>
              );
            }

            return (
              <label key={field.key} className="block text-sm">
                <span className="mb-1 block font-medium text-slate-700">{field.label}</span>
                <input
                  type={field.type ?? 'text'}
                  value={formData[field.key] ?? ''}
                  onChange={(event) => setFormData((current) => ({ ...current, [field.key]: event.target.value }))}
                  placeholder={field.placeholder}
                  className="w-full rounded-2xl border border-slate-200 px-3 py-2 outline-none focus:border-teal-500"
                  required={field.required}
                />
              </label>
            );
          })}

          <button className="w-full rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800" type="submit">
            {editingId ? 'Save changes' : 'Create record'}
          </button>
        </form>

        {message ? <p className="mt-4 text-sm text-teal-600">{message}</p> : null}
      </section>
    </div>
  );
}
