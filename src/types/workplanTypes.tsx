import * as Yup from "yup";
import { DateTime } from 'luxon';

// Task values types, validation and initial values
type TaskValuesType = {
  amount: number;
  duration: number;
  instruction: string;
  images: object[]; // Simplified to an array of objects
  notes: string;
  taskDescription: string;
  taskValue: null | object;
};

export const initialTaskValues: TaskValuesType = {
  amount: 1,
  duration: 30,
  instruction: "",
  images: [],
  notes: "",
  taskDescription: "",
  taskValue: null,
};

export const validationSchemaTaskValues = Yup.object().shape({
  amount: Yup.number().required("Required").min(1, "Min. 1").max(3000, "Max 3000"),
  taskValue: Yup.object().nonNullable().required("Required").test(
    'is-object',
    'Invalid type', // Error message
    value => value !== null && typeof value === 'object' // Custom test for object type and not null
  ),
  taskDescription: Yup.string(),
  instruction: Yup.string(),
  notes: Yup.string(),
  duration: Yup.number().required("Required").min(1, "Min. 1").max(2400, "Max 2400"),
  images: Yup.array().of(Yup.object()),
});

type FrequencyTypes = {
  value: "daily";
  label: "Daily";
} | {
  value: "weekly";
  label: "Weekly";
} | {
  value: "every14Days";
  label: "Every 14 days";
} | {
  value: "monthly";
  label: "Monthly";
} | {
  value: "every2Months";
  label: "Every 2 months";
} | {
  value: "byDayInterval";
  label: "By day interval";
} | {
  value: "byWeekInterval";
  label: "By week interval";
} | {
  value: "byMonthInterval";
  label: "By month interval";
} | {
  value: "byApprDays";
  label: "By appr. nr. of days";
} | {
  value: "byOfficeOrder";
  label: "By office order";
} | {
  value: "byCustomerOrder";
  label: "By customer order";
};

type MonthWeekType = 
  | { value: "byOtherJobs", label: 'Based on other jobs' }
  | { value: "anyTimeOfMonth", label: 'Any time of month' }
  | { value: "1", label: '1st week of month' }
  | { value: "2", label: '2nd week of month' }
  | { value: "3", label: '3rd week of month' }
  | { value: "lastWeek", label: 'Last week of month' };

type WeekendTypes = { value: 'incWE', label: 'Incl. weekends' } | { value: 'excWE', label: 'Excl. weekends' }

export const weekendOptions = [
  { value: 'incWE', label: 'Incl. weekends' },
  { value: 'excWE', label: 'Excl. weekends' }
];

export const monthWeekOptions = [
  { value: "byOtherJobs", label: 'Based on other jobs' },
  { value: "anyTimeOfMonth", label: 'Any time of month' },
  { value: "1", label: '1st week of month' },
  { value: "2", label: '2nd week of month' },
  { value: "3", label: '3rd week of month' },
  { value: 'lastWeek', label: 'Last week of month' }
];

// Assignment (frequency), types, values and validation
type AssignmentValuesType = {
  monthWeek: MonthWeekType;
  weekends: WeekendTypes;
  endDate: string;
  frequency: FrequencyTypes;
  interval: number;
  isEndDate: boolean;
  months: number[];
  isSeasonal: boolean;
  seasonal: {
    monthWeek: MonthWeekType;
    weekends: WeekendTypes;
    frequency: FrequencyTypes;
    interval: number;
    months: number[];
  };
  weekdays: (1 | 2 | 3 | 4 | 5 | 6 | 7 | "setDay" | "anyDay")[];
  separateStartDate: boolean,
  startDate: string;  // Optional if your plan always starts immediately or the start is implicit
  tasks?: TaskValuesType[];  // Optional, define tasks if needed
}

export const initialAssignmentValues: AssignmentValuesType = {
  monthWeek: { value: "byOtherJobs", label: 'Based on other jobs' },
  weekends: { value: "excWE", label: "Excl. weekends" },
  endDate: "",
  frequency: { value: "weekly", label: "Weekly" }, // Assuming `Frequency` is imported
  interval: 1,
  isEndDate: false,
  months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  isSeasonal: false,
  seasonal: {
    monthWeek: { value: "byOtherJobs", label: "Based on other jobs" }, // when in the months it is
    weekends: { value: "excWE", label: "Excl. weekends" },
    frequency: { value: "weekly", label: "Weekly" },
    interval: 1,
    months: [],
  },
  weekdays: ["setDay"], // set when in the week it should be done, if not the set date
  separateStartDate: false, // check if there is a separate start date
  startDate: "",  // Assuming you want a fixed start date
  tasks: [initialTaskValues]  // tasks
};

