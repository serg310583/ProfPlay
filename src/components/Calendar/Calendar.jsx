import { DatePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU.js';

export function Calendar({ className, dropdownClassName, onChange }) {
  const dateFormat = 'DD.MM.YYYY';
  const handleDateChange = (date, dateString) => {
    onChange(date);
  };

  return (
    <DatePicker
      format={dateFormat}
      locale={locale}
      inputReadOnly={false}
      onChange={handleDateChange}
      className={className}
      dropdownClassName={dropdownClassName}
    />
  );
}
