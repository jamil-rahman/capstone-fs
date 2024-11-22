import { formatDistanceToNow, format, isBefore, subWeeks } from 'date-fns';

export const formatPostDate = (date) => {
    const postDate = new Date(date);
    const twoWeeksAgo = subWeeks(new Date(), 2);

    if (isBefore(postDate, twoWeeksAgo)) {
        return format(postDate, 'd-MMM-yyyy');
    }

    return formatDistanceToNow(postDate, { addSuffix: true });
};