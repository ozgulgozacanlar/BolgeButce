import React from 'react';

const KPICard = ({ value , text}) => {

  return (
    <div style={styles.kpiContainer}>
      <h3 style={styles.title}>{text}</h3>
      <p style={styles.value}>{value}</p>
    </div>
  );
};

const styles = {
  kpiContainer: {
    backgroundColor: '#fdfdfd',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',  // Using flex to align items horizontally
    justifyContent: 'space-between',  // Space out the title and value
    alignItems: 'center',  // Vertically center the items
    width: '300px',
  },
  title: {
    fontSize: '14px',
    fontWeight: 'bold',
    maxWidth:'125px'
  },
  value: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'gray',
  },
};

export default KPICard;