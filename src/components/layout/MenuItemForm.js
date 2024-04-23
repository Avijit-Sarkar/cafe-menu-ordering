import { useState } from "react";import EditableImage from "@/components/layout/EditableImage";

export default function MenuItemForm({onSubmit, menuItem}) {
      const [image, setImage] = useState(
        menuItem.image || ''
      );
      const [name, setName] = useState(menuItem.name || '');
      const [description, setDescription] = useState("");
      const [basePrice, setBasePrice] = useState("");
    return (
      <form onSubmit={onSubmit} className="mt-8 max-w-md mx-auto">
        <div className="grid items-start gap-4">
          <div className="grid-cols-1/3">
            <EditableImage link={image} setLink={setImage} />
          </div>
          <div className="grow">
            <label>Item name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>Base Price</label>
            <input
              type="text"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
            />
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    );
}