// Custom validator for Frequency to ensure it matches one of the predefined types
const frequencyOptions = [
  "daily", "weekly", "every14Days", "monthly", "every2Months",
  "byDayInterval", "byWeekInterval", "byMonthInterval",
  "byApprDays", "byOfficeOrder", "byCustomerOrder"
];

// MonthWeekType options validation
const monthWeekStrings = ["byOtherJobs", "anyTimeOfMonth", "1", "2", "3", "lastWeek"];

interface FrequencyOption {
  value: string;
  label: string;
}
// Define the schema for weekends
const weekendsSchema = Yup.object().shape({
    value: Yup.string().required("Weekends value is required"),
    label: Yup.string().required("Weekends label is required")
  }
).required("Required");

const seasonalSchema = Yup.object({
  monthWeek: Yup.object({
    value: Yup.string().required("Month week selection is required"),
    label: Yup.string().required("Month week label is required")
  }).required("Seasonal month week is required"),
  weekends: weekendsSchema.required("Reuqired"),
  frequency: Yup.object({
    value: Yup.string().oneOf(frequencyOptions).required("Frequency value is equired"),
    label: Yup.string().required("Frequency label is required")
  }).required("Required"),

  interval: Yup.number().when('frequency', (frequency: any, schema) => {
    // Check if the frequency.value requires an interval
    return ['byDayInterval', 'byWeekInterval', 'byMonthInterval', 'byApprDays'].includes(frequency.value)
      ? schema.required("Interval is required when certain frequencies are selected")
      : schema.notRequired();
  }),
  months: Yup.array().of(Yup.number().min(1).max(12)).required("Required")
});

export const validationSchemaAssignmentValues = Yup.object({
  monthWeek: Yup.object({
    value: Yup.string().oneOf(monthWeekStrings).required("Month week value is required"),
    label: Yup.string().required("Month week label is required")
  }).required("Required"),
  
  weekends: weekendsSchema.when(["frequency", "interval"], (values, schema) => {
    const [frequency, interval] = values as [FrequencyOption, number];
    return (frequency.value === 'daily' || (frequency.value === 'byDayInterval' && interval % 7 === 0))
      ? schema.required("Required")
      : schema.notRequired();
  }),

  isEndDate: Yup.boolean().required("Required"),

  endDate: Yup.string().when("separateStartDate", ([isEndDate], schema) =>{
    return isEndDate === true ? schema.required("Required") : schema.notRequired() 
  }),

  frequency: Yup.object({
    value: Yup.string().oneOf(frequencyOptions).required("Frequency value is equired"),
    label: Yup.string().required("Frequency label is required")
  }).required("Required"),

  interval: Yup.number().when('frequency', ([frequency], schema) => {
    // Check if the frequency.value requires an interval
    return ['byDayInterval', 'byWeekInterval', 'byMonthInterval', 'byApprDays'].includes(frequency.value)
      ? schema.required("Interval is required when certain frequencies are selected")
      : schema.notRequired();
  }),

  months: Yup.array().of(Yup.number().min(1).max(12)).required("Months are required"),

  isSeasonal: Yup.boolean().required("Seasonal indicator is required"),
  
  seasonal: Yup.object().when("isSeasonal", (isSeasonal) => {
    return isSeasonal ? seasonalSchema : Yup.object().notRequired();
  }),

  weekdays: Yup.array().of(Yup.mixed().oneOf([1, 2, 3, 4, 5, 6, 7, "setDay", "anyDay"], "Invalid weekday option")).required("Weekdays are required"),

  separateStartDate: Yup.boolean().required("Required"),

  startDate: Yup.string().when("separateStartDate", ([separateStartDate], schema) =>{
    return separateStartDate === true ? schema.required("Required") : schema.notRequired() 
  }),

  tasks: Yup.array().of(validationSchemaTaskValues)
});

export type WorkerValuesType = {
  assignedWorker: { value: string; label: string } | null;
  assignment: AssignmentValuesType[];
  workerType: { value: string; label: string } | null;
  setWorkDay: (1 | 2 | 3 | 4 | 5 | 6 | 7 | "")[]
};

