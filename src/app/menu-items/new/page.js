"use client";

import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/hooks/use-profile";
import EditableImage from "@/components/layout/EditableImage";
import { useState } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Left from "@/components/icons/Left";
import { toast } from "react-hot-toast";

export default function NewMenuItemPage() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const { loading, data } = useProfile();
  const [redirectToItems, setRedirectToItems] = useState(false);

  async function handleFormSubmit(e) {
    e.preventDefault();
    const data = { image, name, description, basePrice };

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving this item.",
      success: "Saved successfully!",
      error: "Failed to save.",
    });

    setRedirectToItems(true);
  }

  if (redirectToItems) {
    return redirect("/menu-items");
  }

  if (loading) {
    return "Loading User Info...";
  }

  if (!data.admin) {
    return redirect("/404");
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="mt-8 max-w-md mx-auto">
        <Link
          className="button !flex justify-between hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 ease-in-out"
          href={"/menu-items"}
        >
          <span className="uppercase">See all menu items</span>
          <Left />
        </Link>
      </div>
      <form onSubmit={handleFormSubmit} className="mt-8 max-w-md mx-auto">
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
    </section>
  );
}
