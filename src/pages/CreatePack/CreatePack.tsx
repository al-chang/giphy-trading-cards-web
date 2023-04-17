import { useState } from "react";
import "./index.css";
import { createPack } from "../../services/cardService";
import { useNavigate } from "react-router-dom";

const CreatePack = () => {
  const [newPack, setNewPack] = useState<{ name: string; price: number }>({
    name: "",
    price: 1,
  });
  const [newTag, setNewTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !newPack.name ||
      !newPack.name.trim() ||
      !newPack.price ||
      !tags.length
    ) {
      setError("Invalid Pack");
      return;
    }

    await createPack({ ...newPack, tags });
    navigate("/packs");
  };

  return (
    <div id="CreatePack__container">
      <form id="CreatePack__form" onSubmit={onSubmit}>
        <h2>Create a New Pack</h2>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          onChange={(e) =>
            setNewPack((_newPack) => ({ ..._newPack, name: e.target.value }))
          }
        />
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          defaultValue={1}
          onChange={(e) =>
            setNewPack((_newPack) => ({
              ..._newPack,
              price: parseInt(e.target.value),
            }))
          }
        />

        <button type="submit">Create Pack</button>
        <p id="CreatePack__error">{error}</p>
      </form>
      <label htmlFor="tags">Tags</label>
      <input
        id="tags"
        onChange={(e) => setNewTag(e.target.value)}
        value={newTag}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            if (!newTag || !newTag.trim() || tags.includes(newTag)) return;
            setTags((_tags) => [..._tags, newTag]);
            setNewTag("");
          }
        }}
      />
      <div className="CreatePack__tags">
        {tags.map((tag) => (
          <div key={Math.random()} className="CreatePack__tag">
            {tag}
            <button
              onClick={() => setTags(tags.filter((_tag) => tag !== _tag))}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatePack;