export const initialWorkerValues: WorkerValuesType = {
  assignedWorker: null,
  assignment: [initialAssignmentValues],
  workerType: null,
  setWorkDay: []
};

export const validationSchemaWorkerValues = Yup.object({
  workerType: Yup.object().shape({ value: Yup.string(), label: Yup.string() }).required("Required"),
  assignedWorker: Yup.object().shape({ value: Yup.string(), label: Yup.string() }).required("Required"),
  assignment: Yup.array().of(validationSchemaAssignmentValues),
  setWorkDay: Yup.array().of(Yup.number().required("Each day must be a number"))
  .required("Required"),
});

// Workplan values
export type WorkplanValuesType = {
  workplan: WorkerValuesType[];
};

export const initialWorkplanValues: WorkplanValuesType = {
  workplan: [initialWorkerValues],
};

export const validationSchema = Yup.object().shape({
  workplan: Yup.array().of(validationSchemaWorkerValues),
});


// export const validationSchemaAssignmentValues = Yup.object({
//   endDate: Yup.date().when("isEndDate", {
//     is: true,
//     then: () => Yup.date().required("Required"),
//   }),
//   frequency: Yup.object().required("Required"),
//   interval: Yup.number().when("frequency", {
//     is: (value: any) => ['byDayInterval', 'byWeekInterval', 'byMonthInterval'].includes(value.value),
//     then: () => Yup.number().required("Required"),
//   }),
//   isEndDate: Yup.boolean().required("Required"),
//   months: Yup.array().when("frequency", {
//     is: (value: any) => value?.value === "fourTimesAYear",
//     then: () => Yup.array().length(4, "Select 4 months").required("Required"),
//   }).when("frequency", {
//     is: (value: any) => value?.value === "threeTimesAYear",
//     then: () => Yup.array().length(3, "Select 3 months").required("Required"),
//   }).when("frequency", {
//     is: (value: any) => value?.value === "twoTimesAYear",
//     then: () => Yup.array().length(2, "Select 2 months").required("Required"),
//   }).when("frequency", {
//     is: (value: any) => value?.value === "oneTimeAYear",
//     then: () => Yup.array().length(1, "Select 1 month").required("Required"),
//   }).min(1, "Select at least 1 month").required(),
//   isSeasonal: Yup.boolean().required("Required"),
//   seasonal: Yup.object().when("isSeasonal", {
//     is: true,
//     then: () => Yup.object().shape({
//       frequency: Yup.object().required("Required"),
//       interval: Yup.number().when("frequency", {
//         is: (value: any) => ['byDayInterval', 'byWeekInterval', 'byMonthInterval'].includes(value.value),
//         then: () => Yup.number().required("Required"),
//       }),
//       weekends: Yup.array().when("frequency", {
//         is: (value: any) => ['daily', 'byDayInterval'].includes(value.value),
//         then: () => Yup.array().required("Required"),
//       })
//     }),
//   }),
//   weekday: Yup.array().of(
//     Yup.mixed().oneOf([1, 2, 3, 4, 5, 6, 7, "setDay", "anyDay"], 'Invalid weekday').required('Weekday is required')
//   ).required('Weekdays array is required'),
//   startDate: Yup.date().required("Required"),
//   tasks: Yup.array().of(validationSchemaTaskValues),
//   weekends: Yup.array().when("frequency", {
//     is: (value: any) => ['daily', 'byDayInterval'].includes(value.value),
//     then: () => Yup.array().required("Required"),
//   })
// });

// Worker values



// import * as Yup from "yup"
// import { DateTime } from 'luxon';

// // Task values types, validation and initialvalues

// type TaskValuesType = {
//   amount: number,
// 	duration: number,
// 	instruction: string,
//   images: object[] | []
//   notes: string,
//   taskDescription: string,
//   taskValue: object,
// }

// export const initialTaskValues: TaskValuesType = {
//   amount: 1,
// 	duration: 30,
// 	instruction: "",
//   images: [], 
//   notes: "",
//   taskDescription: "",
//   taskValue: {},
// }

// const validationSchemaTaskValues = Yup.object().shape({
//     amount: Yup.number().required("Required").min(1, "Min. 1").max(300, "Max 300"),
//     taskType: Yup.object().required("Required"),
//     taskDescription: Yup.string(),
//     instruction: Yup.string(),
//     notes: Yup.string(),
//     duration: Yup.number().required("Required").min(1, "Min. 1").max(300, "Max 2400"),
//     images: Yup.array().of(Yup.object())
//   })

