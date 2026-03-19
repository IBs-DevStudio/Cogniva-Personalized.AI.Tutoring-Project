'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Bot, Sparkles, Clock, BookOpen, Mic, Palette, ChevronRight } from "lucide-react"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { subjects } from "@/constants"
import { Textarea } from "@/components/ui/textarea"
import { createCompanion } from "@/lib/actions/companions.action"
import { formatSubjectName } from "@/lib/utils"
import { cn } from "@/lib/utils"

const formSchema = z.object({
    name: z.string().min(1, { message: 'Companion name is required.' }),
    subject: z.string().min(1, { message: 'Subject is required.' }),
    topic: z.string().min(1, { message: 'Topic is required.' }),
    voice: z.string().min(1, { message: 'Voice is required.' }),
    style: z.string().min(1, { message: 'Style is required.' }),
    duration: z.coerce.number().min(1, { message: 'Duration is required.' }),
})

const DURATION_PRESETS = [15, 30, 45, 60]

const VOICE_OPTIONS = [
    { value: "male", label: "Male", emoji: "🎙️" },
    { value: "female", label: "Female", emoji: "🎤" },
]

const STYLE_OPTIONS = [
    { value: "formal", label: "Formal", description: "Structured & precise", emoji: "📐" },
    { value: "casual", label: "Casual", description: "Friendly & relaxed", emoji: "💬" },
]

