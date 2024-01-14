interface Line {
    id: string;
    name: string;
    lineStatuses?: {
        statusSeverityDescription: string;
        reason:string;
    }[];
}

export interface TubeLine {
    id: string;
    name: string;
    statusSeverityDescription: string;
    reason:string;
}

export const getTubeLines = async (): Promise<TubeLine[] | undefined> => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_TFL_API_PRIMARY_KEY;
  
      if (!apiKey) {
        throw new Error('TFL API key not provided.');
      }
  
      const response = await fetch('https://api.tfl.gov.uk/Line/Mode/tube/Status', {
        headers: {
          'Content-Type': 'application/json',
          'app_key': apiKey,
        },
      });

      if (response.status === 429) {
        setTimeout(() => getTubeLines(), 60000); 
        return;
      }
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data: Line[] = await response.json();
      const tubeLines: TubeLine[] = data.map((datum) => {
        const lineStatus = datum.lineStatuses && datum.lineStatuses.length > 0
          ? datum.lineStatuses[0]
          : { statusSeverityDescription: 'Unknown', reason: '' };
        
          const reason = lineStatus.reason ? lineStatus.reason : lineStatus.statusSeverityDescription;
        const tubeLine: TubeLine = {
          name: datum.name,
          id: datum.id,
          statusSeverityDescription: lineStatus.statusSeverityDescription,
          reason: reason,
        };
  
        return tubeLine;
      });
  
      return tubeLines;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };