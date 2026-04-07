"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { createReview } from "@/lib/actions/review.action";
import { useToast } from "../ui/use-toast";
import { getUserById } from "@/lib/actions/user.action";
import Image from "next/image";

const Review = ({ review }: any) => {
  const [reviewUser, setReviewUser] = useState();
  useEffect(() => {
    async function get() {
      const fetchedUser = await getUserById({ userId: review.user });
      const parsedUser = JSON.parse(fetchedUser);
      setReviewUser(parsedUser);
    }
    get();
  }, []);
  const date = new Date(review.createdAt);
  return (
    <div key={review.user} className="my-8 flex flex-col gap-4">
      <div className="flex gap-8">
        {reviewUser && (
          <div className="flex gap-2">
            <Image
              src={reviewUser.picture}
              className="rounded-full"
              alt="user"
              width={24}
              height={24}
            />
            <p>{reviewUser.username}</p>
          </div>
        )}
        <p>
          {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
        </p>
      </div>
      <p>{review.review}</p>
    </div>
  );
};

export const ReviewForm = ({ user, businessId, reviews }: any) => {
  const [review, setReview] = useState<string>("");
  const { toast } = useToast();

  async function submitReview(e: any) {
    e.preventDefault();
    if (!user) {
      toast({
        variant: "default",
        description: "You must be logged in to submit a review",
      });
      return;
    }
    const res = await createReview({
      user: user._id.toString(),
      business: businessId,
      review,
    });
    const parsedRes = JSON.parse(res);
    if (parsedRes.error) {
      toast({
        variant: "default",
        description: parsedRes.error,
      });
      return;
    }
    toast({
      variant: "destructive",
      title: "Review submitted successfully",
      description: "Thank you for your feedback!",
    });
  }

  return (
    <div>
      <h3 className="h3-bold">Reviews</h3>
      {reviews.map((r: any) => {
        return <Review key={r.user} review={r} />;
      })}
      <form className="mt-8 space-y-4">
        <div className="relative">
          <Textarea
            placeholder=""
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="form-input peer resize-none focus-visible:ring-0"
            id="review"
          />
          <label
            htmlFor="review"
            className="form-input-label peer-focus:text-xs"
          >
            Review
          </label>
        </div>
        <Button
          className="h-max rounded-3xl bg-primary-900 px-6 py-2 text-light-900 duration-300 hover:bg-primary-500"
          type="button"
          onClick={(e) => submitReview(e)}
        >
          Submit Review
        </Button>
      </form>
    </div>
  );
};