const CompanionForm = () => {
    const router = useRouter()
    const [isBuilding, setIsBuilding] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            subject: '',
            topic: '',
            voice: '',
            style: '',
            duration: 15,
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsBuilding(true)
            const companion = await createCompanion(values)
            if (companion) {
                router.push(`/companions/${companion.id}`)
            } else {
                console.log('Failed to create a companion')
                setIsBuilding(false)
            }
        } catch (error) {
            console.log('Failed to create a companion', error)
            setIsBuilding(false)
        }
    }

    return (
        <>
            {/* Full-screen building overlay */}
            {isBuilding && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
                    <div className="relative flex flex-col items-center gap-6">
                        <div className="pointer-events-none absolute -inset-16 rounded-full bg-primary/10 blur-3xl" />
                        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/5 shadow-2xl border border-primary/10">
                            <Bot className="h-12 w-12 text-primary animate-pulse" />
                        </div>
                        <div className="relative h-16 w-16">
                            <div className="absolute inset-0 rounded-full border-2 border-primary/10" />
                            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-orange-400 border-r-primary animate-spin" />
                        </div>
                        <div className="text-center space-y-1">
                            <p className="text-base font-medium text-foreground">Crafting your AI tutor...</p>
                            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                                <Sparkles className="h-3.5 w-3.5 animate-pulse text-orange-400" />
                                <span>Teaching it how to guide you.</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    {/* Section: Identity */}
                    <div className="space-y-1 pb-1">
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/70 flex items-center gap-2">
                            <BookOpen className="h-3 w-3" /> Identity
                        </p>
                    </div>

                    {/* Companion Name */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: '50ms' }}>
                                <FormLabel className="font-semibold text-sm">Companion name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="e.g. Newton, Socrates, Ada..."
                                        {...field}
                                        className="input rounded-xl border-border/60 bg-muted/30 focus:bg-background transition-colors placeholder:text-muted-foreground/50"
                                    />
                                </FormControl>
                                <FormDescription className="text-xs">Give your companion a memorable name</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Subject */}
                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem className="animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: '100ms' }}>
                                <FormLabel className="font-semibold text-sm">Subject</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                        <SelectTrigger className="input capitalize rounded-xl border-border/60 bg-muted/30 focus:bg-background transition-colors">
                                            <SelectValue placeholder="Select the subject" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl">
                                            {subjects.map((subject) => (
                                                <SelectItem value={subject} key={subject} className="capitalize">
                                                    {formatSubjectName(subject)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Topic */}
                    <FormField
                        control={form.control}
                        name="topic"
                        render={({ field }) => (
                            <FormItem className="animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: '150ms' }}>
                                <FormLabel className="font-semibold text-sm">What should the companion help with?</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="e.g. Derivatives & Integrals, World War II timelines, Python data structures..."
                                        {...field}
                                        className="input rounded-xl border-border/60 bg-muted/30 focus:bg-background transition-colors resize-none min-h-[90px] placeholder:text-muted-foreground/50"
                                    />
                                </FormControl>
                                <FormDescription className="text-xs">Be specific — the more detail, the better the tutor</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Divider */}
                    <div className="space-y-1 pt-2 pb-1 border-t border-border/40">
                        <p className="pt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground/70 flex items-center gap-2">
                            <Mic className="h-3 w-3" /> Personality
                        </p>
                    </div>

                    {/* Voice — pill toggle */}
                    <FormField
                        control={form.control}
                        name="voice"
                        render={({ field }) => (
                            <FormItem className="animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: '200ms' }}>
                                <FormLabel className="font-semibold text-sm">Voice</FormLabel>
                                <FormControl>
                                    <div className="grid grid-cols-2 gap-3">
                                        {VOICE_OPTIONS.map((option) => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => field.onChange(option.value)}
                                                className={cn(
                                                    "flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium transition-all duration-200",
                                                    field.value === option.value
                                                        ? "border-orange-400 bg-orange-50 text-orange-600 shadow-sm dark:bg-orange-950/30 dark:text-orange-400"
                                                        : "border-border/60 bg-muted/30 text-muted-foreground hover:border-orange-300 hover:bg-orange-50/50 dark:hover:bg-orange-950/10"
                                                )}
                                            >
                                                <span>{option.emoji}</span>
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Style — card toggle */}
                    <FormField
                        control={form.control}
                        name="style"
                        render={({ field }) => (
                            <FormItem className="animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: '250ms' }}>
                                <FormLabel className="font-semibold text-sm flex items-center gap-1.5">
                                    <Palette className="h-3.5 w-3.5" /> Style
                                </FormLabel>
                                <FormControl>
                                    <div className="grid grid-cols-2 gap-3">
                                        {STYLE_OPTIONS.map((option) => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => field.onChange(option.value)}
                                                className={cn(
                                                    "flex flex-col items-start gap-0.5 rounded-xl border px-4 py-3 text-left transition-all duration-200",
                                                    field.value === option.value
                                                        ? "border-orange-400 bg-orange-50 shadow-sm dark:bg-orange-950/30"
                                                        : "border-border/60 bg-muted/30 hover:border-orange-300 hover:bg-orange-50/50 dark:hover:bg-orange-950/10"
                                                )}
                                            >
                                                <span className="text-base">{option.emoji}</span>
                                                <span className={cn(
                                                    "text-sm font-semibold",
                                                    field.value === option.value ? "text-orange-600 dark:text-orange-400" : "text-foreground"
                                                )}>
                                                    {option.label}
                                                </span>
                                                <span className="text-xs text-muted-foreground">{option.description}</span>
                                            </button>
                                        ))}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Divider */}
                    <div className="space-y-1 pt-2 pb-1 border-t border-border/40">
                        <p className="pt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground/70 flex items-center gap-2">
                            <Clock className="h-3 w-3" /> Session
                        </p>
                    </div>

                    {/* Duration — slider + presets */}
                    <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                            <FormItem className="animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: '300ms' }}>
                                <FormLabel className="font-semibold text-sm">Estimated session duration</FormLabel>
                                <FormControl>
                                    <div className="space-y-4">
                                        {/* Preset pills */}
                                        <div className="flex gap-2">
                                            {DURATION_PRESETS.map((min) => (
                                                <button
                                                    key={min}
                                                    type="button"
                                                    onClick={() => field.onChange(min)}
                                                    className={cn(
                                                        "flex-1 rounded-lg border py-1.5 text-xs font-semibold transition-all duration-200",
                                                        field.value === min
                                                            ? "border-orange-400 bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400"
                                                            : "border-border/60 bg-muted/30 text-muted-foreground hover:border-orange-300"
                                                    )}
                                                >
                                                    {min}m
                                                </button>
                                            ))}
                                        </div>

                                        {/* Slider */}
                                        <div className="space-y-2">
                                            <input
                                                type="range"
                                                min={5}
                                                max={120}
                                                step={5}
                                                value={field.value}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                                className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-orange-500 bg-muted"
                                            />
                                            <div className="flex justify-between text-xs text-muted-foreground">
                                                <span>5 min</span>
                                                <span className="font-semibold text-foreground">{field.value} minutes</span>
                                                <span>120 min</span>
                                            </div>
                                        </div>
                                    </div>
                                </FormControl>
                                <FormDescription className="text-xs">Tune this to match your focus window</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit */}
                    <div className="pt-2 animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: '350ms' }}>
                        <Button
                            type="submit"
                            disabled={isBuilding}
                            className="w-full gap-2.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold py-6 text-base rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25 disabled:opacity-60 cursor-pointer"
                        >
                            {isBuilding ? (
                                <>
                                    <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                    Building your companion...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="h-4 w-4" />
                                    Build Your Companion
                                    <ChevronRight className="h-4 w-4 ml-auto opacity-70" />
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    )
}

export default CompanionForm