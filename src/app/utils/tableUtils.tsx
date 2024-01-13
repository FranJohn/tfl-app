// Function to get the color for each tube line
export const getLineColor = (lineName: string): string => {
    const colorMapping: Record<string, string> = {
      Piccadilly: '#005cbf',
      Central: '#dc241f',
    };
  
    return colorMapping[lineName] || '#333'; // Default to a fallback color if not found
  };