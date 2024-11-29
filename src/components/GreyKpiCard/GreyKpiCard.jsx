import './GreyKpiCard.css';

export default function GreyKpiCard({kpi, text}) {
  return (
    <div className="grey-kpi-card">
      <div className="grey-kpi-card-text">{text}</div>
      <div className="grey-kpi-card-kpi">{kpi}</div>
    </div>
  );
}
