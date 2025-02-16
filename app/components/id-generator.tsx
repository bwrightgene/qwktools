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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ClipboardCopy, RefreshCw } from "lucide-react";
import { nanoid } from "nanoid";
import { v4 as uuidv4 } from "uuid";
import { createId as cuid } from "@paralleldrive/cuid2";
import { useToast } from "@/hooks/use-toast";

export default function IdGenerator() {
  const { toast } = useToast();
  const [idType, setIdType] = useState<"cuid" | "uuid" | "nanoid">("cuid");
  const [quantity, setQuantity] = useState(1);
  const [generatedIds, setGeneratedIds] = useState<string[]>([]);

  const generateIds = () => {
    const newIds: string[] = [];
    for (let i = 0; i < quantity; i++) {
      newIds.push(
        idType === "cuid" ? cuid() : idType === "uuid" ? uuidv4() : nanoid()
      );
    }
    setGeneratedIds(newIds);
  };

  const copyToClipboard = () => {
    if (generatedIds.length === 0) return;
    navigator.clipboard.writeText(generatedIds.join("\n"));

    toast({
      title: "Copied to Clipboard",
      description: `${generatedIds.length} ${idType}(s) copied successfully!`,
    });
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>ID Generator</CardTitle>
        <CardDescription>Generate unique IDs</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">ID Type</label>
          <Select
            value={idType}
            onValueChange={(value) =>
              setIdType(value as "cuid" | "uuid" | "nanoid")
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select ID Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cuid">CUID</SelectItem>
              <SelectItem value="uuid">UUID</SelectItem>
              <SelectItem value="nanoid">NanoID</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium">Quantity</label>
          <Input
            type="number"
            min="1"
            max="500"
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, Math.min(500, Number(e.target.value))))
            }
          />
        </div>

        <Button
          onClick={generateIds}
          className="w-full flex items-center gap-2"
        >
          <RefreshCw size={16} />
          Generate IDs
        </Button>

        {generatedIds.length > 0 && (
          <>
            <Textarea
              className="h-48 resize-none"
              readOnly
              value={generatedIds.join("\n")}
            />
            <Button
              onClick={copyToClipboard}
              className="w-full flex items-center gap-2"
            >
              <ClipboardCopy size={16} />
              Copy to Clipboard
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
