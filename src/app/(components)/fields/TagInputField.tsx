import { Button, Input, InputGroup, Tag, VStack, Wrap } from "@chakra-ui/react";
import { useState } from "react";

type Props = {
  value: string[] | undefined;
  onChange: (next: string[]) => void;
  placeholder?: string;
};

export function TagInputField({ value, onChange, placeholder = "" }: Props) {
  const [input, setInput] = useState("");
  // 日本語変換かどうかを判別するためのstate
  const [composing, setComposition] = useState(false);

  const addTag = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const filtered = value?.filter((v) => v !== trimmed) ?? [];
    onChange([...filtered, trimmed]);
    setInput("");
  };
  const removeTag = (item: string) => {
    onChange(value?.filter((v) => v !== item) ?? []);
  };
  return (
    <VStack align="stretch" gap={2} w="full">
      <InputGroup
        w="full"
        endElement={
          <Button size="xs" onClick={addTag} variant="ghost">
            追加
          </Button>
        }
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (composing) return;
              e.preventDefault();
              addTag();
            }
          }}
          onCompositionStart={() => setComposition(true)}
          onCompositionEnd={() => setComposition(false)}
        />
      </InputGroup>
      {value && value.length > 0 && (
        <Wrap>
          {value.map((item) => (
            <Tag.Root key={item}>
              <Tag.Label>{item}</Tag.Label>
              <Tag.EndElement>
                <Tag.CloseTrigger onClick={() => removeTag(item)} />
              </Tag.EndElement>
            </Tag.Root>
          ))}
        </Wrap>
      )}
    </VStack>
  );
}