// // Assignment (frequency), types, values and validation

// type AssignmentValuesType = {
//   dayOccurence: object,
// 	dayType: object,
//   endDate: string,
//   frequency: object,
//   frequencyType: "normal" | "customByWeekOccurence" | "customByInterval",
// 	interval: number,
// 	intervalUnit: object,
//   isEndDate: boolean,
// 	months: number[],
//   isSeasonal: boolean,
//   seasonal: {
//     dayOccurence: object,
//     dayType: object,
//     endDate: string,
//     frequency: object,
//     frequencyType: "normal" | "customByWeekOccurence" | "customByInterval",
//     interval: number,
//     intervalUnit: object,
//     isEndDate: boolean,
//     months: number[],
//     weekdays: number[],
//     yearInterval: number,
//   },
//   startDate: string,
// 	tasks: TaskValuesType[] | [],
//   weekdays: number[],
// 	yearInterval: number,
// }

// export const initialAssignmentValues: AssignmentValuesType = {
// 	dayOccurence: { value: "1", label: "first"},
// 	dayType: {},
//   endDate: "",
//   frequency: { value: "weekly", label: "Weekly"},
//   frequencyType: "normal",
// 	interval: 1,
// 	intervalUnit: { value: "weeks", label: "week(s)"},
//   isEndDate: false,
//   months: [1,2,3,4,5,6,7,8,9,10,11,12],
//   isSeasonal: false,
// 	seasonal: {
//     dayOccurence: { value: "1", label: "first"},
//   	dayType: {},
//     endDate: "",
//     frequency: { value: "weekly", label: "Weekly"},
//     frequencyType: "normal",
// 	  interval: 1,
// 	  intervalUnit: { value: "weeks", label: "week(s)"},
//     isEndDate: false,
//     months: [1,2,3,4,5,6,7,8,9,10,11,12],
//     weekdays: [1],
//     yearInterval: 1,
//   },
//   startDate: "",
// 	tasks: [initialTaskValues],
//   weekdays: [1],
// 	yearInterval: 1,
// }

// export const validationSchemaAssignmentValues = Yup.object({
//     dayOccurence: Yup.object().when("frequencyType", {
//       is: "customByWeekOccurence",
//       then: () => Yup.object().shape({value: Yup.string(), label: Yup.string()}).required("Required")
//     }),
//     dayType: Yup.object().when("frequencyType", {
//       is: "customByInterval",
//       then: () => Yup.object().shape({value: Yup.string(), label: Yup.string()}).required("Required")
//     }),  
//     endDate: Yup.date().when("isEndDate", {
//       is: true,
//       then: () => Yup.date().required("Required")
//     }),
//     frequency: Yup.object().required("Required"),
//     frequencyType: Yup.string().required("Required"),
//     interval: Yup.number().when("frequencyType", {
//       is: "customByInterval",
//       then: () => Yup.number().required("Required")
//     }),
//     intervalUnit: Yup.object().when("frequencyType", {
//       is: "customByInterval",
//       then: () => Yup.object().shape({value: Yup.string(), label: Yup.string()}).required("Required")
//     }),
//     isEndDate: Yup.boolean().required("Required"),
//     months: Yup.array().when("frequency", {
//       is: (value: any) => value?.value === "4TimesYear", 
//       then: () => Yup.array().length(4, "Select 4 months").required("Required")
//     }).when("frequency", {
//       is: (value: any) => value?.value === "3TimesYear", 
//       then: () => Yup.array().length(3, "Select 3 months").required("Required")
//     }).when("frequency", {
//       is: (value: any) => value?.value === "2TimesYear", 
//       then: () => Yup.array().length(2, "Select 2 months").required("Required")
//     }).when("frequency", {
//       is: (value: any) => value?.value === "Yearly", 
//       then: () => Yup.array().length(1, "Select 1 month").required("Required")
//     }).min(1, "Select atleast 1 month").required(),
//     isSeasonal: Yup.boolean().required("Required"),
//     seasonal: Yup.object().when("isSeasonal", {
//       is: true,
//       then: () => Yup.object().shape({
//         dayOccurence: Yup.object().when("frequencyType", {
//         is: "customByWeekOccurence",
//         then: () => Yup.object().shape({value: Yup.string(), label: Yup.string()}).required("Required")
//         }),
//         dayType: Yup.object().when("frequencyType", {
//           is: "customByInterval",
//           then: () => Yup.object().shape({value: Yup.string(), label: Yup.string()}).required("Required")
//         }),  
//         frequency: Yup.object().required("Required"),
//         frequencyType: Yup.string().required("Required"),
//         interval: Yup.number().when("frequencyType", {
//           is: "customByInterval",
//           then: () => Yup.number().required("Required")
//         }),
//         intervalUnit: Yup.object().when("frequencyType", {
//           is: "customByInterval",
//           then: () => Yup.object().shape({value: Yup.string(), label: Yup.string()}).required("Required")
//         }),
//         isEndDate: Yup.boolean().required("Required"),
//         months: Yup.array().when("frequency", {
//           is: (value: any) => value?.value === "4TimesYear", 
//           then: () => Yup.array().length(4, "Select 4 months").required("Required")
//         }).when("frequency", {
//           is: (value: any) => value?.value === "3TimesYear", 
//           then: () => Yup.array().length(3, "Select 3 months").required("Required")
//         }).when("frequency", {
//           is: (value: any) => value?.value === "2TimesYear", 
//           then: () => Yup.array().length(2, "Select 2 months").required("Required")
//         }).when("frequency", {
//           is: (value: any) => value?.value === "Yearly", 
//           then: () => Yup.array().length(1, "Select 1 month").required("Required")
//         }).min(1, "Select atleast 1 month").required(),
//         startDate: Yup.date().required("Required"),
//         tasks: Yup.array().of(validationSchemaTaskValues),
//         weekdays: Yup.array().when("frequencyType",{
//           is: "customByOccurence",
//           then: () => Yup.array().length(1, "Select 1 weekday").required("Required")
//         }).when("frequencyType", {
//           is: "normal",
//           then: () => Yup.array().min(1, "Select atleast 1 weekday").required("Required")}),
//         yearInterval: Yup.number().required("Required"),
//       }),
//     }),
//     startDate: Yup.date().required("Required"),
//     tasks: Yup.array().of(validationSchemaTaskValues),
//     weekdays: Yup.array().when("frequencyType",{
//       is: "customByOccurence",
//       then: () => Yup.array().length(1, "Select 1 weekday").required("Required")
//     }).when("frequencyType", {
//       is: "normal",
//       then: () => Yup.array().min(1, "Select atleast 1 weekday").required("Required")}),
//     yearInterval: Yup.number().required("Required"),
//   })

