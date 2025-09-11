'use client';

import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import { getAllSheets, getDataSheet } from '@/service/table-service';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

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
  const [data, setData] = useState([]);

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

  const handleDownload = async () => {
    if (!data.length || !selected) return;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data Pendidikan');

    // === HEADER ===
    worksheet.mergeCells('A1:A3');
    worksheet.getCell('A1').value = 'Indikator';

    worksheet.mergeCells('B1:I1');
    worksheet.getCell('B1').value = selected;

    worksheet.mergeCells('B2:C2');
    worksheet.getCell('B2').value = 'TW I';
    worksheet.mergeCells('D2:E2');
    worksheet.getCell('D2').value = 'TW II';
    worksheet.mergeCells('F2:G2');
    worksheet.getCell('F2').value = 'TW III';
    worksheet.mergeCells('H2:I2');
    worksheet.getCell('H2').value = 'TW IV';

    // baris 3 manual (biar merge A1:A3 tidak pecah)
    worksheet.getCell('B3').value = 'Target';
    worksheet.getCell('C3').value = 'Realisasi';
    worksheet.getCell('D3').value = 'Target';
    worksheet.getCell('E3').value = 'Realisasi';
    worksheet.getCell('F3').value = 'Target';
    worksheet.getCell('G3').value = 'Realisasi';
    worksheet.getCell('H3').value = 'Target';
    worksheet.getCell('I3').value = 'Realisasi';

    // === ISI DATA ===
    data.forEach((row: any) => {
      worksheet.addRow([
        row.indikator,
        row.t1,
        row.r1,
        row.t2,
        row.r2,
        row.t3,
        row.r3,
        row.t4,
        row.r4,
      ]);
    });

    // === LEBAR KOLOM ===
    worksheet.columns = [
      { width: 80 },
      { width: 12 },
      { width: 12 },
      { width: 12 },
      { width: 12 },
      { width: 12 },
      { width: 12 },
      { width: 12 },
      { width: 12 },
    ];

    // === BORDER + ALIGNMENT ===
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };

        if (rowNumber <= 3) {
          cell.alignment = {
            vertical: 'middle',
            horizontal: 'center',
            wrapText: true,
          };
        } else {
          cell.alignment = {
            vertical: 'middle',
            horizontal: 'left',
            wrapText: true,
          };
        }
      });
    });

    // === STYLING HEADER ===
    [
      'A1',
      'B1',
      'B2',
      'D2',
      'F2',
      'H2',
      'B3',
      'C3',
      'D3',
      'E3',
      'F3',
      'G3',
      'H3',
      'I3',
    ].forEach((key) => {
      worksheet.getCell(key).font = { bold: true };
      worksheet.getCell(key).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFD9D9D9' },
      };
    });

    // === EXPORT ===
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `data-pendidikan-${selected}.xlsx`);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl text-center md:text-2xl lg:text-[30px] font-bold">
        Data Kinerja Pendidikan <br /> Dinas Pendidikan Kabupaten Grobogan
      </h1>

      <div className="mt-8 min-h-[47dvh]">
        <div className="flex justify-between items-center gap-2">
          <select
            disabled={isSheetsLoading || mutation.isPending}
            value={selected ?? ''}
            className="select select-info"
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

          <button
            className="btn btn-primary w-[150px]"
            disabled={isSheetsLoading || mutation.isPending}
            onClick={handleDownload}
          >
            {mutation.isPending ? 'Loading...' : 'Download'}
          </button>
        </div>

        {/* Loader untuk table */}
        {mutation.isPending ? (
          <div className="flex justify-center items-center h-[400px] mt-4">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <TableData columns={columns} data={data} />
        )}
      </div>
    </div>
  );
}
