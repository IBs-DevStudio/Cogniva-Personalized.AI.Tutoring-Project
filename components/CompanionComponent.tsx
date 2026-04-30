"use client";

import { useEffect, useRef, useState } from "react";
import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Image from "next/image";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from "@/constants/soundwaves.json";
import { addToSessionHistory } from "@/lib/actions/companions.action";
import { Loader2, Play, Square } from "lucide-react";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const CompanionComponent = ({
  companionId,
  subject,
  topic,
  name,
  userName,
  userImage,
  style,
  voice,
}: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play();
      } else {
        lottieRef.current?.stop();
      }
    }
  }, [isSpeaking, lottieRef]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
      addToSessionHistory(companionId);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [newMessage, ...prev]);
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    const onError = (error: Error) => console.log("Error", error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("error", onError);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
    };
  }, [companionId]);

  const toggleMicrophone = () => {
    const isMuted = vapi.isMuted();
    vapi.setMuted(!isMuted);
    setIsMuted(!isMuted);
  };

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    const assistantOverrides = {
      variableValues: { userName, name, subject, topic, style },
      clientMessages: ["transcript"],
      serverMessages: [],
    };

    vapi.start(
      configureAssistant(voice || "female", style || "casual"),
      assistantOverrides as any,
    );
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  const handleRepeat = () => {
    // Stop any running call first
    if (
      callStatus === CallStatus.ACTIVE ||
      callStatus === CallStatus.CONNECTING
    ) {
      vapi.stop();
    }
    setMessages([]);
    setIsMuted(false);
    setIsSpeaking(false);
    setCallStatus(CallStatus.INACTIVE);
    // Small delay to ensure clean reset
    setTimeout(() => {
      handleCall();
    }, 300);
  };

  return (
    <section className="flex flex-col min-h-[70vh] h-auto">
      <section className="flex gap-8 flex-col lg:flex-row">
        <div className="companion-section w-full lg:w-1/2">
          <div
            className="companion-avatar"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.FINISHED ||
                  callStatus === CallStatus.INACTIVE
                  ? "opacity-100"
                  : "opacity-0",
                callStatus === CallStatus.CONNECTING &&
                  "opacity-100 animate-pulse",
              )}
            >
              <Image
                src={`/icons/${subject}.svg`}
                alt={subject}
                width={150}
                height={150}
                className="max-sm:w-fit"
              />
            </div>

            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0",
              )}
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={soundwaves}
                autoplay={false}
                className="companion-lottie"
              />
            </div>
          </div>
          <p className="font-bold text-2xl">{name}</p>
        </div>

        <div className="user-section w-full lg:w-1/2">
          <div className="user-avatar">
            <Image
              src={userImage}
              alt={userName}
              width={130}
              height={130}
              className="rounded-lg"
            />
            <p className="font-bold text-2xl">{userName}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full">
            <button
              className="btn-mic"
              onClick={toggleMicrophone}
              disabled={callStatus !== CallStatus.ACTIVE}
            >
              <div className="relative">
                <Image
                  src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
                  alt="mic"
                  width={36}
                  height={36}
                />
                {/* Red dot indicator — only shows when mic is ON and call is active */}
                {!isMuted && callStatus === CallStatus.ACTIVE && (
                  <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
                )}
              </div>
              <p className="hidden sm:block text-sm">
                {isMuted ? "Turn on microphone" : "Turn off microphone"}
              </p>
            </button>
            <button
              onClick={handleRepeat}
              disabled={callStatus === CallStatus.CONNECTING}
              className={cn(
                "group border-2 border-black rounded-lg flex flex-col gap-2 items-center py-4 sm:py-8 cursor-pointer w-full",
                callStatus === CallStatus.CONNECTING
                  ? "opacity-70"
                  : "hover:bg-gray-50",
              )}
              title="Repeat"
            >
              <Image
                src="/icons/microphone-2.svg"
                alt="repeat"
                width={36}
                height={36}
                className={cn(
                  "transition-transform duration-300",
                  callStatus === CallStatus.CONNECTING
                    ? "animate-spin"
                    : "group-hover:rotate-180",
                )}
              />
              <p className="hidden sm:block text-sm">Repeat</p>
            </button>
          </div>
          <button
            className={cn(
              "rounded-lg py-3 sm:py-2 cursor-pointer transition-colors w-full text-white text-sm sm:text-base font-semibold",
              callStatus === CallStatus.ACTIVE ? "bg-red-700" : "bg-primary",
              callStatus === CallStatus.CONNECTING && "animate-pulse",
            )}
            onClick={
              callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall
            }
          >
            {callStatus === CallStatus.ACTIVE
              ? "End Session"
              : callStatus === CallStatus.CONNECTING
                ? "Connecting"
                : "Start Session"}
          </button>
        </div>
      </section>

      <section className="transcript">
        <div className="flex items-center mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Session Transcript
          </h3>
        </div>
        <div className="transcript-message no-scrollbar">
          {messages.map((message, index) => {
            if (message.role === "assistant") {
              return (
                <p key={index} className="max-sm:text-sm">
                  {name.split(" ")[0].replace("/[.,]/g, ", "")}:{" "}
                  {message.content}
                </p>
              );
            } else {
              return (
                <p key={index} className="text-primary max-sm:text-sm">
                  {userName}: {message.content}
                </p>
              );
            }
          })}
        </div>
      </section>
    </section>
  );
};

export default CompanionComponent;
