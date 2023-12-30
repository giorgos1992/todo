import moment from "moment";

export const formatDate = (date: number, format = "DD/MM/YYYY"): string => {
  return moment(date).format(format);
};
