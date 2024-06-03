import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "../ui/label";
import Clock from "./Clock";
import { Button } from "../ui/button";

interface Props {
  isOtpDialogOpen: Boolean | undefined;
  setIsOtpDialogOpen: Dispatch<SetStateAction<Boolean | undefined>>;
}

const OtpDialog = ({ isOtpDialogOpen, setIsOtpDialogOpen }: Props) => {
  const [otp, setOtp] = useState<string>();
  const [canSendOtp, setCanSendOtp] = useState<Boolean>(false);
  const [time, updateTime] = useState<number>(60);
  const handleResendOtp = () => {
    setCanSendOtp(false);
    updateTime(60);
  };
  return (
    <Dialog
      open={Boolean(isOtpDialogOpen)}
      onOpenChange={() => setIsOtpDialogOpen(!isOtpDialogOpen)}
    >
      <DialogContent className="bg-light-900">
        <DialogHeader>
          <DialogTitle>Confirm your number</DialogTitle>
        </DialogHeader>
        <Label className="!my-4">
          Enter the code we sent over SMS to +923475287822{" "}
          <span className="text-red-600">*</span>
        </Label>
        <InputOTP
          maxLength={6}
          value={otp}
          onChange={(value) => setOtp(value)}
          className="w-max"
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} className="focus:ring-slate-800" />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <p className="text-xs text-gray-500">
          You can request a new code in{" "}
          <Clock
            time={time}
            updateTime={updateTime}
            setCanSendOtp={setCanSendOtp}
            canSendOtp={canSendOtp}
          />
        </p>
        <div className="flex justify-between gap-4">
          <Button
            disabled={!canSendOtp}
            className="w-max rounded-full bg-gray-300 font-normal transition-colors duration-300 hover:bg-gray-400"
            type="button"
            onClick={handleResendOtp}
          >
            Resend Otp
          </Button>
          <Button
            className="w-max rounded-full bg-primary-900 font-normal text-light-800 transition-colors duration-300 hover:bg-primary-500"
            type="submit"
          >
            Verify
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OtpDialog;
