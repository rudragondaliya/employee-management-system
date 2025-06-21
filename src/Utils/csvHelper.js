// export const exportToCSV = (data, filename = 'employees.csv') => {
//   const csv = [
//     Object.keys(data[0]).join(','),
//     ...data.map(row => Object.values(row).join(','))
//   ].join('\n');

//   const blob = new Blob([csv], { type: 'text/csv' });
//   const link = document.createElement('a');
//   link.href = URL.createObjectURL(blob);
//   link.download = filename;
//   link.click();
// };

// export const importFromCSV = (file, callback) => {
//   const reader = new FileReader();
//   reader.onload = (e) => {
//     const lines = e.target.result.split('\n');
//     const headers = lines[0].split(',');
//     const data = lines.slice(1).map(line => {
//       const values = line.split(',');
//       return Object.fromEntries(headers.map((h, i) => [h.trim(), values[i].trim()]));
//     });
//     callback(data);
//   };
//   reader.readAsText(file);
// };


// Export employee list to CSV file
export const exportToCSV = (data, filename = 'employees.csv') => {
  if (!data || data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','), // header row
    ...data.map(row =>
      headers.map(field => `"${row[field] || ''}"`).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvRows], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Import CSV and convert to employee data objects
export const importFromCSV = (file, callback) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const lines = e.target.result.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());

    const data = lines.slice(1)
      .filter(line => line.trim() !== '') // remove empty lines
      .map(line => {
        const values = line.split(',').map(v => v.trim());
        const obj = {};
        headers.forEach((key, i) => {
          obj[key] = values[i];
        });
        return obj;
      });

    callback(data);
  };
  reader.readAsText(file);
};
