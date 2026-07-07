/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useRef } from "react";
import { SuggestionService } from "../utils/suggestion.service";

export default function UserForm() {
  // States
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState<{
    userInput: string;
    userSelect?: string;
  }>({
    userInput: "",
    userSelect: "",
  });

  const [suggestions, setSuggestions] = useState<
    { word: string; score: number }[]
  >([]);

  // Refs
  const controllerRef = useRef<AbortController | null>(null);
  const timerID = useRef<number | null>(null);

  // API
  async function fetchSuggestions(
    query: string
  ): Promise<{ word: string; score: number }[]> {
    try {
      setIsLoading(true);

      // Cancel previous request
      controllerRef.current?.abort();

      // Create a new controller
      controllerRef.current = new AbortController();

      const response = await SuggestionService.getSuggestions(query, controllerRef.current.signal);

      if (Array.isArray(response)) {
        setSuggestions(response);
      }

      return suggestions;
    } catch (error) {
      // Ignore aborted requests
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        return [];
      }

      console.error("Failed to fetch suggestions", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }

  // Debounce
  useEffect(() => {
    if (timerID.current) {
      clearTimeout(timerID.current);
    }

    if (form.userInput.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    timerID.current = window.setTimeout(() => {
      fetchSuggestions(form.userInput);
    }, 300);

    return () => {
      if (timerID.current) {
        clearTimeout(timerID.current);
      }

      controllerRef.current?.abort();
    };
  }, [form.userInput]);

  // Handlers
  const handleForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchSuggestions(form.userInput);
  };

  return (
    <section className="form-container">
      <form onSubmit={submitForm}>
        <fieldset>
          <legend>Search Autocomplete</legend>

          <div className="user-input">
            <label htmlFor="userInput">Enter Your Search</label>

            <input
              type="text"
              id="userInput"
              name="userInput"
              value={form.userInput}
              onChange={handleForm}
              minLength={3}
              maxLength={10}
              required
            />
          </div>

          {isLoading && <p>Loading...</p>}

          {suggestions.length > 0 && (
            <div>
              <label htmlFor="userSelect">Suggestions</label>

              <select
                id="userSelect"
                name="userSelect"
                value={form.userSelect}
                onChange={handleForm}
              >

                {suggestions.map((option) => (
                  <option
                    key={`${option.word}-${option.score}`}
                    value={option.word}
                  >
                    {option.word}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="actions">
            <button type="submit">Search</button>
          </div>
        </fieldset>
      </form>
    </section>
  );
}