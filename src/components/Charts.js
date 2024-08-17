import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const Charts = ({ products }) => {
  const colors = products.map(p => p.data?.color || 'N/A');
  const capacities = products.map(p => p.data?.capacity || 'N/A');

  // Coloe chart function
  const colorData = {
    labels: [...new Set(colors)],
    datasets: [{
      label: 'Number of Products',
      data: [...new Set(colors)].map(c => colors.filter(color => color === c).length),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }],
  };

  // Capacity charts function
  const capacityData = {
    labels: [...new Set(capacities)],
    datasets: [{
      label: 'Number of Products',
      data: [...new Set(capacities)].map(c => capacities.filter(capacity => capacity === c).length),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    }],
  };

  return (
    <div className="charts-section">
      <div>
        <h3>Product Listing with Charts</h3>
        <Bar data={colorData} className='charts'/>
      </div>

      <div>
        <h3>Product Listing with Charts</h3>
        <Pie data={capacityData} />
      </div>
    </div>
  );
};

export default Charts;