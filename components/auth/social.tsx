"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import {
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaSpotify,
  FaTiktok,
} from "react-icons/fa";
import { FaMeta } from "react-icons/fa6";
// import { onClick } from "@/actions/social-login";

export const Social = () => {
  const onClick = async (
    provider:
      | "google"
      | "spotify"
      | "facebook"
      | "linkedin"
      | "instagram"
      | "tiktok"
  ) => {
    await signIn(provider, {
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="grid grid-cols-3 gap-4">
      <Button
        onClick={() => {
          onClick("spotify");
        }}
        variant="outline"
        className="w-full">
        <FaSpotify />
        <span className="sr-only">Login with Spotify</span>
      </Button>
      <Button
        variant="outline"
        onClick={() => onClick("google")}
        className="w-full">
        <FaGoogle />
        <span className="sr-only">Login with Google</span>
      </Button>
      <Button
        variant="outline"
        onClick={() => onClick("facebook")}
        className="w-full">
        <FaMeta />
        <span className="sr-only">Login with Meta</span>
      </Button>
      <Button
        variant="outline"
        onClick={() => onClick("linkedin")}
        className="w-full">
        <FaLinkedin />
        <span className="sr-only">Login with Linkedin</span>
      </Button>
      <Button
        variant="outline"
        onClick={() => onClick("instagram")}
        className="w-full">
        <FaInstagram />
        <span className="sr-only">Login with Instagram</span>
      </Button>
      <Button
        variant="outline"
        onClick={() => onClick("tiktok")}
        className="w-full">
        <FaTiktok />
        <span className="sr-only">Login with Tiktok</span>
      </Button>
    </div>
  );
};

// IGAAUe5LLtekVBZAE41WFRRYm84VzY1blJfbVl4YkFOVE52LTQwMzFrTU92djdZAQXZAWbWw5NVZApYmhnU2ZAVMnYwaEh5Vmo3VUhaTmJNYzF3QzVKcmhIdWstVXJja1pNeExyWmhIUTNWbGRyYjRFTGtRdTRXUFVBSXk5SXRBUXI0TQZDZD
