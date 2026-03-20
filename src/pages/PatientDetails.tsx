import React, { useState } from 'react';
import Card from '../components/UI/Card';
import Badge from '../components/UI/Badge';
import Button from '../components/UI/Button';
import Toggle from '../components/UI/Toggle';
import { useAppStore } from '../store/useAppStore';
import { Search, Filter, MoreHorizontal } from 'lucide-react';
import styles from './PatientDetails.module.css';

const MOCK_PATIENTS = [
  { id: '#PX-9281', name: 'Sarah Jenkins', age: 42, condition: 'Hypertension', lastVisit: 'Oct 12, 2023', status: 'stable' as const, avatar: 'SJ' },
  { id: '#PX-8392', name: 'Michael Chen', age: 58, condition: 'Type 2 Diabetes', lastVisit: 'Oct 15, 2023', status: 'critical' as const, avatar: 'MC' },
  { id: '#PX-7741', name: 'Emma Watson', age: 31, condition: 'Asthma', lastVisit: 'Oct 18, 2023', status: 'under_review' as const, avatar: 'EW' },
  { id: '#PX-6523', name: 'James Rodriguez', age: 45, condition: 'Post-op Recovery', lastVisit: 'Oct 20, 2023', status: 'stable' as const, avatar: 'JR' },
  { id: '#PX-5490', name: 'Linda Martinez', age: 62, condition: 'Osteoarthritis', lastVisit: 'Oct 21, 2023', status: 'stable' as const, avatar: 'LM' },
  { id: '#PX-4211', name: 'William Taylor', age: 29, condition: 'Migraine', lastVisit: 'Oct 22, 2023', status: 'under_review' as const, avatar: 'WT' },
];

const PatientDetails: React.FC = () => {
  const { patientViewMode, setPatientViewMode } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = MOCK_PATIENTS.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Patient Directory</h1>
          <p className={styles.subtitle}>Manage and overview all registered patients.</p>
        </div>
        <div className={styles.viewToggle}>
          <Toggle 
            options={[
              { label: 'Grid View', value: 'grid' },
              { label: 'List View', value: 'list' }
            ]}
            value={patientViewMode}
            onChange={(val) => setPatientViewMode(val as 'grid' | 'list')}
          />
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search by name or ID..." 
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className={styles.filters}>
          <select className={styles.filterDropdown}>
            <option value="">Status: All</option>
            <option value="stable">Stable</option>
            <option value="critical">Critical</option>
            <option value="under_review">Under Review</option>
          </select>
          <Button variant="secondary">
            <Filter size={18} /> More Filters
          </Button>
        </div>
      </div>

      {patientViewMode === 'grid' ? (
        <div className={styles.grid}>
          {filteredPatients.map(patient => (
            <Card key={patient.id} elevation="highest" className={styles.patientCard}>
              <div className={styles.cardHeader}>
                <div className={styles.avatar}>{patient.avatar}</div>
                <button className={styles.moreBtn}><MoreHorizontal size={20}/></button>
              </div>
              <div className={styles.cardInfo}>
                <h3 className={styles.patientName}>{patient.name}</h3>
                <p className={styles.patientId}>{patient.id}</p>
              </div>
              <div className={styles.cardDetails}>
                <div className={styles.detailRow}>
                  <span>Age</span>
                  <strong>{patient.age}</strong>
                </div>
                <div className={styles.detailRow}>
                  <span>Condition</span>
                  <strong>{patient.condition}</strong>
                </div>
                <div className={styles.detailRow}>
                  <span>Last Visit</span>
                  <strong>{patient.lastVisit}</strong>
                </div>
              </div>
              <div className={styles.cardFooter}>
                <Badge variant={patient.status}>
                  {patient.status.replace('_', ' ').toUpperCase()}
                </Badge>
                <Button variant="secondary">View Record</Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card elevation="lowest" className={styles.listCard}>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>ID</th>
                  <th>Age</th>
                  <th>Condition</th>
                  <th>Last Visit</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map(patient => (
                  <tr key={patient.id}>
                    <td>
                      <div className={styles.listAvatarWrap}>
                        <div className={styles.listAvatar}>{patient.avatar}</div>
                        <span className={styles.patientName}>{patient.name}</span>
                      </div>
                    </td>
                    <td className={styles.patientId}>{patient.id}</td>
                    <td>{patient.age}</td>
                    <td>{patient.condition}</td>
                    <td>{patient.lastVisit}</td>
                    <td>
                      <Badge variant={patient.status}>
                        {patient.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </td>
                    <td>
                      <Button variant="secondary">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PatientDetails;
