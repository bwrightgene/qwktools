"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ClipboardCopy, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { loremIpsum } from "lorem-ipsum";

export default function LoremIpsumGenerator() {
  const { toast } = useToast();
  const [mode, setMode] = useState<"paragraphs" | "words">("paragraphs");
  const [count, setCount] = useState(3);
  const [includeHtml, setIncludeHtml] = useState(false);
  const [generatedText, setGeneratedText] = useState<string>("");

  const generateLoremIpsum = () => {
    const text = loremIpsum({
      count,
      format: "plain",
      units: mode === "paragraphs" ? "paragraphs" : "words",
    });

    const output = includeHtml
      ? text
          .split("\n")
          .map((p) => `<p>${p}</p>`)
          .join("\n")
      : text;

    setGeneratedText(output);
  };

  const copyToClipboard = () => {
    if (!generatedText) return;
    navigator.clipboard.writeText(generatedText);

    toast({
      title: "Copied to Clipboard",
      description: "Lorem Ipsum copied successfully!",
    });
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Lorem Ipsum Generator</CardTitle>
        <CardDescription>Generate filler text with options.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Generate By</label>
            <Select
              value={mode}
              onValueChange={(value) =>
                setMode(value as "paragraphs" | "words")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paragraphs">Paragraphs</SelectItem>
                <SelectItem value="words">Words</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Count</label>
            <Input
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) =>
                setCount(Math.max(1, Math.min(100, Number(e.target.value))))
              }
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            checked={includeHtml}
            onCheckedChange={(checked) => setIncludeHtml(checked as boolean)}
          />
          <label className="text-sm font-medium">Include HTML Markup</label>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={generateLoremIpsum}
            className="flex items-center gap-2 justify-center"
          >
            <RefreshCw size={16} />
            Generate Text
          </Button>
          <Button
            onClick={copyToClipboard}
            className="flex items-center gap-2 justify-center"
            disabled={!generatedText}
          >
            <ClipboardCopy size={16} />
            Copy to Clipboard
          </Button>
        </div>

        {generatedText && (
          <div>
            <label className="text-sm font-medium">Generated Text</label>
            <Textarea
              className="h-32 resize-none"
              readOnly
              value={generatedText}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
