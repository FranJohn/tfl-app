import TubeLinesTable from './components/TubeLinesTable';

const Home: React.FC = () => {
  // Mock data for tube lines
  const tubeLines = [
    {
      id: '1',
      name: 'Piccadilly',
      lineStatuses: [{ statusSeverityDescription: 'Good Service' }],
    },
    {
      id: '2',
      name: 'Central',
      lineStatuses: [{ statusSeverityDescription: 'Minor Delays' }],
    },
    {
      id: '3',
      name: 'Central',
      lineStatuses: [{ statusSeverityDescription: 'Minor Delays' }],
    },
    {
      id: '4',
      name: 'Central',
      lineStatuses: [{ statusSeverityDescription: 'Minor Delays' }],
    },
    {
      id: '5',
      name: 'Central',
      lineStatuses: [{ statusSeverityDescription: 'Minor Delays' }],
    },
    {
      id: '6',
      name: 'Central',
      lineStatuses: [{ statusSeverityDescription: 'Minor Delays' }],
    },
    {
      id: '7',
      name: 'Central',
      lineStatuses: [{ statusSeverityDescription: 'Minor Delays' }],
    },
    {
      id: '8',
      name: 'Central',
      lineStatuses: [{ statusSeverityDescription: 'Minor Delays' }],
    },
    {
      
      id: '9',
      name: 'Central',
      lineStatuses: [{ statusSeverityDescription: 'Minor Delays' }],
    },
    {
      id: '10',
      name: 'Central',
      lineStatuses: [{ statusSeverityDescription: 'Minor Delays' }],
    },
    {
      id: '11',
      name: 'Central',
      lineStatuses: [{ statusSeverityDescription: 'Minor Delays' }],
    },
  ];

  return (
    <main>
      <div className="tube-app-content">
        <TubeLinesTable tubeLines={tubeLines} />
      </div>
    </main>
  );
};

export default Home;