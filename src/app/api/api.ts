interface Line {
    id: string;
    name: string;
    lineStatuses?: {
      statusSeverityDescription: string;
    }[];
  }
  
export interface TubeLine {
    id: string;
    name: string;
    statusSeverityDescription: string;
}
  
export const getTubeLines = async (): Promise<TubeLine[]> => {
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

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data: Line[] = await response.json();
        console.log("data");
        console.log(data);
        const retData: TubeLine[] = data.map((datum) => {
            // Check if lineStatuses array exists and has at least one element
            const lineStatus = datum.lineStatuses && datum.lineStatuses.length > 0
                ? datum.lineStatuses[0]
                : { statusSeverityDescription: 'Unknown' };

            const lineData: TubeLine = {
                name: datum.name,
                id: datum.id,
                statusSeverityDescription: lineStatus.statusSeverityDescription,
            };
            return lineData;
        });

        return retData;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error for the calling code to handle
    }
};
