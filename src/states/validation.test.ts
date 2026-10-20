import { describe, expect, it } from "vitest";
import {
  DEFAULT_SCHEDULE,
  isTypeConfirmAccepted,
  isValidEmail,
  parseEmailList,
  previewFromAddress,
  previewReplyToAddress,
  validateDayWindow,
  validateLocalPart,
  validateSchedule,
  validateSendingIdentity,
} from "./validation";

describe("parseEmailList", () => {
  it("splits, lowercases, and de-duplicates", () => {
    expect(parseEmailList("Ops@Agency.com, you@agency.com\nyou@agency.com")).toEqual([
      "ops@agency.com",
      "you@agency.com",
    ]);
  });
});

describe("isValidEmail / isTypeConfirmAccepted", () => {
  it("accepts a simple address and the SEND/count gate", () => {
    expect(isValidEmail("you@agency.com")).toBe(true);
    expect(isValidEmail("not-an-email")).toBe(false);
    expect(isTypeConfirmAccepted("SEND", { count: 12 })).toBe(true);
    expect(isTypeConfirmAccepted("send", { token: "SEND", count: 12 })).toBe(true);
    expect(isTypeConfirmAccepted("12", { count: 12 })).toBe(true);
    expect(isTypeConfirmAccepted("11", { count: 12 })).toBe(false);
  });
});

describe("schedule + identity defaults", () => {
  it("flags inverted windows and empty identity", () => {
    expect(validateSchedule(DEFAULT_SCHEDULE).valid).toBe(true);
    expect(validateDayWindow({ enabled: true, start: "17:00", end: "09:00" }).error).toMatch(
      /Start must be before end/,
    );
    expect(validateLocalPart("jgibbons").valid).toBe(true);
    expect(validateLocalPart("James").valid).toBe(false);
    expect(
      validateSendingIdentity({
        sendingDomain: "",
        fromLocalPart: "hello",
        fromName: "",
        replyToLocalPart: "",
      }).valid,
    ).toBe(false);
    expect(
      previewFromAddress({
        fromName: "James",
        fromLocalPart: "j",
        sendingDomain: "mail.agency.com",
      }),
    ).toBe("James <j@mail.agency.com>");
    expect(
      previewReplyToAddress({
        fromLocalPart: "j",
        replyToLocalPart: "",
        sendingDomain: "mail.agency.com",
      }),
    ).toBe("j@mail.agency.com");
  });
});
