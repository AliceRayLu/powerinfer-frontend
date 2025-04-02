
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);


export const formatDate = (date) => {
    return dayjs(date).tz(dayjs.tz.guess()).format('YYYY-MM-DD HH:mm');
}
