export function normalizeNumbers(numbers) {
    // Finding the min and max values in the array
    const minValue = Math.min(...numbers);
    const maxValue = Math.max(...numbers);
    
    // Normalizing each value in the array and returning the new array
    const normalizedNumbers = numbers.map(value => {
        if (maxValue === minValue) {
            return 0; // Avoid division by zero and return 0 when there's no range
        }
        return (value - minValue) / (maxValue - minValue);
    });
    
    return normalizedNumbers;
  }