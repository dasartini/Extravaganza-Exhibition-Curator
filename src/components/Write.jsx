import { useState } from "react";
import { app } from "../../firebaseConfig";
import { getDatabase, ref, set, push } from "firebase/database";

function Write() {
  const [v1, setV1] = useState("");
  const [v2, setV2] = useState("");

  const saveData = async () => {
    const db = getDatabase(app);
    const fruitsRef = ref(db, "nature/fruits");
    const newDocRef = push(fruitsRef);
    set(newDocRef, {
      fruitName: v1,
      fruitDefinition: v2
    })
      .then(() => {
        alert("data saved LOLOLOL");
      })
      .catch((err) => {
        alert("error: " + err.message);
      });
  };

  return (
    <>
      <input type="text" value={v1} onChange={(e) => setV1(e.target.value)} />
      <input type="text" value={v2} onChange={(e) => setV2(e.target.value)} />
      <button onClick={saveData}> Save data </button>
    </>
  );
}

export default Write;
