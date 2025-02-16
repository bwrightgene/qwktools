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
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ClipboardCopy, RefreshCw, Split } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ListDelimiter() {
  const { toast } = useToast();
  const [inputList, setInputList] = useState("");
  const [delimiter, setDelimiter] = useState(", ");
  const [removeDelimiter, setRemoveDelimiter] = useState(false);
  const [outputOnePerLine, setOutputOnePerLine] = useState(true);
  const [formattedList, setFormattedList] = useState<string>("");

  const processList = () => {
    let items = inputList.split("\n").filter((item) => item.trim() !== "");

    if (removeDelimiter) {
      items = items.map((item) => item.split(delimiter).join(""));
    }

    const output = outputOnePerLine
      ? items.join(delimiter + "\n")
      : items.join(delimiter);

    setFormattedList(output);
  };

  const separateList = () => {
    if (!delimiter) return;

    const separated = inputList
      .split(delimiter)
      .map((item) => item.trim())
      .filter((item) => item !== "")
      .join("\n");

    setInputList(separated);
  };

  const copyToClipboard = () => {
    if (!formattedList) return;
    navigator.clipboard.writeText(formattedList);

    toast({
      title: "Copied to Clipboard",
      description: `List copied successfully!`,
    });
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>List Delimiter</CardTitle>
        <CardDescription>Add or remove delimiters from a list.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">
            Enter List (comma-separated or one per line)
          </label>
          <Textarea
            className="h-32 resize-none"
            placeholder="Enter items here..."
            value={inputList}
            onChange={(e) => setInputList(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 items-center">
          <div>
            <label className="text-sm font-medium">Delimiter</label>
            <Input
              type="text"
              value={delimiter}
              maxLength={10}
              onChange={(e) => setDelimiter(e.target.value)}
              placeholder="Enter delimiter"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={removeDelimiter}
                onCheckedChange={(checked) =>
                  setRemoveDelimiter(checked as boolean)
                }
              />
              <label className="text-sm font-medium">Remove Delimiter</label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={outputOnePerLine}
                onCheckedChange={(checked) =>
                  setOutputOnePerLine(checked as boolean)
                }
              />
              <label className="text-sm font-medium">Output One Per Line</label>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={processList}
            className="w-full flex items-center gap-2"
          >
            <RefreshCw size={16} />
            Process List
          </Button>
          <Button
            onClick={separateList}
            className="w-full flex items-center gap-2"
          >
            <Split size={16} />
            Separate List
          </Button>
          <Button
            onClick={copyToClipboard}
            className="w-full flex items-center gap-2"
            disabled={!formattedList}
          >
            <ClipboardCopy size={16} />
            Copy to Clipboard
          </Button>
        </div>

        {formattedList && (
          <div>
            <label className="text-sm font-medium">Formatted List</label>
            <Textarea
              className="h-32 resize-none"
              readOnly
              value={formattedList}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
