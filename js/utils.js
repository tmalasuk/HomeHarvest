export function computeExpirationDate(value, unit) {
    const now = new Date();
    let expiration = new Date(now);

    switch (unit) {
        case 'day(s)':
            expiration.setDate(expiration.getDate() + value);
            break;
        case 'week(s)':
            expiration.setDate(expiration.getDate() + value * 7);
            break;
        case 'month(s)':
            expiration.setMonth(expiration.getMonth() + value);
            break;
        case 'year(s)':
            expiration.setFullYear(expiration.getFullYear() + value);
            break;
        default:
            console.warn('Unknown unit', unit);
    }

    return expiration;
}

export function getExpirationDifferenceInDays(expiration) {
    const today = new Date();
    // normalize to midnight for simplicity
    const todayMid = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const expMid = new Date(expiration.getFullYear(), expiration.getMonth(), expiration.getDate());

    const diffMs = expMid - todayMid; // milliseconds difference
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24)); // convert to days
    return diffDays;
}

export function daysToPercent(expiration) {
    const today = new Date();
    const daysLeft = Math.ceil((expiration - today) / (1000 * 60 * 60 * 24));
    if (daysLeft <= 0) return 100;
    if (daysLeft < 2) return 80;
    if (daysLeft < 3) return 70;
    if (daysLeft < 4) return 60;
    if (daysLeft < 5) return 50;
    if (daysLeft < 6) return 40;
    if (daysLeft < 7) return 30;
    if (daysLeft < 8) return 20;
    if (daysLeft < 9) return 10;
    return 0;
}

export function getDurationValueAndUnit(expiration) {
    const diffDays = getExpirationDifferenceInDays(expiration);

    if (diffDays <= 0) return { value: 1, unitIndex: 0 }; // at least 1 day

    if (diffDays % 365 === 0) {
        return { value: diffDays / 365, unitIndex: 3 }; // years
    } else if (diffDays % 30 === 0) {
        return { value: diffDays / 30, unitIndex: 2 }; // months
    } else if (diffDays % 7 === 0) {
        return { value: diffDays / 7, unitIndex: 1 }; // weeks
    } else {
        return { value: diffDays, unitIndex: 0 }; // days
    }
}