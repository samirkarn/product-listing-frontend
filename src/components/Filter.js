import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';

const Filter = ({ onFilter }) => {
    const [color, setColor] = useState('');
    const [capacity, setCapacity] = useState('');
    const [colors, setColors] = useState([]);
    const [capacities, setCapacities] = useState([]);

    useEffect(() => {
        const loadFilters = async () => {
            try {
                const products = await fetchProducts();
                console.log('Fetched Products:', products);

                const uniqueColors = [...new Set(
                    products
                        .filter(product => product.data && product.data.color)
                        .map(product => product.data.color.toLowerCase())
                )].map(c => c.charAt(0).toUpperCase() + c.slice(1).toLowerCase());
                setColors(uniqueColors);

                const uniqueCapacities = [...new Set(
                    products
                        .filter(product => product.data && product.data.capacity)
                        .map(product => String(product.data.capacity))
                )];
                console.log('Unique Capacities:', uniqueCapacities);

                setCapacities(uniqueCapacities);
            } catch (error) {
                console.error('Error fetching filters:', error);
            }
        };

        loadFilters();
    }, []);

    const handleFilterClick = () => {
        console.log('Selected Color:', color);
        console.log('Selected Capacity:', capacity);
        onFilter(color, capacity);
    };

    const handleResetClick = () => {
        setColor('');
        setCapacity('');
        onFilter('', '');
    };

    return (
        <div className="filter-section">
            <select onChange={(e) => setColor(e.target.value)} value={color}>
                <option value="">Filter by Color</option>
                {colors.map((color, index) => (
                    <option key={index} value={color}>{color}</option>
                ))}
            </select>

            <select onChange={(e) => setCapacity(e.target.value)} value={capacity}>
                <option value="">Filter by Capacity</option>
                {capacities.map((capacity, index) => (
                    <option key={index} value={capacity}>{capacity}</option>
                ))}
            </select>

            <div style={{ display: 'flex' }}>
                <button onClick={handleFilterClick} disabled={!color && !capacity}>
                    Filter
                </button>
                <button
                    style={{ marginLeft: '.7rem' }}
                    onClick={handleResetClick}
                    disabled={!color && !capacity}
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default Filter;
