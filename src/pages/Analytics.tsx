import React from 'react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { Download } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Legend,
  PieChart, Pie, Cell
} from 'recharts';
import styles from './Analytics.module.css';

const admissionData = [
  { name: 'Mon', admissions: 40 },
  { name: 'Tue', admissions: 30 },
  { name: 'Wed', admissions: 45 },
  { name: 'Thu', admissions: 50 },
  { name: 'Fri', admissions: 65 },
  { name: 'Sat', admissions: 85 },
  { name: 'Sun', admissions: 60 },
];

const deptData = [
  { name: 'ER', current: 4000, capacity: 5000 },
  { name: 'ICU', current: 3000, capacity: 3500 },
  { name: 'Pediatrics', current: 2000, capacity: 4000 },
];

const revenueData = [
  { name: 'Consultations', value: 400 },
  { name: 'Surgery', value: 300 },
  { name: 'Diagnostics', value: 300 },
];

const COLORS = ['#005EB8', '#4a6178', '#a9c7ff'];

const Analytics: React.FC = () => {
  return (
    <div className={styles.analytics}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Clinical Analytics</h1>
          <p className={styles.subtitle}>Overview of hospital performance metrics.</p>
        </div>
        <div className={styles.actions}>
          <select className={styles.datePicker}>
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>This Year</option>
          </select>
          <Button variant="primary">
            <Download size={18} /> Export Report
          </Button>
        </div>
      </div>

      <div className={styles.kpiGrid}>
        <Card>
          <p className={styles.kpiLabel}>Total Admissions</p>
          <h3 className={styles.kpiValue}>3,402</h3>
          <span className={styles.trendUp}>+12.5%</span>
        </Card>
        <Card>
          <p className={styles.kpiLabel}>Revenue Generated</p>
          <h3 className={styles.kpiValue}>$1.2M</h3>
          <span className={styles.trendUp}>+8.2%</span>
        </Card>
        <Card>
          <p className={styles.kpiLabel}>Patient Satisfaction</p>
          <h3 className={styles.kpiValue}>94%</h3>
          <span className={styles.trendUp}>+2.1%</span>
        </Card>
        <Card>
          <p className={styles.kpiLabel}>Avg. Length of Stay</p>
          <h3 className={styles.kpiValue}>4.2 Days</h3>
          <span className={styles.trendDown}>-0.8 Days</span>
        </Card>
      </div>

      <Card className={styles.chartCard} elevation="lowest">
        <h2 className={styles.chartTitle}>Patient Admission Trends</h2>
        <div className={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={admissionData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--surface-container-highest)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--on-surface-variant)', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--on-surface-variant)', fontSize: 12}} />
              <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-ambient)' }} />
              <Line type="monotone" dataKey="admissions" stroke="var(--primary)" strokeWidth={3} dot={{r: 4, fill: 'var(--primary)', strokeWidth: 2, stroke: '#fff'}} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className={styles.bottomCharts}>
        <Card className={styles.halfChart} elevation="lowest">
          <h2 className={styles.chartTitle}>Department Efficiency</h2>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={deptData} margin={{ top: 20, right: 0, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--surface-container-highest)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--on-surface-variant)', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--on-surface-variant)', fontSize: 12}} />
                <RechartsTooltip cursor={{fill: 'var(--surface-container-low)'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-ambient)' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontFamily: 'var(--font-body)', paddingTop: '10px' }} />
                <Bar dataKey="current" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="capacity" fill="var(--surface-container-highest)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className={styles.halfChart} elevation="lowest">
          <h2 className={styles.chartTitle}>Revenue by Service</h2>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={revenueData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-ambient)' }} />
                <Legend iconType="circle" layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '12px', fontFamily: 'var(--font-body)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
