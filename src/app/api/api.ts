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
}

export interface DetailedTubeLine extends TubeLine {
    reason: string; 
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

        const retData: TubeLine[] = data.map((datum) => {
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
        throw error;
    }
};

export const getDetailedTubeLine = async (lineId: string): Promise<DetailedTubeLine | null> => {
    try {
        const apiKey = process.env.NEXT_PUBLIC_TFL_API_PRIMARY_KEY;

        if (!apiKey) {
            throw new Error('TFL API key not provided.');
        }

        console.log("lineId");
        console.log(lineId);
        
        const response = await fetch(`https://api.tfl.gov.uk/Line/${lineId}`, {
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

        const detailedLine: DetailedTubeLine = {
            name: data[0].name,
            id: data[0].id,
            statusSeverityDescription: data[0].lineStatuses && data[0].lineStatuses.length > 0
                ? data[0].lineStatuses[0].statusSeverityDescription
                : 'Unknown',
            reason: data[0].lineStatuses && data[0].lineStatuses.length > 0
                ? data[0].lineStatuses[0].reason
                : 'This service is running without any issues.', 
        };

        return detailedLine;
    } catch (error) {
        console.error('Error fetching detailed data:', error);
        throw error;
    }
};
