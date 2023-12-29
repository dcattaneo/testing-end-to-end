import "./App.css";
import { useState } from "react";

type ItemId = `${string}-${string}-${string}-${string}-${string}`;

interface Items {
  id: ItemId;
  text: string;
}

const INITIAL_ITEMS: Items[] = [
  { id: crypto.randomUUID(), text: "Element1" },
  { id: crypto.randomUUID(), text: "Element2" },
  { id: crypto.randomUUID(), text: "Element3" },
];

function App() {
  const [items, setItems] = useState<Items[]>(INITIAL_ITEMS);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // to get form elements e.g.: inputs, button, etc. (an uncontrolled manner with JavaScript to avoid additional states and also to avoid using the input[onChange])
    const { elements } = event.currentTarget;

    const input = elements.namedItem("item");
    // we could force the input to be an HTMLInputElement "as HTMLInputElement"

    // But the correct way when using TS is to ensure that the input was not a radioNodeList or null element
    const isInput = input instanceof HTMLInputElement;
    if (!isInput || input == null) return;
    const newItem: Items = {
      id: crypto.randomUUID(),
      text: input.value,
    };

    setItems((prevItems) => {
      return [...prevItems, newItem]; //  or directly by doing: setItems([...items, newItem])
    });
    input.value = "";
  };

  //  handleDelete as callBack function
  const handleDelete = (id: ItemId) => () => {
    setItems((prevItems) => {
      return prevItems.filter((currentItem) => currentItem.id !== id);
    });
  };

  // common handleDelete function
  // const handleDelete = (id: ItemId) => {
  //   const newItems = items.filter((item) => {
  //     return item.id !== id;
  //   });
  //   setItems(newItems);
  // };

  return (
    <>
      <div className="App">
        <header>
          <h1>End-to-end Testing</h1>
          <h2> Add and remove items </h2>
        </header>
        <main>
          <aside>
            <form onSubmit={handleSubmit} aria-label="Add elements to the list">
              <label>
                Add a new element:
                <input
                  name="item"
                  required
                  type="text"
                  placeholder="Item to add"
                />
              </label>
              <button>Click to add</button>
            </form>
          </aside>

          <section>
            <h2>List of elements </h2>

            {items.length === 0 ? (
              <p>
                <strong style={{ color: "red" }}> Empty list </strong>
              </p>
            ) : (
              <ul>
                {items.map((item) => {
                  return (
                    <li key={item.id}>
                      {item.text}
                      <button onClick={handleDelete(item.id)}>
                        Click to Delete
                      </button>

                      {/* Another way without creating a handleDelete function is to create an inlineFunction like this:
                        onClick={() => {
                        setItems((prevItems) => {
                       return prevItems.filter((currentItem) => currentItem.id !== id);
                        });
                          };}  
                     */}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
