'use client'
import React, {useEffect, useState} from 'react';
import TubeLinesTable from './components/TubeLinesTable';
import { getTubeLines, TubeLine } from './api/api';

const Home: React.FC = () => {
  const [tubeLines, setTubeLines] = useState<TubeLine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTubeLines();
        setTubeLines(data);
      } catch (error) {
        setError('Error fetching tube lines data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <div className="tube-app-content">
        <TubeLinesTable tubeLines={tubeLines} />
      </div>
    </main>
  );
};

export default Home;