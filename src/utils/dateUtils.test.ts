import { formatDate } from "./dateUtils";
import moment from "moment";

describe("formatDate", () => {
  it("should format date in DD/MM/YYYY format by default", () => {
    const date = new Date("2022-01-01").getTime() / 1000;
    const formattedDate = formatDate(date);
    const expectedFormattedDate = moment(date).format("DD/MM/YYYY");

    expect(formattedDate).toBe(expectedFormattedDate);
  });

  it("should format date in the specified format", () => {
    const date = new Date("2022-01-01").getTime() / 1000;
    const format = "YYYY-MM-DD";
    const formattedDate = formatDate(date, format);
    const expectedFormattedDate = moment(date).format(format);

    expect(formattedDate).toBe(expectedFormattedDate);
  });
});
