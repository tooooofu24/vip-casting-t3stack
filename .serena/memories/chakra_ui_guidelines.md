# Chakra UI v3 Usage Guidelines

## Core Principle: Minimize Props
⚠️ **Use Chakra UI default components with minimal props**

## Before Implementation
1. Check Chakra UI documentation for existing components
2. Use default styling when sufficient
3. Only add props when absolutely necessary

## Recommended Patterns

### Cards
```tsx
// ✅ Good
<Card.Root>
  <Card.Body>
    <Card.Title>Title</Card.Title>
  </Card.Body>
</Card.Root>

// ❌ Avoid
<Box bg="white" rounded="lg" shadow="sm" p="6">
  <Text fontSize="xl" fontWeight="bold">Title</Text>
</Box>
```

### Layout
```tsx
// ✅ Good - defaults often sufficient
<VStack>
<HStack>
<Stack>

// ❌ Avoid excessive props
<HStack gap="2" align="center" justify="space-between">
```

### Common Components
- `Badge` - use `colorPalette` only when needed
- `Button` - use `variant`, `colorPalette` sparingly
- `SimpleGrid` - for grid layouts
- `List.Root`, `List.Item` - for lists

## Color Palette
Available colors: `gray`, `red`, `orange`, `yellow`, `green`, `teal`, `blue`, `cyan`, `purple`, `pink`

```tsx
<Badge colorPalette="green">Active</Badge>
<Button colorPalette="blue">Save</Button>
```