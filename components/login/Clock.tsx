"use client";
import React, { Dispatch, SetStateAction, useEffect } from "react";
interface Props {
  canSendOtp: Boolean | undefined;
  setCanSendOtp: Dispatch<SetStateAction<Boolean>>;
  time: number;
  updateTime: Dispatch<SetStateAction<number>>;
}
const Clock = ({ canSendOtp, setCanSendOtp, time, updateTime }: Props) => {
  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) {
        updateTime(time - 1);
      } else if (!canSendOtp) {
        setCanSendOtp(true);
      }
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, canSendOtp]);
  return (
    <span>{time === 60 ? "1:00" : `00:${time <= 9 ? `0${time}` : time}`}</span>
  );
};

export default Clock;
