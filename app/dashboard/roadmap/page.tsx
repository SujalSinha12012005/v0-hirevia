"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

type RoadmapItem = {
  skill: string
  topic: string
  duration: string
}

export default function RoadmapPage() {
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [customSkills, setCustomSkills] = useState("")
  const [roadmap, setRoadmap] = useState<RoadmapItem[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const defaultRoles = [
    { id: "sde", title: "SDE" },
    { id: "frontend", title: "Frontend" },
    { id: "backend", title: "Backend" },
  ]

  const generateRoadmap = async () => {
    const skills = customSkills ? customSkills.split(",").map(s => s.trim()) : []
    if (skills.length === 0) return
    setIsGenerating(true)
    try {
      const res = await fetch("/api/generate-roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: selectedRole || "Developer", skills }),
      })
      const data = await res.json()
      if (data.roadmap) setRoadmap(data.roadmap)
    } catch (e) {
      console.error(e)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Skill Roadmap</h1>
      <p className="text-muted-foreground">Generate AI-powered learning roadmaps.</p>
      
      <div className="grid grid-cols-3 gap-2 mt-4">
        {defaultRoles.map((role) => (
          <button
            key={role.id}
            onClick={() => setSelectedRole(role.id)}
            className={"p-3 rounded-lg border text-sm font-medium " + (selectedRole === role.id ? "border-primary bg-primary/10" : "border-border")}
          >
            {role.title}
          </button>
        ))}
      </div>
      
      <Input
        placeholder="Or enter skills: React, Node.js..."
        value={customSkills}
        onChange={(e) => setCustomSkills(e.target.value)}
        className="mt-4"
      />
      
      <Button onClick={generateRoadmap} disabled={isGenerating} className="w-full mt-4">
        {isGenerating ? "Generating..." : "Generate Roadmap"}
      </Button>

      {roadmap.length > 0 && (
        <Card className="mt-6 p-4">
          <h2 className="font-bold mb-4">Your Roadmap ({roadmap.length} skills)</h2>
          <Progress value={0} className="mb-4" />
          {roadmap.map((item, i) => (
            <div key={i} className="p-3 border rounded mb-2">
              <div className="flex justify-between">
                <span className="font-medium">{item.skill}</span>
                <Badge>{item.duration}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{item.topic}</p>
            </div>
          ))}
        </Card>
      )}
    </div>
  )
}
