import { Person } from '@/types/table-type';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export const handleDownload = async ({
  selected,
  data,
}: {
  selected: string | null;
  data: Person[];
}) => {
  if (!data.length || !selected) return;

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Data Kinerja Pendidikan');

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
  saveAs(new Blob([buffer]), `data-kinerja-pendidikan-${selected}.xlsx`);
};
