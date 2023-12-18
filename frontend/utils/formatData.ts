export const FormatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};

const CreatedUpdatedDate = (
  createdDate?: string,
  updatedDate?: string
): string => {
  if (updatedDate && createdDate) {
    if (updatedDate > createdDate) {
      return `Updated: ${FormatDate(updatedDate)}`;
    } else {
      return `Created: ${FormatDate(createdDate)}`;
    }
  } else {
    return 'Error';
  }
};

export default CreatedUpdatedDate;
