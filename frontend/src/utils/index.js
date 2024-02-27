export const occupencyRate = (patients, wards) => {
  const totalWard = wards.reduce((acc, curr) => acc + curr.capacity, 0);
  const totalPatients = patients.length;
  const rate = (totalPatients / totalWard) * 100;
  return `${rate.toFixed(2)}%`;
};
