import Todo from "./pages/Todo";

function App() {
  return (
    <div className="bg-[#222] text-white">
      <main className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-4xl font-extrabold">Todo list</h1>
        <Todo />

       
      </main>
    </div>
  );
}

export default App;
