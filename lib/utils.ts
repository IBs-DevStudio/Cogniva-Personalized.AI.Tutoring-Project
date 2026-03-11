import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { subjectsColors, voices } from "@/constants";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSubjectColor = (subject: string) => {
  return subjectsColors[subject as keyof typeof subjectsColors] || '#E5E7EB';
};

export const formatSubjectName = (subject: string) => {
  const subjectMap: { [key: string]: string } = {
    'interview': 'Interview',
    'coding': 'Coding',
    'computersciencefundamentals': 'Computer Science Fundamentals',
    'math': 'Math',
    'science': 'Science',
    'communication': 'Communication',
    'machinelearning': 'Machine Learning',
  };
  
  return subjectMap[subject] || subject.charAt(0).toUpperCase() + subject.slice(1);
};

export const configureAssistant = (voice: string, style: string) => {
  const voiceConfig = voices[voice as keyof typeof voices];
  const voiceId = voiceConfig ? voiceConfig[style as keyof typeof voiceConfig] || "sarah" : "sarah";

  const vapiAssistant: CreateAssistantDTO = {
    name: "Companion",
    firstMessage:
      "Hi {{userName}}! Welcome to Cogniva, I'm {{name}}, your AI tutor for {{topic}}. What would you like to learn today?Let Me Know.....I am Listnin'..",
    transcriber: {
      provider: "deepgram",
      model: "nova-3",
      language: "en",
    },
    voice: {
      provider: "11labs",
      voiceId: voiceId,
      stability: 0.4,
      similarityBoost: 0.8,
      speed: 1,
      style: 0.5,
      useSpeakerBoost: true,
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a highly knowledgeable tutor teaching a real-time voice session with a student. Your goal is to teach the student about {{topic}} in {{subject}}.

Tutor Guidelines:
- Stay focused on {{topic}} and {{subject}} only
- Keep the conversation flowing naturally while maintaining control
- Check student understanding regularly
- Break down the topic into smaller, digestible parts
- Teach one concept at a time before moving forward
- Use a {{style}} teaching approach
- Keep responses concise like in real voice conversations
- Avoid special characters - this is voice only
- Adapt your pace to the student's comprehension level`,
        },
      ],
    },
    clientMessages: [],
    serverMessages: [],
  };
  return vapiAssistant;
};