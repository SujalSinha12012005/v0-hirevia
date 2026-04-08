"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Sparkles, Copy, CheckCircle2 } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useFeatureWithCredits } from "@/app/actions/credits"
import { toast } from "sonner"

const MOCK_GENERATED_EMAILS: Record<string, string> = {
  "Professional": `Subject: Experienced Developer for [Role] - Passionate About Your Work at [Company]

Dear [Recruiter Name],

I hope this email finds you well. I recently came across your post regarding the open [Role] position at [Company] and was immediately drawn to it. Your recent initiative in [Company News] perfectly aligns with my background in building scalable web applications.

With a strong foundation in [Your Key Skill] and a recent track record of delivering high-impact features, I am confident I can bring value to your engineering team right away.

I have attached my resume for your review. I would love to connect for a brief chat to discuss how I can contribute to [Company].

Best regards,
[Your Name]`,

  "Direct & Confident": `Subject: Let's scale [Company] engineering together

Hi [Recruiter Name],

I saw your recent update about [Company News] and the open [Role] position. Given my expertise in [Your Key Skill] and experience optimizing similar systems, I know I can make an immediate impact on your team's goals this quarter.

I'd love to skip the usual long introductions and just show you what I can do. Are you open to a quick 10-minute call next Tuesday?

Cheers,
[Your Name]`,

  "Curious & Engaging": `Subject: Quick question about your recent post on [Company News]

Hi [Recruiter Name],

I was just reading your recent post on LinkedIn about [Company News] and found your perspective fascinating. It’s exactly the kind of problem space I’ve been working in over the past 3 years using [Your Key Skill].

I noticed you're also hiring for a [Role]. I would love to learn more about the specific challenges the team is facing right now and share how my background might be a great fit to help solve them.

Looking forward to connecting,
[Your Name]`
}

export default function ColdEmailPage() {
  const [bio, setBio] = useState("")
  const [jd, setJd] = useState("")
  const [tone, setTone] = useState("Professional")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedEmail, setGeneratedEmail] = useState("")
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    if (!bio.trim() || !jd.trim()) return
    setIsGenerating(true)
    setGeneratedEmail("")
    setCopied(false)
    
    // Attempt Credit Deduction
    const { success, message } = await useFeatureWithCredits(5, "Cold Email Generation")
    
    if (!success) {
      toast.error(message || "Insufficient credits")
      setIsGenerating(false)
      return
    }
    
    // Simulate AI generation time if we have enough credits
    setTimeout(() => {
      setGeneratedEmail(MOCK_GENERATED_EMAILS[tone] || MOCK_GENERATED_EMAILS["Professional"])
      setIsGenerating(false)
      toast.success("Generated successfully! (-5 Credits)")
    }, 2000)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedEmail)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Mail className="size-6 text-primary" />
              Cold Email / InMail Generator
            </h1>
            <p className="text-muted-foreground mt-1">
              Craft hyper-personalized outreach messages based on recruiter bios and job descriptions.
            </p>
          </div>
          <Badge variant="outline" className="h-9 px-4 gap-2 bg-primary/5 border-primary/20 text-primary rounded-full">
            <Sparkles className="size-3.5" />
            AI Powered
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Form Section */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Target Context</CardTitle>
              <CardDescription>
                Provide the details of the person and role you are targeting.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">
                  Recruiter Bio or Recent Company News
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="e.g. 'I'm a Technical Recruiter at TechCorp passionate about web3...' or paste a recent news snippet."
                  className="min-h-[120px] w-full rounded-xl border border-input bg-muted/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">
                  Job Description
                </label>
                <textarea
                  value={jd}
                  onChange={(e) => setJd(e.target.value)}
                  placeholder="Paste the target job description here..."
                  className="min-h-[120px] w-full rounded-xl border border-input bg-muted/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-y"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">
                  Email Tone
                </label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Professional">Professional & Polite</SelectItem>
                    <SelectItem value="Direct & Confident">Direct & Confident</SelectItem>
                    <SelectItem value="Curious & Engaging">Curious & Engaging</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={!bio.trim() || !jd.trim() || isGenerating}
                className="w-full mt-2"
              >
                <Sparkles className="size-4 mr-2" />
                {isGenerating ? "Crafting your message..." : "Generate Cold Email"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Output Section */}
        <div className="flex flex-col h-full">
          <Card className={`flex-1 flex flex-col transition-all duration-500 ${generatedEmail ? 'border-primary/50 shadow-md' : ''}`}>
            <CardHeader className="flex flex-row flex-wrap items-center justify-between pb-4 border-b">
              <div>
                <CardTitle>Generated Output</CardTitle>
                <CardDescription>
                  Your hyper-personalized cold email will appear here.
                </CardDescription>
              </div>
              {generatedEmail && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleCopy}
                  className="gap-2"
                >
                  {copied ? <CheckCircle2 className="size-4 text-success" /> : <Copy className="size-4" />}
                  {copied ? "Copied!" : "Copy to Clipboard"}
                </Button>
              )}
            </CardHeader>
            <CardContent className="flex-1 p-0 relative">
              {isGenerating ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center min-h-[300px]">
                  <div className="relative">
                    <div className="size-16 border-4 border-primary/20 rounded-full animate-pulse blur-sm absolute inset-0 m-auto"></div>
                    <Sparkles className="size-8 text-primary animate-bounce relative z-10" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-muted-foreground animate-pulse">
                    Analyzing context and writing draft...
                  </p>
                </div>
              ) : generatedEmail ? (
                <div className="p-6 h-full w-full animate-in fade-in-0 duration-500">
                  <div className="bg-muted/30 rounded-xl p-4 whitespace-pre-wrap text-sm leading-relaxed font-medium text-sidebar-foreground border">
                    {generatedEmail}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center min-h-[300px] text-muted-foreground px-6 text-center">
                  <Mail className="size-12 mb-4 opacity-20" />
                  <p className="text-sm">
                    Fill in the details on the left and hit generate to craft your email.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
