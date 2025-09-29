'use client';

import { useState, useEffect, useMemo } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import { getAllSheets, getDataSheet } from '@/service/table-service';
import { handleDownload } from '@/utils/download-xlsx';
import { Person } from '@/types/table-type';

import TableData from './table-data';

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor('indikator', {
    header: 'Indikator',
    cell: (info) => info.getValue(),
    size: 400,
    meta: {
      rowSpan: 3,
    },
  }),
  columnHelper.group({
    header: 'Triwulan I',
    columns: [
      columnHelper.accessor('t1', {
        header: 'Target',
        cell: (info) => info.getValue(),
        size: 150,
      }),
      columnHelper.accessor('r1', {
        header: 'Realisasi',
        cell: (info) => info.getValue(),
        size: 150,
      }),
    ],
  }),
  columnHelper.group({
    header: 'Triwulan II',
    columns: [
      columnHelper.accessor('t2', {
        header: 'Target',
        cell: (info) => info.getValue(),
        size: 150,
      }),
      columnHelper.accessor('r2', {
        header: 'Realisasi',
        cell: (info) => info.getValue(),
        size: 150,
      }),
    ],
  }),
  columnHelper.group({
    header: 'Triwulan III',
    columns: [
      columnHelper.accessor('t3', {
        header: 'Target',
        cell: (info) => info.getValue(),
        size: 150,
      }),
      columnHelper.accessor('r3', {
        header: 'Realisasi',
        cell: (info) => info.getValue(),
        size: 150,
      }),
    ],
  }),
  columnHelper.group({
    header: 'Triwulan IV',
    columns: [
      columnHelper.accessor('t4', {
        header: 'Target',
        cell: (info) => info.getValue(),
        size: 150,
      }),
      columnHelper.accessor('r4', {
        header: 'Realisasi',
        cell: (info) => info.getValue(),
        size: 150,
      }),
    ],
  }),
];

export default function Table() {
  const [selected, setSelected] = useState<string | null>(null);
  const [data, setData] = useState<Person[] | []>([]);
  const [keyword, setKeyword] = useState<string>('');

  const { data: sheets, isLoading: isSheetsLoading } = useQuery({
    queryKey: ['doGet'],
    queryFn: getAllSheets,
  });

  const mutation = useMutation({
    mutationFn: getDataSheet,
    onSuccess: (res) => {
      setData(res.data);
    },
    onError: (error: unknown) => {
      console.error('Gagal ambil data', error);
    },
  });

  useEffect(() => {
    if (sheets?.data?.length && !selected) {
      const lastSheet = sheets.data[sheets.data.length - 1];
      setSelected(lastSheet);
      mutation.mutate(lastSheet);
    }
  }, [sheets, selected, mutation]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelected(value);
    if (value) {
      mutation.mutate(value);
    }
  };

  const filteredData = useMemo(() => {
    return data.filter((o) =>
      o.indikator.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [keyword, data]);

  return (
    <div className="p-4">
      <h1 className="text-xl text-center md:text-2xl lg:text-[30px] font-bold">
        Data Kinerja Pendidikan <br /> Dinas Pendidikan Kabupaten Grobogan
      </h1>

      <div className="mt-8 min-h-[47dvh]">
        <div className="flex justify-between items-center gap-2">
          <div className="w-full flex items-center gap-2">
            <label className="hidden input input-info w-full md:flex md:w-full lg:w-[420px]">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                type="search"
                required
                placeholder="Cari Indikator"
                disabled={isSheetsLoading || mutation.isPending}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </label>
            <select
              disabled={isSheetsLoading || mutation.isPending}
              value={selected ?? ''}
              className="select select-info max-w-[150px]"
              onChange={handleChange}
            >
              <option value="" disabled>
                Pilih Tahun
              </option>
              {sheets?.data?.map((o: string) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          <button
            className="btn btn-primary w-[150px]"
            disabled={isSheetsLoading || mutation.isPending}
            onClick={() => handleDownload({ selected, data })}
          >
            {mutation.isPending ? 'Loading...' : 'Download'}
          </button>
        </div>

        <label className="input input-info w-full mt-3 md:hidden">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            required
            placeholder="Cari Indikator"
            disabled={isSheetsLoading || mutation.isPending}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </label>

        {/* Loader untuk table */}
        {isSheetsLoading || mutation.isPending ? (
          <div className="flex justify-center items-center h-[375px] mt-4">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <TableData columns={columns} data={filteredData} />
        )}
      </div>
    </div>
  );
}