// export type WorkerValuesType = {
//   assignedWorker: object | null,
// 	assignment: AssignmentValuesType[] | [],
//   workerType: object | null,
// }

// export const initialWorkerValues: WorkerValuesType = {
//   assignedWorker: null,
//   assignment: [initialAssignmentValues],
//   workerType: null,
// }

// export const validationSchemaWorkerValues = Yup.object({
//     workerType: Yup.object().shape({value: Yup.string(), label: Yup.string()}).required("Required"),
//     assignedWorker: Yup.object().shape({value: Yup.string(), label: Yup.string()}).required("Required"),
//     assignment: Yup.array().of(validationSchemaAssignmentValues)
//   })

// // Workplan values

// export type WorkplanValuesType = {
//   workplan: WorkerValuesType[] | [],
// }

// export const initialWorkplanValues: WorkplanValuesType = {
//   workplan: [initialWorkerValues]
// }

// export const validationSchema = Yup.object().shape({
//   workplan: Yup.array().of(validationSchemaWorkerValues)
// })


// // workplanEdit states, initial states

// // export type WorkplanEditStates = {
// //   _id: string,
// //   addressLocation: string,
// //   customerNumber: string,
// //   dragIndex: {},
// //   endDate: string,
// //   fullAddress: string,
// //   index: {},
// //   isDragging: any
// //   itemDragged: string,
// //   name: string,
// //   startDate: any,
// //   taskOptions: any,
// //   workerOptions: any,
// //   workerTypeOptions: any,
// // }

// // const today = DateTime.now().toISO()

// // export const initialWorkplanEditStates: WorkplanEditStates = {
// //   _id: "",
// //   addressLocation: "",
// //   customerNumber: "",
// //   dragIndex: {},
// //   endDate: "",
// //   fullAddress: "",
// //   index: {WORKER: 0, ASSIGNMENT: 0, INSTRUCT: 0},
// //   isDragging: false,
// //   itemDragged: "",
// //   name: "",
// //   startDate: today,
// //   taskOptions: [],
// //   workerOptions: [],
// //   workerTypeOptions: [],
// // }