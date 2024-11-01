import React from 'react'

const selectFrequencyInput = () => {
  
    const frequency = [
        { value: 'daily', label: 'Daily' },
        { value: 'weekly', label: 'Weekly' },
        { value: 'every14Days', label: 'Every 14 days' },
        { value: 'monthly', label: 'Monthly' },
        { value: 'every2Months', label: 'Every 2 months' },
        { value: 'fourTimesAYear', label: '4 times a year' },
        { value: 'threeTimesAYear', label: '3 times a year' },
        { value: 'twoTimesAYear', label: '2 times a year' },
        { value: 'oneTimeAYear', label: '1 time a year' },
        { value: 'byDayInterval', label: 'By day interval' },
        { value: 'byWeekInterval', label: 'By week interval' },
        { value: 'byMonthInterval', label: 'By month interval' },
        { value: 'byApprDays', label: 'By appr. nr. of days' },
        { value: 'byOfficeOrder', label: 'By office order' },
        { value: 'byCustomerOrder', label: 'By customer order' }
      ];

      const weekends = [
        { value: 'incWE', label: 'Incl. weekends' },
        { value: 'excWE', label: 'Excl. weekends' }
      ];

      const monthWeek = [
        { value: 1, label: '1st week of month' },
        { value: 2, label: '2nd week of month' },
        { value: 3, label: '3rd week of month' },
        { value: 'Last', label: 'Last week of month' }
      ];
      
  
  return (
    <div>
      
    </div>
  )
}

export default selectFrequencyInput
