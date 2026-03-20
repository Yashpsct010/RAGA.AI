import React from 'react';
import Card from '../components/UI/Card';
import Badge from '../components/UI/Badge';
import { Users, Calendar, CheckSquare, AlertCircle } from 'lucide-react';
import styles from './Dashboard.module.css';

const MOCK_APPOINTMENTS = [
  { id: 1, name: 'Robert Fox', time: '09:00 AM', type: 'Follow-up', status: 'Confirmed' },
  { id: 2, name: 'Floyd Miles', time: '10:30 AM', type: 'Consultation', status: 'In Waiting Room' },
  { id: 3, name: 'Annette Black', time: '11:15 AM', type: 'Routine Check', status: 'Confirmed' },
  { id: 4, name: 'Theresa Webb', time: '02:00 PM', type: 'Lab Results', status: 'Scheduled' },
];

const MOCK_ALERTS = [
  { id: 1, text: 'Critical lab results for Patient #PX-992', priority: 'critical' },
  { id: 2, text: 'Dr. Hanneman requires a consult approval', priority: 'under_review' },
  { id: 3, text: 'Server maintenance scheduled for 10 PM', priority: 'default' },
];

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1 className={styles.title}>Welcome back, Dr. Jenkins</h1>
        <p className={styles.subtitle}>Here is what's happening in your clinic today.</p>
      </div>

      <div className={styles.metricsGrid}>
        <Card className={styles.metricCard}>
          <div className={styles.metricIconWrap} style={{ color: 'var(--primary)', backgroundColor: 'var(--primary-fixed)' }}>
            <Users size={24} />
          </div>
          <div>
            <p className={styles.metricLabel}>Total Patients</p>
            <h3 className={styles.metricValue}>1,240</h3>
          </div>
        </Card>
        <Card className={styles.metricCard}>
          <div className={styles.metricIconWrap} style={{ color: 'var(--success-text)', backgroundColor: 'var(--success-bg)' }}>
            <Calendar size={24} />
          </div>
          <div>
            <p className={styles.metricLabel}>Appointments Today</p>
            <h3 className={styles.metricValue}>14</h3>
          </div>
        </Card>
        <Card className={styles.metricCard}>
          <div className={styles.metricIconWrap} style={{ color: 'var(--warning-text)', backgroundColor: 'var(--warning-bg)' }}>
            <CheckSquare size={24} />
          </div>
          <div>
            <p className={styles.metricLabel}>Pending Tasks</p>
            <h3 className={styles.metricValue}>8</h3>
          </div>
        </Card>
        <Card className={styles.metricCard}>
          <div className={styles.metricIconWrap} style={{ color: 'var(--critical-text)', backgroundColor: 'var(--critical-bg)' }}>
            <AlertCircle size={24} />
          </div>
          <div>
            <p className={styles.metricLabel}>Active Alerts</p>
            <h3 className={styles.metricValue}>3</h3>
          </div>
        </Card>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.mainColumn}>
          <Card elevation="lowest" className={styles.appointmentsCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Recent Patient Appointments</h2>
              <a href="#" className={styles.viewAll}>View Details</a>
            </div>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Time</th>
                    <th>Visit Type</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_APPOINTMENTS.map(apt => (
                    <tr key={apt.id}>
                      <td className={styles.patientName}>{apt.name}</td>
                      <td>{apt.time}</td>
                      <td>{apt.type}</td>
                      <td>
                        <Badge variant={apt.status === 'In Waiting Room' ? 'under_review' : 'stable'}>
                          {apt.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className={styles.sideColumn}>
          <Card elevation="low" className={styles.alertsCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Active Clinical Alerts</h2>
            </div>
            <div className={styles.alertsList}>
              {MOCK_ALERTS.map(alert => (
                <div key={alert.id} className={styles.alertItem}>
                  <div className={styles.alertIcon}>
                    <AlertCircle size={16} className={styles[alert.priority + 'Icon']} />
                  </div>
                  <p className={styles.alertText}>{alert.text}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
