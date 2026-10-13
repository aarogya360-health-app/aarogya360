export const formatDate = (dateString: string): string => {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(d);
  } catch {
    return dateString;
  }
};

export const formatDateTime = (dateString: string): string => {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(d);
  } catch {
    return dateString;
  }
};

export const formatRelativeTime = (dateString: string): string => {
  try {
    const target = new Date(dateString).getTime();
    const now = Date.now();
    const diff = target - now;

    if (isNaN(target)) return dateString;

    if (diff < 0) {
      const pastSeconds = Math.abs(Math.floor(diff / 1000));
      if (pastSeconds < 60) return 'just now';
      const pastMinutes = Math.floor(pastSeconds / 60);
      if (pastMinutes < 60) return `${pastMinutes}m ago`;
      const pastHours = Math.floor(pastMinutes / 60);
      if (pastHours < 24) return `${pastHours}h ago`;
      const pastDays = Math.floor(pastHours / 24);
      return `${pastDays}d ago`;
    }

    const futureSeconds = Math.floor(diff / 1000);
    if (futureSeconds < 60) return 'in less than a minute';
    const futureMinutes = Math.floor(futureSeconds / 60);
    if (futureMinutes < 60) return `in ${futureMinutes}m`;
    const futureHours = Math.floor(futureMinutes / 60);
    if (futureHours < 24) return `in ${futureHours}h`;
    const futureDays = Math.floor(futureHours / 24);
    return `in ${futureDays}d`;
  } catch {
    return dateString;
  }
};

export const getTodayDateInputString = (): string => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};
