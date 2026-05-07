# Mobile Development — Lesson 6
# Custom Hooks & API Integration

---

## 1. Custom Hooks

A custom hook is a JavaScript function whose name starts with `use` that calls other hooks inside it.

**Why use them?**
When you have `useState` + `useEffect` logic that you need in more than one component, you extract it into a custom hook instead of copying it.

**The rule:** if you're about to paste a block of hook logic into a second component, that's your signal to extract it.

### Basic structure

```js
function useMyHook() {
  const [value, setValue] = useState(null);

  useEffect(() => {
    // do something
  }, []);

  return value;
}
```

Every custom hook follows this shape:
1. `useState` / `useRef` to hold data
2. `useEffect` or an event handler to update it
3. `return` what the component needs

### Important: hooks don't share state

Each component that calls a custom hook gets its **own independent copy** of the state. Custom hooks are about reusing **logic**, not sharing state between components.

---

## 2. useFetch — a reusable data-fetching hook

The most common custom hook pattern. Encapsulates fetch + loading + error in one place.

```js
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
```

**Usage:**
```js
const { data, loading, error } = useFetch('https://api.thecatapi.com/v1/images/search');
```

> Note: you cannot make the `useEffect` callback itself `async`. Define the async function inside it and call it immediately.

---

## 3. useInput — a reusable form input hook

Removes repetitive `useState` + `onChangeText` wiring for text inputs.

```js
function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    onChangeText: (text) => setValue(text)
  };
}
```

The object it returns has the same keys as `TextInput` props, so you can spread it directly:

```js
const name = useInput('');

<TextInput {...name} placeholder="Name" />
// equivalent to:
<TextInput value={name.value} onChangeText={name.onChangeText} placeholder="Name" />
```

To access the value (e.g. on submit):
```js
console.log(name.value);
```

---

## 4. Fetching data from an API

`fetch` works the same in React Native as in React.

### GET request (no auth)

```js
const res = await fetch('https://api.thecatapi.com/v1/images/search');
const json = await res.json();
```

### GET request (with API key)

Some endpoints require authentication via a header:

```js
const res = await fetch('https://api.thecatapi.com/v1/votes', {
  headers: {
    'x-api-key': 'YOUR_API_KEY'
  }
});
const json = await res.json();
```

### Where to put it

Fetch-on-load goes inside `useEffect` with an empty dependency array:

```js
useEffect(() => {
  const load = async () => {
    const res = await fetch(url);
    const json = await res.json();
    setData(json);
  };
  load();
}, []);
```

### Handling loading and error states

Always track all three states:

```js
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

In your JSX:
```js
if (loading) return <ActivityIndicator />;
if (error) return <Text>Error: {error}</Text>;
return <Image source={{ uri: data.url }} />;
```

---

## 5. POST requests

POST is used for sending data — votes, form submissions, new records.

```js
const res = await fetch('https://api.thecatapi.com/v1/votes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'YOUR_API_KEY'
  },
  body: JSON.stringify({
    image_id: 'abc123',
    value: 1           // 1 = upvote, 0 = downvote
  })
});
```

Three things that differ from GET:
- `method: 'POST'`
- `headers` must include `'Content-Type': 'application/json'`
- `body` must be `JSON.stringify(yourObject)` — not a plain object

### Where to put it

POST is triggered by user action, so it goes in an event handler — **not** `useEffect`:

```js
const handleVote = async (value) => {
  await fetch('https://api.thecatapi.com/v1/votes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'YOUR_API_KEY'
    },
    body: JSON.stringify({ image_id: cat.id, value })
  });
  fetchVotes(); // refresh list after posting
};
```

---

## 6. GET vs POST — quick reference

| | GET | POST |
|---|---|---|
| Purpose | Read data | Send / create data |
| Triggered by | Component mount (`useEffect`) | User action (`onPress`) |
| Body | None | `JSON.stringify(payload)` |
| Headers | API key if required | `Content-Type` + API key |
| Response | Data to display | Confirmation / new record |

---

## The Cat API — endpoints used in this lesson

| Endpoint | Method | Purpose |
|---|---|---|
| `/v1/images/search` | GET | Get a random cat image |
| `/v1/votes` | GET | Get your vote history |
| `/v1/votes` | POST | Submit a vote |

API key is required for `/v1/votes` (both GET and POST). Free keys available at [thecatapi.com](https://thecatapi.com).