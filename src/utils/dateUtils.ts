// utils/dateUtil.ts
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(customParseFormat);

// 기본 타임존을 KST로 설정
const DEFAULT_TZ = "Asia/Seoul";
const DEFAULT_DATE_FORMAT = "YYYY-MM-DD";
const DEFAULT_DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

export const now = (): dayjs.Dayjs => dayjs().tz(DEFAULT_TZ);

export const getCurrentDate = (): string => {
  return dayjs.utc().tz(DEFAULT_TZ).format(DEFAULT_DATE_FORMAT);
};

export const getCurrentDateTime = (): string => {
  return dayjs.utc().tz(DEFAULT_TZ).format(DEFAULT_DATE_TIME_FORMAT);
};

/** 날짜를 포맷팅 (KST 기준) */
export const formatDate = (
  date: string | Date,
  format = DEFAULT_DATE_TIME_FORMAT
): string => dayjs(date).tz(DEFAULT_TZ).format(format);

/** UTC → KST 변환 */
export const toKST = (date: string | Date): dayjs.Dayjs =>
  dayjs(date).tz(DEFAULT_TZ);

/** KST → UTC ISO 문자열 반환 */
export const toUTCISOString = (date: string | Date): string =>
  dayjs(date).tz(DEFAULT_TZ).utc().toISOString();

/** 현재 시간과 비교해 상대 시간 반환 ("3일 전", "1시간 후" 등) */
export const fromNow = (date: string | Date): string =>
  dayjs(date).tz(DEFAULT_TZ).fromNow();

/** 두 날짜 비교 (같거나 이후) */
export const isSameOrAfterDate = (
  a: string | Date,
  b: string | Date
): boolean => dayjs(a).tz(DEFAULT_TZ).isSameOrAfter(dayjs(b).tz(DEFAULT_TZ));

/** 두 날짜 비교 (같거나 이전) */
export const isSameOrBeforeDate = (
  a: string | Date,
  b: string | Date
): boolean => dayjs(a).tz(DEFAULT_TZ).isSameOrBefore(dayjs(b).tz(DEFAULT_TZ));

/** 특정 날짜가 오늘인지 검사 */
export const isToday = (date: string | Date): boolean =>
  dayjs(date).tz(DEFAULT_TZ).isSame(dayjs().tz(DEFAULT_TZ), "day");

/** 포맷이 있는 문자열을 파싱해서 Dayjs 객체로 */
export const parseDate = (dateStr: string, format: string): dayjs.Dayjs =>
  dayjs.tz(dateStr, format, DEFAULT_TZ);

/** YYYY-MM-DD 만 추출 */
export const getDateOnly = (date: string | Date): string =>
  dayjs(date).tz(DEFAULT_TZ).format("YYYY-MM-DD");
